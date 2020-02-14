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
import '@polymer/iron-pages/iron-pages.js';
import './shared-styles.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/iron-image/iron-image.js';
import './components/sidebar/recent-posts';
import '@fluidnext-polymer/paper-pagination/paper-pagination';
import '@fluidnext-polymer/paper-pagination/icons/paper-pagination-icons';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import './components/single-post/single-content.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '../node_modules/@fooloomanzoo/datetime-input/datetime-input';

class SinglePost extends PolymerElement {
  constructor(){
    super();
  }
  ready(){
    super.ready();
  }
  static get properties () {
    return {
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

/*MENU*/
      .single-title{
        position: relative;
        padding: 0;
        background-color: #fbfbfb;
        background-repeat: no-repeat;
        background-position: 50% 0;
        background-size: cover;
        margin-top: 100px;
        margin-bottom: 50px;
      }
      .single-title .container{
        padding: 0 15px;
      }
      .single-title .single-table{
        min-height: 60px;
        z-index: 100;
        position: relative;
        padding: 25px 0;
        display: table;
        width: 100%;
      }
      .title-bar{
        display: table-cell;
        vertical-align: middle;
        float: none!important;
      }
      .title-bar h2{
        font-size: 24px;
        margin-bottom: 0;
        font-weight: 700;
      }
      datetime-input{
        display: none;
      }
/*MENU END*/

/*SINGLE POST CONTENT*/
      .single-post{
        position: relative;
        height: auto;
        opacity: 1;
      }
      #sidebar.sidebar-right{
        float: right;
        width: 25%;
      }
      .widget-item{
        padding-bottom: 45px;
        margin-top: 60px;
      }
      #sidebar .widget-item .widget-title{
        color: #505050;
        font-size: 21px;
        font-weight: 800;
      }
      .recent-posts{
        position: relative;
      }
      #content.content-with-sidebar-right{
        width: 73%;
        padding-right: 2%;
        float: left;
      }
      @media screen and (max-width: 1000px) {
        :host {
          --app-grid-columns: 1;
          --app-grid-item-height: 625px;
        }
        #content.content-with-sidebar-right{
          float: none;
          width: 100%;
          padding-right: 0;
        }
        :host #sidebar.sidebar-right{
          margin-top: 60px;
          float: none;
          width: 50%;
          margin: auto;
          display: none;
        }
      }
      @media screen and (max-width: 500px){
        :host {
          --app-grid-item-height: 730px;
        }
      }
      .entry-content{
        padding-left: 50px;
        padding-right: 50px;
      }
/*SINGLE POST CONTENT END*/
      

    </style>
   
    <div>
      <app-location id="location"
      route="{{route}}"
      url-space-regex="^[[rootPath]]"
      >
      </app-location>
      <div class="single-title">
        <div class="container">
          <div class="single-table">
            <div class="title-bar">
              <h2>Bài Viết</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="entry-content">
        <div id ="content" class="content-with-sidebar-right">
          <div class="single-post">

            <template is="dom-repeat" items="{{singleposts}}">
              <datetime-input value-as-date="{{item.post_date}}" datetime="{{datetime}}" date="{{date}}" time="{{time}}" with-timezone="{{withTimezone}}" timezone="{{timezone}}"></datetime-input>  
              <single-content
                single-title="{{item.post_title}}"
                single-images="https://api.mypolymerblog.com/images/{{item.post_images}}"
                single-author="{{item.post_author}}"
                single-date="[[date]]"
                single-categories="{{item.post_categories}}"
                single-content="{{item.post_content}}"
              >/
              </single-content>
            </template>
    
          </div>
        </div>
        <div id="sidebar" class="sidebar-right">
          <div class="widget-recent-posts widget-item">
            <div class="wrap-recent-posts">
              <h3 class="widget-title">Latest posts</h3>
              <div class="recent-posts">
                <template is="dom-repeat" items="{{latestposts}}">
                  <button class="posts-click" on-click="gotoSingle">
                    <recent-posts
                      recent-categories="{{item.post_categories}}"
                      recent-title="{{item.post_title}}"
                      recent-images="https://api.mypolymerblog.com/images/{{item.post_images}}"
                      >
                    </recent-posts>
                  </button>
                </template>
            </div>
          </div>
        </div>
    </div>
    `;
  }
  getQueryParameters (str) {
    return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
  }
  
  gotoSingle(e){
    const permalinks = e.model.item.permalinks;
    location.href = `/single-post/?post=${permalinks}`
  }
  
  connectedCallback(){
    super.connectedCallback();
    var queryParams = this.getQueryParameters();
    console.log("HIHI", queryParams.post);
    var params;
    params = queryParams.post;
    fetch(`https://api.mypolymerblog.com/post/${params}`)
    .then(res =>res.json())
    .then(singleposts => {
        this.singleposts = singleposts;
    })
    fetch(`https://api.mypolymerblog.com/latest/posts`)
    .then(res => res.json())
    .then(latestposts => this.latestposts = latestposts)
  }
}

window.customElements.define('single-post', SinglePost);
