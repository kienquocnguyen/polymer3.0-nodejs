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
class RecentPosts extends PolymerElement {
    static get properties () {
        return {
            recentCategories: {
                type: String,
                value: "Blog"
            },
            recentTitle:{
                type: String,
                value: "Blog"
            },
            recentImages:{
                type: String,
                value: "Blog"
            }
        };
    }
    static get template() {
        return html`
        <style include="shared-styles app-grid-style">
            :host {
            font-family: 'Nunito Sans', sans-serif;
            }
            .recent-post-item{
                border-bottom: 1px solid #e3e3e3;
                padding-bottom: 15px;
                margin-bottom: 25px;
                position: relative;
            }
            .recent-post-thumb{
                width: 76px;
                height: 76px;
                border-radius: 100px;
                left: 0;
                top: 0;
                position: absolute;
            }
            .ratio{
                border-radius: 100px;
                overflow: hidden;
                z-index: 0;
                position: relative;
            }
            .ratio-container{
                padding-bottom: 100%;
            }
            .ratio-content{
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                --iron-image-height: 76px;
                --iron-image-width: 100%;
            }
            .recent-posts-count{
                top: 2px;
                right: 2px;
                background-color: #47c9e5;
                padding: 2px 6px;
                line-height: 1;
                font-weight: 700;
                border-radius: 20px;
                position: absolute;
                font-size: 13px;
                z-index: 500;
                color: #fff!important;
                box-shadow: 0px 2px 5px 1px rgba(0,0,0,.2)
            }
            .recent-post-content{
                padding-left: 95px;
                min-height: 76px;
            }
            .recent-post-categories{
                padding-left: 0;
                box-sizing: border-box;
            }
            .recent-post-categories a{
                transition: all .3s ease-in-out;
                text-decoration: none;
                font-size: 13px;
                text-transform: uppercase;
                color: #8d8d8d;
            }
            .recent-posts-title{
                text-decoration: none;
            }
            .recent-posts-title h6{
                padding-top: 2px;
                font-size: 16px;
                color: #3f3f3f;
                font-weight: 700;
                margin: 0;
            }
        </style>
        <div class="recent-post-item">
            <div class="recent-post-thumb">
                <a href="https://www.google.com/">
                    <div class="ratio">
                        <div class="ratio-container">
                            <iron-image class="ratio-content" src="[[recentImages]]"></iron-image>
                        </div>
                    </div>
                    <div class="recent-posts-count">
                        0
                    </div>
                </a>
            </div>
            <div class="recent-post-content">
                <span class="recent-post-categories">
                    <a href="https://www.google.com/">[[recentCategories]]</a>
                </span>
                <a href="https://www.google.com/" class="recent-posts-title">
                    <h6>[[recentTitle]]</h6>
                </a>
            </div>
        </div>
        `;
    }
}

window.customElements.define('recent-posts', RecentPosts);
