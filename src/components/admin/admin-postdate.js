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
import '@fooloomanzoo/datetime-input/datetime-input';

class AdminPostdate extends PolymerElement {
  constructor(){
    super();
    this.page=0;
  }
  static get properties () {
    return {
        postDate:{
            type: Date,
            value: new Date("1900-01-01")
        }
    }
  }
  static get template() {
    return html`
    <style include="shared-styles app-grid-style">
      :host {
        display: block;
        font-family: 'Nunito Sans', sans-serif;
      }
      .admin-posts{
        margin-top: 150px;
      }
      datetime-input{
        display: none;
      }
    </style>
    
    <div>
        <datetime-input value-as-date=[[postDate]] datetime="{{datetime}}" datetime="{{datetime}}" date="{{date}}" time="{{time}}" with-timezone="{{withTimezone}}" timezone="{{timezone}}"></datetime-input>
        [[date]]
    </div>
`;
}
}

window.customElements.define('admin-postdate', AdminPostdate);
