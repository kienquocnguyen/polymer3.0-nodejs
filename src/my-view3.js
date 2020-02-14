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
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-form/iron-form';
import '@polymer/iron-ajax/iron-ajax';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
class MyView3 extends PolymerElement {
  constructor(){
    super(); 
  }
  ready(){
    super.ready();
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>
      <feature-image
        intro-title="Welcome To"
        page-name="Login Page"
        >
      </feature-image>
      <div class="card">
        <iron-form id="signupForm" on-iron-form-response="catchResponse" on-iron-form-error="errorReponse">
          <form method="post" action="https://api.mypolymerblog.com/users" is="iron-form">
              <paper-input decorator type="text" label="First Name" id="first_name" name="first_name">
              </paper-input>
              <paper-input decorator type="text" label="Last Name" id="last_name" name="last_name">
              </paper-input>
              <paper-button raised type="submit" on-click="submitForm">Submit</paper-button>
          </form>
        </iron-form>
      </div>
    `;
  }
  submitForm(){
    debugger;
    var submitted = this.$.signupForm.submit();
    submitted;
  }
  catchResponse(r){
    var $router = this.shadowRoot.querySelector("app-location");
    console.log(r.detail.xhr);
    if(r.detail.status == 200){
      console.log(r.detail.xhr.response.token);
      localStorage.setItem("cool-jwt",r.detail.xhr.response.token);
      $router.path = "/admin";
    }
  }
  errorReponse(r){
    var reserrr = r.detail.request.xhr.status;
    console.log(reserrr);
    if(reserrr == 401){
      alert("Wrong First Name Or Last Name");
    }else{
      alert("Lost Connection");
    }
  }
}

window.customElements.define('my-view3', MyView3);
