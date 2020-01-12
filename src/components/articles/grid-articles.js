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
import '../../shared-styles.js';
import '@polymer/iron-image/iron-image.js';
import '@fooloomanzoo/datetime-input/datetime-input';
class GridArticles extends PolymerElement {
  static get properties () {
    return {
        postAuthor: {
            type: String,
            value: "Blog"
        },
        postImages:{
            type: String,
            value: "Blog"
        },
        postTitle:{
            type: String,
            value: "Blog"
        },
        postContent:{
          type: String,
          value: "Blog"
        },
        postDate:{
          type: Date,
          value: new Date("1900-01-01")
        }
    };
  }
  static get template() {
    return html`
      <style include="shared-styles app-grid-style">
        :host {
          font-family: 'Nunito Sans', sans-serif!important;
          margin-top: 30px;
        }
        .post-meta-thumb{
          width: 100%;
          min-width: 100%;
          height: 330px;
          max-height: 330px;
          transition: all .3s ease-in-out;
          margin-bottom: 0;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
        }
        .post-images{
          margin: 0 0 1.5em;
          max-width: 100%;
          min-height: 330px;
          vertical-align: middle;
        }
        .post-images {
          --iron-image-height: 330px;
          --iron-image-width: 100%;
        }
        .post-content-container{
          padding-left: 13%;
          padding-right: 13%;
          padding-top: 32px;
          background-color: #fff;
          transition: .3s all ease-in-out;
          box-shadow: 0px 15px 45px -9px rgba(0,0,0,.2);
          position: relative;
        }
        .post-meta-one{
          font-size: 15px;
          margin-bottom: 0;
          color: #8d8d8d;
        }
        .post-meta-two{
          margin-left: -18%;
          margin-right: 92px;
          padding: 19px 0 19px 18%;
          position: relative;
          font-size: 12px;
          border-top: 1px solid #e9e9e9;
        }
        .post-meta-comments{
          font-size: 12px;
        }
        .post-meta-comments:after{
          content: "";
          display: block;
          clear: both;
        }
        .post-comments{
          background-color: #f6f6f6;
          height: 40px;
          line-height: 40px;
          position: absolute;
          top: -20px;
          right: -92px;
          padding: 0 17px;
          border-radius: 100px;
          transition: .3s all ease-in-out;
          float: right;
          text-decoration: none;
        }
        .post-comments span{
          font-size: 15px;
          color: #8d8d8d;
        }
        .icon-bubble{
          padding-right: 3px;
          vertical-align: inherit;
          margin-left: 0;
          line-height: normal;
          height: auto;
          width: auto;
          font-size: 16px;
          position: relative;
          bottom: -3px;
          text-decoration: none;
        }
        .post-meta-date input{
          font-weight: 400;
          color: #8d8d8d;
          text-decoration: none;
          padding-left: 9px;
          background-color: transparent;
          border: 0px;
          font-family: 'Nunito Sans', sans-serif;
        }
        datetime-input{
          display: none;
        }
        @media screen and (max-width: 1100px){
          .post-item{
            max-width: 420px;
            width: 420px;
            margin: auto;
            float: none;
          }
          .post-content p{
            width: 260px;
          }
          .posts-list .post-title h2{
            width: 260px;
          }
        }
        @media screen and (max-width: 500px){
          .post-item{
            max-width: 300px;
          }
          .post-content p{
            width: 220px;
            font-size: 14px;
          }
          .posts-list .post-title h2{
            width: 220px;
            font-size: 22px;
          }
        }
      </style>

        <article class="post-item posts-list">
            <div class="post-container">
                <div class="post-meta-thumb">
                    <iron-image alt="post-images" class="post-images" src="[[postImages]]"></iron-image>
                </div>
                <div class="post-content-container">
                    <div class="post-meta-one">
                        <datetime-input value-as-date=[[postDate]] datetime="{{datetime}}" datetime="{{datetime}}" date="{{date}}" time="{{time}}" with-timezone="{{withTimezone}}" timezone="{{timezone}}"></datetime-input>
                        <span class="post-meta-author">
                          by
                          <a class="bypostauthor">[[postAuthor]]</a>
                          <a class="post-meta-date">[[date]]</a>
                        </span>
                    </div>
                    <a class="post-title">
                        <h2>[[postTitle]]</h2>
                    </a>
                    <div class="post-content">
                      <p>
                        [[postContent]]
                      </p>
                    </div>
                    <div class="post-meta-two">
                        <div class="post-meta-comments">
                            <span class="post-meta-categories">
                                <i class="icon-tag"></i>
                                <a>People, Travel</a>
                            </span>
                            <a class="post-comments">
                                <span>
                                <iron-image class="icon-bubble" src="images/speech-bubble.png"></iron-image>
                                0
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `;
  }
}

window.customElements.define('grid-articles', GridArticles);
