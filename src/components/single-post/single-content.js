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
import '@polymer/marked-element/marked-element.js';
import '@polymer/paper-button/paper-button'
class SingleContent extends PolymerElement {
  static get properties () {
    return {
        singleTitle: {
            type: String,
            value: "Blog"
        },
        singleImages: {
            type: String,
            value: "Blog"
        },
        singleAuthor: {
            type: String,
            value: "Blog"
        },
        singleDate: {
            type: Date,
            value: new Date("1900-01-01")
        },
        singleCategories: {
            type: String,
            value: "02/10/2018"
        },
        singleContent: {
            type: String,
            value: "Blog"
        },
    };
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
        .single-content{
            margin-bottom: 40px;
            width: 100%;
            display: block;
        }
        .single-meta{
            display: block;
            max-width: 100%;
            overflow-y: var(--posts-length-limit, hidden);
        }
        .post-images {
            --iron-image-height: 480px;
            --iron-image-width: 852px;
        }
        .post-meta-data{
            font-size: 14px;
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 35px;
            margin-bottom: 20px;
        }
        .single-post-meta{
            margin-bottom: 0;
            float: left;
        }
        .post-meta-author{
            color: #8d8d8d;
        }
        .single-post-meta-two{
            padding-top: 0;
            border-top: 0;
            float: right;
        }
        .post-meta-comments{
            padding-left: 15px;
        }
        .post-meta-categories{
            padding-left: 0px;
        }
        .post-meta-categories a{
            color: #8d8d8d;
            text-transform: uppercase;
        }
        .single-post-content{
            padding-bottom: 15px;
            word-break: break-word;
        }
        .single-post-content p {
            color: black;
        }
        .single-post-content a{
            color: #47c9e5;
        }
        .single-post-item{
            left: 0px;
            top: 0px;
            width: 100%;
            float: left;
        }
        .showmore{
            margin-top: 10px;
            width: 100%;
            height: 100px;
            display: var(--read-more, grid);
            box-shadow: 0px 15px 45px 0px rgba(0,0,0,.2);
        }
        @media screen and (max-width: 1000px) {
            .post-images {
                --iron-image-height: 350px;
                --iron-image-width: 100%;
                padding-left: 20px;
                padding-right: 20px;
            }
        }
      </style>

        <article class="single-content single-post-item">
            <div class="post-container">
                <div class="single-meta">
                    <iron-image alt="polymer-3.0" class="post-images" src="[[singleImages]]"></iron-image>
                    <a class="post-title">
                        <h2>[[singleTitle]]</h2>
                    </a>
                    <div class="post-meta-data">
                        <div class="single-post-meta">
                            <span class="post-meta-author">
                                by
                                <a class="bypostauthor">[[singleAuthor]]</a>
                                <a class="post-meta-date">[[singleDate]]</a>
                            </span>
                        </div>
                        <div class="single-post-meta-two">
                            <div class="post-meta-comments">
                                <span class="post-meta-categories">
                                    <a>[[singleCategories]]</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="single-post-content textcontent" inner-h-t-m-l="[[singleContent]]" >
                    </div>
                </div>
                <paper-button class="showmore" on-click="readMore">
                    Read More
                </paper-button>
            </div>
        </article>
    `;
  }
  readMore(){
    this.updateStyles({'--posts-length-limit': 'visible'});
    this.updateStyles({'--read-more': 'none'});
  }
}

window.customElements.define('single-content', SingleContent);
