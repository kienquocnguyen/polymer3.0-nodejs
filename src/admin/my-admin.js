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
import '../components/intro/feature-image';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-form/iron-form';
import '@polymer/iron-ajax/iron-ajax';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@vaadin/vaadin-upload/vaadin-upload.js';
import 'fontawesome-icon';
import 'fa-icons';
class MyAdmin extends PolymerElement {
  constructor(){
    super();
       
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
        this.set('route.path', '/view3')
        alert("Please login first");
      }
      else{
        return res.json();
      }
    })
    .then(myusers => this.myusers = myusers)
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
        animation: fadein 1.5s;
        -moz-animation: fadein 1.5s; /* Firefox */
        -webkit-animation: fadein 2s; /* Safari and Chrome */
        -o-animation: fadein 1.5s;
      }
      @-moz-keyframes fadein { /* Firefox */
        from {
            opacity:0;
        }
        to {
            opacity:1;
        }
      }
      @-webkit-keyframes fadein { /* Safari and Chrome */
          from {
              opacity:0;
          }
          to {
              opacity:1;
          }
      }
      @-o-keyframes fadein { /* Opera */
          from {
              opacity:0;
          }
          to {
              opacity: 1;
          }
      }
      #permalinks{
        margin-bottom: 30px;
      }
      #post_content{
        display: none;
      }
      .rich-text-container{
        padding: 20px;
      }
      .richTextField{
          width: 100%;
          height: 700px;
          font-family: 'Nunito Sans', sans-serif!important;
          border: 1px solid black;
      }
      .richtext-button{
          min-width: 2.54em;
      }
      .richtext-selector{
        width: 180px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 5px;
      }
      .myadmin{
        margin-top: 150px;
      }
    </style>
    
    <app-location id="location"
      route="{{route}}"
      url-space-regex="^[[rootPath]]"
      >
    </app-location>
    <div class="entry-content myadmin">
      <h2>Hello {{myusers.data.firstName}}</h2>
      <paper-button raised on-click="postsList">Posts List</paper-button>
      <paper-button raised on-click="logOut">Log Out</paper-button>
      <div class="card">
        <iron-form id="postForm">
          <form method="post" action="https://api.mypolymerblog.com/posts" is="iron-form">
            <paper-input decorator type="text" label="Post Author" id="post_author" name="post_author" value="admin">
            </paper-input>

            <paper-input decorator type="text" label="Post Categories" id="post_categories" name="post_categories">
            </paper-input>
            <vaadin-upload target="https://api.mypolymerblog.com/upload" max-files="20" accept="application/json, jpg, image/*" 
            method="POST" files="{{files}}">
              <div slot="file-list">
                <h4>Files</h4>
                <ul>
                  <template is="dom-repeat" items="{{files}}" as="file">
                    <paper-input decorator type="text" label="Post Images" id="post_images" name="post_images" value="[[file.name]]">
                    </paper-input>        
                  </template>
                </ul>
              </div>
            </vaadin-upload>

            <paper-input decorator type="date" label="Post Date" id="post_date" name="post_date">
            </paper-input>

            <paper-input decorator type="text" label="Post Title" id="post_title" name="post_title">
            </paper-input>
            
            <paper-input decorator type="text" label="Permalinks" id="permalinks" name="permalinks">
            </paper-input>
          
            <div class="rich-text-container">
              <h1>Post Content</h1>
              <div>
                  <paper-button raised class="richtext-button" on-click="paragraphCommand">
                      P
                  </paper-button>
                  <paper-button raised class="richtext-button" on-click="boldCommand">
                      <fontawesome-icon prefix="fas" name="bold" fixed-width></fontawesome-icon>
                  </paper-button>
                  <paper-button raised class="richtext-button" on-click="italicCommand">
                      <fontawesome-icon prefix="fas" name="italic" fixed-width></fontawesome-icon>
                  </paper-button>
                  <paper-button raised class="richtext-button" on-click="alignLeft">
                    <fontawesome-icon prefix="fas" name="align-left" fixed-width></fontawesome-icon>
                  </paper-button>
                  <paper-button raised class="richtext-button" on-click="alignCenter">
                    <fontawesome-icon prefix="fas" name="align-center" fixed-width></fontawesome-icon>
                  </paper-button>
                  <paper-button raised class="richtext-button" on-click="alignRight">
                    <fontawesome-icon prefix="fas" name="align-right" fixed-width></fontawesome-icon>
                  </paper-button>
                  <paper-button raised class="richtext-button" on-click="addLink">
                    <fontawesome-icon prefix="fas" name="link" fixed-width></fontawesome-icon>
                  </paper-button>
                  <select class="richtext-selector" on-change="headingCommand" id="selectHeading">
                      <option> Choose Your Heading </option>
                      <option value="H1">H1</option>
                      <option value="H2">H2</option>
                      <option value="H3">H3</option>
                      <option value="H4">H4</option>
                  </select>
                  <select class="richtext-selector" on-change="sizeCommand" id="selectSize">
                    <option> Choose Font Size </option>
                    <option value="16px">16px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                    <option value="28px">28px</option>
                    <option value="32px">32px</option>
                    <option value="36px">36px</option>
                  </select>
                  <select class="richtext-selector" on-change="fontCommand" id="selectFont">
                      <option> Choose Your Fonts </option>
                      <option value="Nunito Sans">Nunito Sans</option>
                      <option value="Fira Sans">Fira Sans</option>
                  </select>
                  <vaadin-upload target="https://api.mypolymerblog.com/upload" max-files="20" accept="application/json, jpg, image/*" 
                  method="POST" on-upload-success="uploadSuccess">
                  </vaadin-upload>
              </div>
              <iframe name="richTextField" id="richtext" class="richTextField" ></iframe>
            </div>

            <paper-input decorator type="text" label="Post Content" id="post_content" name="post_content">
            </paper-input>

            <paper-input decorator type="text" label="Post Excerpt" id="post_excerpt" name="post_excerpt">
            </paper-input>
            
            <paper-button raised type="submit" on-click="submitForm">Submit</paper-button>
          </form>
        </iron-form>
      </div>
    </div>
