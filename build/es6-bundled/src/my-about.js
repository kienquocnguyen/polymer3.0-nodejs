import{PolymerElement,html}from"./my-app.js";class MyAbout extends PolymerElement{constructor(){super()}static get template(){return html`
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
        .social-contact{
            display: inline-flex;
        }
        .social-link{
            text-decoration: none;
            padding-right: 15px;
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
                height: 150px;
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
                    <iron-image alt="polymer-3.0" class="my-avatar" src="images/avatar.jpg"></iron-image>
                </div>
            </div>
        </div>
        <div class="about-content">
            <h1>My name is Nguyen Kien Quoc</h1>
            <p>I'm a website developer with a big passion about polymer. I created this blog to help the other developer can learn polymer easier and faster</p>
            <p>
                *** <i>For more detail here is my contact. Feel free to contact me whenever you need.</i>
            </p>
            <div class="social-contact">
                <a class="social-link" href="https://www.facebook.com/CWF98">
                    <fontawesome-icon prefix="fab" name="facebook" size="3em" style="color: black; font-size: 45px;"></fontawesome-icon>
                </a>
                <a class="social-link" href="https://www.instagram.com/kienquocnguyen1998">
                    <fontawesome-icon prefix="fab" name="instagram" size="3em" style="color: black; font-size: 45px;"></fontawesome-icon>
                </a>
                <a class="social-link" href="https://www.linkedin.com/in/nguyen-quoc-80a9b214b">
                    <fontawesome-icon prefix="fab" name="linkedin" size="3em" style="color: black; font-size: 45px;"></fontawesome-icon>
                </a>
            </div>
        </div>
      </div>
    `}}window.customElements.define("my-about",MyAbout);