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
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-grid/app-grid-style';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import 'iron-lazy-pages/iron-lazy-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-spinner/paper-spinner.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
      :host {
        --app-primary-color: #4285f4;
        --app-secondary-color: black;
        display: block;
      }
      @font-face { 
        font-family: Nunito Sans; 
        src: url(../fonts/Nunito_Sans/NunitoSans-Regular.ttf); 
        font-weight: normal;
        font-display: swap
      }
      @font-face { 
        font-family: Fira Sans; 
        src: url(../fonts/Fira_Sans/FiraSans-Regular.ttf); 
        font-weight: normal;
        font-display: swap
      }
      app-drawer-layout:not([narrow]) [drawer-toggle] {
        display: none;
      }
      
      .mobile-menu-button{
        display: none!important;
      }
      app-header {
        color: #fff;
        background-color: transparent;
        border-bottom: var(--menu-bottom, 0px);
        display: var(--menu-display, block);
      }
      paper-spinner.multi {
        --paper-spinner-layer-1-color: var(--paper-blue-600);
        --paper-spinner-layer-2-color: var(--paper-cyan-600);
        --paper-spinner-layer-3-color: var(--paper-blue-600);
        --paper-spinner-layer-4-color: var(--paper-amber-600);
        position: absolute;
        margin: auto;
        width: 100px;
        height: 100px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      app-header paper-icon-button {
        --paper-icon-button-ink-color: white;
      }
      .drawer-list {
        margin: 0 20px;
      }

      .drawer-list a {
        display: block;
        padding: 0 16px;
        text-decoration: none;
        line-height: 40px;
        color: var(--navgation-color, white);
      }
      .drawer-list a.iron-selected {
        color: black;
        font-weight: bold;
      }
      .menu-item{
        padding: 15px;
      }
      .logo{
        width: 64%;
      }
      .drawer-list{
        width: 36%;
        float: right;
        margin-top: -35px;
        display: inline-flex;
        font-size: 20px;
        font-family: 'Fira Sans', sans-serif;
        margin-right: -60px;
      }
      .main-title{
        padding-top: 20px;
        padding-left: 20px;
        color: var(--logo-color, white);
        font-size: 30px;
        font-weight: 600;
      }
      .layout .logo{
        padding-left: 30px;
      }
      iron-lazy-pages{
        background-color: white;
        margin-top: -100px;
      }
      @media screen and (max-width: 1057px){
        iron-lazy-pages{
          margin-top: -140px;
        }
      }
      @media screen and (max-width: 1130px){
        .drawer-list{
          margin-right: -20px;
        }
        .drawer-list a{
          padding: 0 13px;
        }
      }
      @media screen and (max-width: 1082px){
        .drawer-list{
          margin-right: 0px;
        }
        .drawer-list a{
          padding: 0 11px;
        }
      }
      @media screen and (max-width: 1082px){
        .drawer-list{
          margin-right: 0px;
        }
        .drawer-list a{
          padding: 0 11px;
        }
      }
      @media screen and (max-width: 1055px){
        .menu{
          display: none;
        }
        .mobile-menu-button{
          display: block!important;
          color: var(--mobile-menu-color, white);
        }
        .mobile-menu{
          display: inline-grid;
          padding-left: 50px;
          padding-top: 20px;
        }
        .mobile-menu a{
          color: black;
          text-decoration: none;
          margin-top: 10px;
        }
      }
      @media screen and (max-width: 380px) {
        .main-title{
          font-size: 25px;
        }
      }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>
      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
      <app-drawer id="drawer"  swipe-open>
        <div class="mobile-menu">
          <a name="homepage" href="[[rootPath]]home">Home</a>
          <a name="polymer-element" href="[[rootPath]]polymer-element">Polymer Element</a>
          <a name="about" href="[[rootPath]]about">About Me</a>
        </div>
      </app-drawer>
      <!-- Main content -->
      <app-header-layout>
        <app-header slot="header" condenses="" reveals="" effects="waterfall">
          <div class="logo">
            <app-toolbar>
              <div main-title="" class="main-title">Polymer Blog</div>
            </app-toolbar>
          </div>
          <iron-selector selected="{{page}}" attr-for-selected="name" class="drawer-list menu" role="navigation">
            <a name="homepage" href="[[rootPath]]home">Home</a>
            <a name="polymer-element" href="[[rootPath]]polymer-element">Polymer Element</a>
            <a name="about" href="[[rootPath]]about">About Me</a>
            
          </iron-selector>
          <paper-icon-button class="drawer-list mobile-menu-button" icon="my-icons:menu" on-tap="toggleDrawer"></paper-icon-button>
        </app-header>

          <iron-lazy-pages selected="{{page}}" attr-for-selected="name" loading="{{loading}}" role="main">
            <my-home name="home"></my-home>
            <my-polymerelement name="polymer-element"></my-polymerelement>
            <my-view3 name="view3"></my-view3>
            <my-about name="about"></my-about>
            <my-admin name="admin"></my-admin>
            <single-post name="single-post"></single-post>
            <my-view404 name="view404"></my-view404>
            <admin-post name="adminposts"></admin-post>
            <edit-post name="editpost"></edit-post>
          </iron-lazy-pages>
          <paper-spinner id="webloading" class="multi" active="[[loading]]"></paper-spinner>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  toggleDrawer(){
    this.$.drawer.toggle();
    this.$.drawer.slot="drawer";
  }
  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'home';
    } else if (['home', 'polymer-element', 'view3', 'about', 'single-post', 'admin', 'adminposts', 'editpost'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

   
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'home':
        import('./my-home.js');
        this.updateStyles({'--menu-bottom': '0'});
        this.updateStyles({'--navgation-color': 'white'});
        this.updateStyles({'--logo-color': 'white'});
        this.updateStyles({'--menu-display': 'block'});
        this.updateStyles({'--mobile-menu-color': 'white'});
        break;
      case 'polymer-element':
        import('./my-polymerelement');
        this.updateStyles({'--menu-bottom': '0'});
        this.updateStyles({'--navgation-color': 'white'});
        this.updateStyles({'--logo-color': 'white'});
        this.updateStyles({'--menu-display': 'block'});
        this.updateStyles({'--mobile-menu-color': 'white'});
        break;
      case 'view3':
        import('./my-view3.js');
        this.updateStyles({'--menu-bottom': '0'});
        this.updateStyles({'--navgation-color': 'white'});
        this.updateStyles({'--logo-color': 'white'});
        this.updateStyles({'--menu-display': 'block'});
        this.updateStyles({'--mobile-menu-color': 'white'});
        break;
      case 'about':
        import('./my-about.js');
        this.updateStyles({'--menu-bottom': '0'});
        this.updateStyles({'--navgation-color': 'white'});
        this.updateStyles({'--logo-color': 'white'});
        this.updateStyles({'--menu-display': 'block'});
        this.updateStyles({'--mobile-menu-color': 'white'});
        break;
      case 'single-post':
        import('./single-post.js');
        this.updateStyles({'--menu-bottom': '1px solid rgba( 0,0,0,0.08)'});
        this.updateStyles({'--navgation-color': 'rgba(61,61,61,0.69)'});
        this.updateStyles({'--logo-color': 'black'});
        this.updateStyles({'--menu-display': 'block'});
        this.updateStyles({'--mobile-menu-color': 'black'});
        break;
      case 'admin':
        import('./admin/my-admin.js');
        this.updateStyles({'--menu-display': 'none'});
        break;
      case 'adminposts':
        import('./admin/admin-post');
        this.updateStyles({'--menu-display': 'none'});
        break;
      case 'editpost':
        import('./admin/edit-post');
        this.updateStyles({'--menu-display': 'none'});
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
