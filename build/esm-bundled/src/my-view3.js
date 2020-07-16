import{PolymerElement,html}from"./my-app.js";class MyView3 extends PolymerElement{constructor(){super()}ready(){super.ready()}static get template(){return html`
      <style include="shared-styles">
        :host {
          display: block;
          animation: fadein 1.5s;
          -moz-animation: fadein 1.5s; /* Firefox */
          -webkit-animation: fadein 1.5s; /* Safari and Chrome */
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
    `}submitForm(){debugger;var submitted=this.$.signupForm.submit();submitted}catchResponse(r){var $router=this.shadowRoot.querySelector("app-location");console.log(r.detail.xhr);if(200==r.detail.status){console.log(r.detail.xhr.response.token);localStorage.setItem("cool-jwt",r.detail.xhr.response.token);$router.path="/admin"}}errorReponse(r){var reserrr=r.detail.request.xhr.status;console.log(reserrr);if(401==reserrr){alert("Wrong First Name Or Last Name")}else{alert("Lost Connection")}}}window.customElements.define("my-view3",MyView3);