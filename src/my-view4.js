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

class MyView4 extends PolymerElement {
  constructor(){
    super();
    this.page=0;
  }
  ready(){
    super.ready();
    console.log("Before go to the page");
    var params;
    params = 2;
    fetch(`http://localhost:3000/post/${params}`)
    .then(res => res.json())
    .then(singleposts => this.singleposts = singleposts)
    console.log(params);
  }
  static get properties () {
    return {
      queryParams: {
        type: Number,
        value: '0'
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
        #sidebar.sidebar-right{
          margin-top: 60px;
          float: none;
          width: 50%;
          margin: auto;
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
              <single-content
                single-title="{{item.post_title}}"
                single-images="{{item.post_images}}"
                single-author="{{item.post_author}}"
                single-date="{{item.post_date}}"
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
                <recent-posts
                  recent-categories="Travel"
                  recent-title="Trip that you’ll never ever forget"
                  recent-images="images/recent-post-images1.jpg"
                  >
                </recent-posts>
                
                <recent-posts
                  recent-categories="Photography"
                  recent-title="Must-have gear"
                  recent-images="images/recent-post-images2.jpg"
                  >
                </recent-posts>
            </div>
          </div>
        </div>
    </div>
    `;
  }
}

window.customElements.define('my-view4', MyView4);