`;
}
  submitForm(err){
    debugger;
    const richtextvalue = this.$.richtext.contentWindow.document.body;
    const richtextcontent = this.$.post_content;
    richtextcontent.value = richtextvalue.innerHTML;
    var submitted = this.$.postForm;
    submitted.addEventListener('iron-form-presubmit', function(event) {
      event.target.request.headers = {'Authorization':'Bearer ' + localStorage.getItem("cool-jwt")}
    });

    submitted.submit();
    if(err){
      console.log(err);
    }
    alert("success");
    console.log("success");
  }
  preSubmit(e){
    console.log(e)
    console.log("testestyestesyest")
  }
  postsList(){
    location.href = `/adminposts`;
  }
  logOut(){
    fetch("https://api.mypolymerblog.com/logout")
    .then(res => console.log(res.status));
    localStorage.removeItem("cool-jwt");
    location.href = `/view3`;
  }

  /*Rich Text Editor Function*/
  connectedCallback(){
    super.connectedCallback();
    const editmode = this.$.richtext.contentDocument;
    editmode.designMode = 'on';
  }
  paragraphCommand(){
    const paragraphcmd = this.$.richtext.contentDocument;
    paragraphcmd.execCommand('formatBlock', false, 'p');
  }
  boldCommand(){
      const boldcmd = this.$.richtext.contentDocument;
      boldcmd.execCommand('bold', false, null);
  }
  italicCommand(){
    const italiccmd = this.$.richtext.contentDocument;
    italiccmd.execCommand('italic', false, null);
  }
  alignLeft(){
    const alignleftcmd = this.$.richtext.contentDocument;
    alignleftcmd.execCommand("JustifyLeft", false, "");
  }
  alignCenter(){
    const aligncentercmd = this.$.richtext.contentDocument;
    aligncentercmd.execCommand("JustifyCenter", false, "");
  }
  alignRight(){
    const alignrightcmd = this.$.richtext.contentDocument;
    alignrightcmd.execCommand("JustifyRight", false, "");
  }
  addLink(){
    const addlinkcmd = this.$.richtext.contentDocument;
    var linkURL = prompt('Enter a URL:', 'http://');
    var sText = addlinkcmd.getSelection();
    addlinkcmd.execCommand('insertHTML', false, '<a href="' + linkURL + '" target="_blank">' + sText + '</a>');
  }
  headingCommand(){
    const headingcmd = this.$.richtext.contentDocument;
    const selectheader = this.$.selectHeading;
    headingcmd.execCommand('formatBlock', false, selectheader.value);
  }
  sizeCommand(){
    const sizecmd = this.$.richtext.contentDocument;
    const selectsize = this.$.selectSize;
    console.log (selectsize.value);
    sizecmd.execCommand('fontSize', false, '7');
    var fontElements = sizecmd.getElementsByTagName("font");
    for (var i = 0, len = fontElements.length; i < len; ++i) {
        if (fontElements[i].size == "7") {
            fontElements[i].removeAttribute("size");
            fontElements[i].style.fontSize = selectsize.value;
        }
    }
  }
  fontCommand(){
    const fontcmd = this.$.richtext.contentDocument;
    const selectfont = this.$.selectFont;
    fontcmd.execCommand('fontName', false, selectfont.value);
  }
  uploadSuccess(e){
    debugger;
    var imgname = e.detail.file.name;
    var id = "test";
    console.log(imgname);
    const addimage = this.$.richtext.contentDocument;
    var img = "<div style='max-width: 800px; max-height: 600px; display: block;'><img alt='polymer-3.0' style='width: 100%; text-align: center;' src='https://api.mypolymerblog.com/images/" + imgname + "'</div>";
    addimage.execCommand('insertHTML', true, img);
  }

}

window.customElements.define('my-admin', MyAdmin);
