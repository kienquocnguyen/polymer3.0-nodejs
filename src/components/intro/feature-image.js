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

class FeatureImage extends PolymerElement {
  static get properties () {
    return {
      introTitle: {
        type: String,
        value: "Blog"
      },
      pageName: {
        type: String,
        value: "Blog"
      }  
    };
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        .feature-image{
            background-image: url(../images/Blog_title_image.jpg);
            position: relative;
            padding: 0;
            background-repeat: no-repeat;
            background-position: 50% 0;
            background-size: cover!important;
            padding-top: 99px;
            z-index: 100;
        }
        
      </style>
      
      
      <div class="feature-image">
        <div class="container">
          <div class="intro">
            <h2 class="intro-title">[[introTitle]]</h2>
            <p>[[pageName]]</p>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('feature-image', FeatureImage);
