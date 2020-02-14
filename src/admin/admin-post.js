/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-form/iron-form';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@vaadin/vaadin-upload/vaadin-upload.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@fluidnext-polymer/paper-pagination/paper-pagination';
import '@fluidnext-polymer/paper-pagination/icons/paper-pagination-icons';
import '@fooloomanzoo/datetime-input/datetime-input';
import 'fontawesome-icon';
import '@polymer/paper-dialog/paper-dialog.js';
import '../components/admin/admin-postdate';
class AdminPost extends PolymerElement {
  constructor(){
    super();
    this.page=0;
  }
  ready(){
    super.ready();
    console.log(localStorage.getItem("cool-jwt"));
 
    fetch(`https://api.mypolymerblog.com/protected`,{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("cool-jwt"),
      }
    })
    .then(res => {
      if(res.status != 200){
        this.set('route.path', '/view3');
        alert("Please login first");
      }
      else{
        return res.json();
      }
    })
    .then(myusers => this.myusers = myusers)
  }
  static get properties () {
    return {
      queryParams: {
        type: Number,
        value: '1'
      },
      currentPage:{
        type: Number,
        value: 2,
      },
      routeData: Object,
      subroute: Object
    }
  }
  static get template() {
    return html`
    <style include="shared-styles app-grid-style">
      :host {
        display: block;
        --app-grid-columns: 2;
        --app-grid-item-height: 650px;
        margin-top: 30px;
        font-family: 'Nunito Sans', sans-serif;
      }
      .admin-posts{
        margin-top: 150px;
      }
      datetime-input{
        display: none;
      }
    </style>
    
    <app-location id="location"
      route="{{route}}"
      url-space-regex="^[[rootPath]]"
      >
    </app-location>
    <div class="admin-posts">
      <div>
        <h2>Hello {{myusers.data.firstName}}</h2>
        <paper-button raised on-click="goAdmin">Admin Upload</paper-button>
        <paper-button raised on-click="logOut">Log Out</paper-button>
        <vaadin-grid items="{{myposts}}">
          <vaadin-grid-column>
            <template class="header">Author</template>
            <template>{{item.post_author}}</template>
          </vaadin-grid-column>
          <vaadin-grid-column>
            <template class="header">Title</template>
            <template>{{item.post_title}}</template>
          </vaadin-grid-column>
          <vaadin-grid-column>
            <template class="header">Excerpt</template>
            <template>{{item.post_excerpt}}</template>
          </vaadin-grid-column>
          <vaadin-grid-column>
            <template class="header">Categories</template>
            <template>
             {{item.post_categories}}
            </template>
          </vaadin-grid-column>
          <vaadin-grid-column>
            <template class="header">Date</template>
            <template>
              <admin-postdate post-date="{{item.post_date}}"></admin-postdate>
            </template>
          </vaadin-grid-column>
          <vaadin-grid-column>
            <template class="header">Action</template>
            <template>
              <paper-button on-click="editPost">EDIT</paper-button>
              <paper-button on-click="checkDelete">DELETE</paper-button>
            </template>
          </vaadin-grid-column>
        </vaadin-grid>
      </div>
      <paper-dialog id="animated">
        <h2>Are you sure you want to delete</h2>
        <paper-input decorator id="postId" type="text" >
        </paper-input>
        <paper-button on-click="deletePost">Yes</paper-button>
        <paper-button on-click="noDelete">No</paper-button>
      </paper-dialog>

      <template is="dom-repeat" items="{{postcount}}">  
        <paper-pagination page="{{current}}" total-items="{{item.total}}" item-per-page="4" next-icon="paper-pagination:next-arrow" previous-icon="paper-pagination:previous-arrow">
        </paper-pagination>
      </template>
    </div>
`;
}
  static get observers() {
    return [
        '_currentPageChange(current)'
    ]
  }
  goAdmin(){
    location.href = `/admin`;
  }
  logOut(){
    fetch("https://api.mypolymerblog.com/logout")
    .then(res => console.log(res.status));
    localStorage.removeItem("cool-jwt");
    location.href = `/view3`;
  }
  checkDelete(e){
    var mydelete = this.$.animated;
    const id = e.model.item.id;
    const postsid = this.$.postId;
    postsid.value = id;
    mydelete.open();
  }
  deletePost(){
    const postid = this.$.postId;
    console.log(postid.value);
    fetch(`https://api.mypolymerblog.com/delete/post/${postid.value}`)
    .then(res => res.status);
    alert("Post Deleted");
    location.href = `/adminposts`;
  }
  noDelete(){
    var mydelete = this.$.animated;
    mydelete.close();
  }
  _currentPageChange(c){
    let location = this.$.location;
    let path = location.path;
    this.page=c;
    var params = this.queryParams;
    if(this.page != 1){
      params = Math.pow(2, this.page);
      location.path = `/adminposts/${this.page}`;
      fetch(`https://api.mypolymerblog.com/posts/${params}`)
      .then(res => res.json())
      .then(myposts => this.myposts = myposts)
    }else{
      params = 0;
      location.path = `/adminposts/${this.page}`;
      fetch(`https://api.mypolymerblog.com/posts/${params}`)
      .then(res => res.json())
      .then(myposts => this.myposts = myposts)
      console.log(this.page);
    }
  }

  editPost(e){
    const permalinks = e.model.item.permalinks;
    location.href = `/editpost/?post=${permalinks}`;
  }

  connectedCallback(e){
    var params = this.queryParams;
    super.connectedCallback();
    fetch(`https://api.mypolymerblog.com/posts/${params}`)
    .then(res => res.json())
    .then(myposts => this.myposts = myposts)
    console.log(params);
    fetch(`https://api.mypolymerblog.com/postscount`)
    .then(res => res.json())
    .then(postcount => this.postcount = postcount)
  }
}

window.customElements.define('admin-post', AdminPost);
