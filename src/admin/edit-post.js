/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js'
import '../shared-styles.js';
import '../components/intro/feature-image';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-form/iron-form';
import '@polymer/iron-ajax/iron-ajax';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@vaadin/vaadin-upload/vaadin-upload.js';
import '@fooloomanzoo/datetime-input/datetime-input';
import 'fontawesome-icon';
import 'fa-icons';
class EditPost extends PolymerElement {
  ready(){
    super.ready();
    console.log(localStorage.getItem("cool-jwt"));
 
    fetch(`http://localhost:3000/protected`,{
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
      #post_title{
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
      datetime-input{
        display: none;
      }
    </style>
    
    <app-location id="location"
      route="{{route}}"
      url-space-regex="^[[rootPath]]"
      >
    </app-location>
    <div class="entry-content myadmin">
      <h2>Hello {{myusers.data.firstName}}</h2>
      <paper-button raised on-click="goAdmin">Admin Upload</paper-button>
      <paper-button raised on-click="postsList">Posts List</paper-button>
      <paper-button raised on-click="logOut">Log Out</paper-button>
      <div class="card">
      <template id="template" is="dom-repeat" items="{{singleposts}}">
        <iron-form id="postForm" >
            <form method="post" action="http://localhost:3000/updatepost/{{item.id}}" is="iron-form">
                <paper-input decorator type="text" label="Post Author" id="post_author" name="post_author" value="{{item.post_author}}">
                </paper-input>

                <paper-input decorator type="text" label="Post Categories" id="post_categories" name="post_categories" value="{{item.post_categories}}">
                </paper-input>

                <paper-input decorator type="text" label="Post Images" id="post_images" name="post_images" value="[[item.post_images]]">
                </paper-input> 
                
                <datetime-input value-as-date="{{item.post_date}}" datetime="{{datetime}}" datetime="{{datetime}}" date="{{date}}" time="{{time}}" with-timezone="{{withTimezone}}" timezone="{{timezone}}"></datetime-input>
                <paper-input decorator type="date" label="Post Date" id="post_date" name="post_date" value="[[date]]">
                </paper-input>
                
                <paper-input decorator type="text" label="Post Title" id="post_title" name="post_title" value="{{item.post_title}}">
                </paper-input>
            
                <div class="rich-text-container">
                <h1>Post Content</h1>
                <div>
                    <paper-button raised class="richtext-button" on-click="editCommand">
                      Edit
                    </paper-button>
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
                    <fa-icon class="fas fa-align-left" color="#757575" size="1em"></fa-icon>
                    </paper-button>
                    <paper-button raised class="richtext-button" on-click="alignCenter">
                      <fa-icon class="fas fa-align-center" color="#757575" size="1em"></fa-icon>
                    </paper-button>
                    <paper-button raised class="richtext-button" on-click="alignRight">
                      <fa-icon class="fas fa-align-right" color="#757575" size="1em"></fa-icon>
                    </paper-button>
                    <paper-button raised class="richtext-button" on-click="addLink">
                      <fa-icon class="fas fa-link" color="#757575" size="1em"></fa-icon>
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
                    <vaadin-upload target="http://localhost:3000/upload" max-files="20" accept="application/json, jpg, image/*" 
                    method="POST" on-upload-success="uploadSuccess">
                    </vaadin-upload>
                </div>
                <iframe name="richTextField" id="richtext" class="richTextField" srcdoc="{{item.post_content}}"></iframe>
                </div>

                <paper-input decorator type="text" label="Post Content" id="post_content" name="post_content">
                </paper-input>

                <paper-input decorator type="text" label="Post Excerpt" id="post_excerpt" name="post_excerpt" value="{{item.post_excerpt}}">
                </paper-input>
                
                <paper-button raised type="submit" on-click="submitForm">Submit</paper-button>
            </form>
        </iron-form>
        </template>
      </div>
    </div>
`;
}
  getQueryParameters (str) {
    return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
  }
  connectedCallback(){
    super.connectedCallback();
    var queryParams = this.getQueryParameters();
    console.log("HIHI", queryParams.post);
    var params;
    params = queryParams.post;
    fetch(`http://localhost:3000/post/${params}`)
    .then(res =>res.json())
    .then(singleposts => {
        this.singleposts = singleposts;
    })
  }
  goAdmin(){
    location.href = `/admin`;
  }
  postsList(){
    location.href = `/adminposts`;
  }
  logOut(){
    fetch("http://localhost:3000/logout")
    .then(res => console.log(res.status));
    localStorage.removeItem("cool-jwt");
    location.href = `/view3`;
  }
  
  submitForm(err){
    debugger;
    const richtext = this.shadowRoot.getElementById("richtext");
    const richtextvalue = richtext.contentDocument.body;
    const richtextcontent = this.shadowRoot.getElementById("post_content");
    richtextcontent.value = richtextvalue.innerHTML;
    var postform = this.shadowRoot.getElementById("postForm");
    var submitted = postform.submit();
    submitted;
    if(err){
      console.log(err);
    }
    alert("success");
    console.log("success");
  }


  /*Rich Text Editor Function*/
  editCommand(){
    const richtext = this.shadowRoot.getElementById("richtext");
    const editmode = richtext.contentDocument;
    editmode.designMode = 'on';
  }
  paragraphCommand(){
    const richtext = this.shadowRoot.getElementById("richtext");
    const paragraphcmd = richtext.contentDocument;
    paragraphcmd.execCommand('formatBlock', false, 'p');
  }
  boldCommand(){
    const richtext = this.shadowRoot.getElementById("richtext");
    const boldcmd = richtext.contentDocument;
    boldcmd.execCommand('bold', false, null);
  }
  italicCommand(){
    const richtext = this.shadowRoot.getElementById("richtext");
    const italiccmd = richtext.contentDocument;
    italiccmd.execCommand('italic', false, null);
  }
  alignLeft(){
    const richtext = this.shadowRoot.getElementById("richtext")
    const alignleftcmd = richtext.contentDocument;
    alignleftcmd.execCommand("JustifyLeft", false, "");
  }
  alignCenter(){
    const richtext = this.shadowRoot.getElementById("richtext")
    const aligncentercmd = richtext.contentDocument;
    aligncentercmd.execCommand("JustifyCenter", false, "");
  }
  alignRight(){
    const richtext = this.shadowRoot.getElementById("richtext")
    const alignrightcmd = richtext.contentDocument;
    alignrightcmd.execCommand("JustifyRight", false, "");
  }
  addLink(){
    const richtext = this.shadowRoot.getElementById("richtext")
    const addlinkcmd = richtext.contentDocument;
    var linkURL = prompt('Enter a URL:', 'http://');
    var sText = addlinkcmd.getSelection();
    addlinkcmd.execCommand('insertHTML', false, '<a href="' + linkURL + '" target="_blank">' + sText + '</a>');
  }
  headingCommand(){
    const richtext = this.shadowRoot.getElementById("richtext");
    const headingcmd = richtext.contentDocument;
    const selectheader = this.shadowRoot.getElementById("selectHeading");
    headingcmd.execCommand('formatBlock', false, selectheader.value);
  }
  sizeCommand(){
    const richtext = this.shadowRoot.getElementById("richtext")
    const sizecmd = richtext.contentDocument;
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
    const richtext = this.shadowRoot.getElementById("richtext");
    const fontcmd = richtext.contentDocument;
    const selectfont = this.shadowRoot.getElementById("selectFont");
    console.log(selectfont.value);
    fontcmd.execCommand('fontName', false, selectfont.value);
  }
  
  uploadSuccess(e){
    debugger;
    var imgname = e.detail.file.name;
    var id = "test";
    console.log(imgname);
    const richtext = this.shadowRoot.getElementById("richtext");
    const addimage = richtext.contentDocument;
    var img = "<div style='max-width: 800px;'><img style='width: 100%;' src='http://localhost:3000/images/" + imgname + "' id=" + id + "></div>";
    addimage.execCommand('insertHTML', true, img);
  }

}

window.customElements.define('edit-post', EditPost);
