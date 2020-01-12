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
import './shared-styles.js';
import './components/intro/feature-image';
import '@polymer/iron-image/iron-image.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/paper-button/paper-button';
import 'fontawesome-icon';
import 'fa-icons';

class MyAbout extends PolymerElement {
  constructor(){
    super(); 
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
        .about-page{
            padding-left: 100px;
            padding-right: 100px;
            margin-top: 50px;
        }
        .about-avatar{
            width: 30%;
            padding-right: 2%;
            float: left;
            height: 300px;
        }
        .about-content{
            width: 68%;
            float: right;
            height: 300px;
        }
        .social-link{
            text-decoration: none;
            padding-right: 5px;
        }
        .my-avatar{
            --iron-image-height: 200px;
            --iron-image-width: 200px;        
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
        }
        .ratio{
            border-radius: 100px;
            overflow: hidden;
            z-index: 0;
            position: relative;
            width: 190px;
            margin: auto;
        }
        .ratio-container{
            padding-bottom: 100%;
        }
        @media screen and (max-width: 860px) {
            .ratio{
                border-radius: 70px;
                width: 130px;
            }
            .my-avatar {
                --iron-image-height: 130px;
                --iron-image-width: 130px;
            }
        }
        @media screen and (max-width: 740px) {
            .about-page{
                padding-left: 10px;
                padding-right: 10px;
            }
        }
        @media screen and (max-width: 460px){
            .about-page{
                display: inline-grid;
                text-align: center;
            }
            .about-avatar{
                width: 100%;
            }
            .about-content{
                width: 100%;
            }
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>
      <feature-image
        intro-title="About Me"
        page-name="I'm a Website Developer"
        >
      </feature-image>
    
      <div class="about-page">
        <div class="about-avatar">
            <div class="ratio">
                <div class="ratio-container">
                    <iron-image class="my-avatar" src="images/avatar.jpg"></iron-image>
                </div>
            </div>
        </div>
        <div class="about-content">
            <h1>My name is Nguyen Kien Quoc</h1>
            <p>I'm a website developer with a big passion about polymer. I created this blog to help the other developer can learn polymer easier and faster</p>
            <p>
                *** <i>For more detail here is my contact. Feel free to contact me whenever you need.</i>
            </p>
            <a class="social-link" href="https://www.facebook.com/CWF98">
                <fa-icon class="fab fa-facebook" color="black" size="3em"></fa-icon>
            </a>
            <a class="social-link" href="https://www.instagram.com/kienquocnguyen1998">
                <fa-icon class="fab fa-instagram" color="black" size="3em"></fa-icon>
            </a>
            <a class="social-link" href="https://www.linkedin.com/in/nguyen-quoc-80a9b214b">
                <fa-icon class="fab fa-linkedin" color="black" size="3em"></fa-icon>
            </a>
        </div>
      </div>
    `;
  }
}

window.customElements.define('my-about', MyAbout);
