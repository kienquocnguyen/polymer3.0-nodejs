function _templateObject_a6308380a7c311ea8b4ab998f4335326(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"shared-styles app-grid-style\">\n      :host {\n        display: block;\n        --app-grid-columns: 2;\n        --app-grid-item-height: 650px;\n        margin-top: 30px;\n        font-family: 'Nunito Sans', sans-serif;\n        animation: fadein 1.5s;\n        -moz-animation: fadein 1.5s; /* Firefox */\n        -webkit-animation: fadein 1.5s; /* Safari and Chrome */\n        -o-animation: fadein 1.5s;\n      }\n      @-moz-keyframes fadein { /* Firefox */\n        from {\n            opacity:0;\n        }\n        to {\n            opacity:1;\n        }\n      }\n      @-webkit-keyframes fadein { /* Safari and Chrome */\n          from {\n              opacity:0;\n          }\n          to {\n              opacity:1;\n          }\n      }\n      @-o-keyframes fadein { /* Opera */\n          from {\n              opacity:0;\n          }\n          to {\n              opacity: 1;\n          }\n      }\n      #post_title{\n        margin-bottom: 30px;\n      }\n      #post_content{\n        display: none;\n      }\n      .rich-text-container{\n        padding: 20px;\n      }\n      .richTextField{\n          width: 100%;\n          height: 700px;\n          font-family: 'Nunito Sans', sans-serif!important;\n          border: 1px solid black;\n      }\n      .richtext-button{\n          min-width: 2.54em;\n      }\n      .richtext-selector{\n        width: 180px;\n        padding-top: 10px;\n        padding-bottom: 10px;\n        padding-left: 5px;\n      }\n      .myadmin{\n        margin-top: 150px;\n      }\n      datetime-input{\n        display: none;\n      }\n    </style>\n    \n    <app-location id=\"location\"\n      route=\"{{route}}\"\n      url-space-regex=\"^[[rootPath]]\"\n      >\n    </app-location>\n    <div class=\"entry-content myadmin\">\n      <h2>Hello {{myusers.data.firstName}}</h2>\n      <paper-button raised on-click=\"goAdmin\">Admin Upload</paper-button>\n      <paper-button raised on-click=\"postsList\">Posts List</paper-button>\n      <paper-button raised on-click=\"logOut\">Log Out</paper-button>\n      <div class=\"card\">\n      <template id=\"template\" is=\"dom-repeat\" items=\"{{singleposts}}\">\n        <iron-form id=\"postForm\" >\n            <form method=\"post\" action=\"https://api.mypolymerblog.com/updatepost/{{item.id}}\" is=\"iron-form\">\n                <paper-input decorator type=\"text\" label=\"Post Author\" id=\"post_author\" name=\"post_author\" value=\"{{item.post_author}}\">\n                </paper-input>\n\n                <paper-input decorator type=\"text\" label=\"Post Categories\" id=\"post_categories\" name=\"post_categories\" value=\"{{item.post_categories}}\">\n                </paper-input>\n\n                <paper-input decorator type=\"text\" label=\"Post Images\" id=\"post_images\" name=\"post_images\" value=\"[[item.post_images]]\">\n                </paper-input> \n                \n                <datetime-input value-as-date=\"{{item.post_date}}\" datetime=\"{{datetime}}\" datetime=\"{{datetime}}\" date=\"{{date}}\" time=\"{{time}}\" with-timezone=\"{{withTimezone}}\" timezone=\"{{timezone}}\"></datetime-input>\n                <paper-input decorator type=\"date\" label=\"Post Date\" id=\"post_date\" name=\"post_date\" value=\"[[date]]\">\n                </paper-input>\n                \n                <paper-input decorator type=\"text\" label=\"Post Title\" id=\"post_title\" name=\"post_title\" value=\"{{item.post_title}}\">\n                </paper-input>\n\n                <paper-input decorator type=\"text\" label=\"Permalinks\" id=\"permalinks\" name=\"permalinks\" value=\"{{item.permalinks}}\">\n                </paper-input>\n            \n                <div class=\"rich-text-container\">\n                <h1>Post Content</h1>\n                <div>\n                    <paper-button raised class=\"richtext-button\" on-click=\"editCommand\">\n                      Edit\n                    </paper-button>\n                    <paper-button raised class=\"richtext-button\" on-click=\"paragraphCommand\">\n                      P\n                    </paper-button>\n                    <paper-button raised class=\"richtext-button\" on-click=\"boldCommand\">\n                      <fontawesome-icon prefix=\"fas\" name=\"bold\" fixed-width></fontawesome-icon>\n                    </paper-button>\n                    <paper-button raised class=\"richtext-button\" on-click=\"italicCommand\">\n                      <fontawesome-icon prefix=\"fas\" name=\"italic\" fixed-width></fontawesome-icon>\n                    </paper-button>\n                    <paper-button raised class=\"richtext-button\" on-click=\"alignLeft\">\n                      <fontawesome-icon prefix=\"fas\" name=\"align-left\" fixed-width></fontawesome-icon>\n                    </paper-button>\n                    <paper-button raised class=\"richtext-button\" on-click=\"alignCenter\">\n                      <fontawesome-icon prefix=\"fas\" name=\"align-center\" fixed-width></fontawesome-icon>\n                    </paper-button>\n                    <paper-button raised class=\"richtext-button\" on-click=\"alignRight\">\n                      <fontawesome-icon prefix=\"fas\" name=\"align-right\" fixed-width></fontawesome-icon>\n                    </paper-button>\n                    <paper-button raised class=\"richtext-button\" on-click=\"addLink\">\n                      <fontawesome-icon prefix=\"fas\" name=\"link\" fixed-width></fontawesome-icon>\n                    </paper-button>\n                    <select class=\"richtext-selector\" on-change=\"headingCommand\" id=\"selectHeading\">\n                        <option> Choose Your Heading </option>\n                        <option value=\"H1\">H1</option>\n                        <option value=\"H2\">H2</option>\n                        <option value=\"H3\">H3</option>\n                        <option value=\"H4\">H4</option>\n                    </select>\n                    <select class=\"richtext-selector\" on-change=\"sizeCommand\" id=\"selectSize\">\n                      <option> Choose Font Size </option>\n                      <option value=\"16px\">16px</option>\n                      <option value=\"20px\">20px</option>\n                      <option value=\"24px\">24px</option>\n                      <option value=\"28px\">28px</option>\n                      <option value=\"32px\">32px</option>\n                      <option value=\"36px\">36px</option>\n                    </select>\n                    <select class=\"richtext-selector\" on-change=\"fontCommand\" id=\"selectFont\">\n                        <option> Choose Your Fonts </option>\n                        <option value=\"Nunito Sans\">Nunito Sans</option>\n                        <option value=\"Fira Sans\">Fira Sans</option>\n                    </select>\n                    <vaadin-upload target=\"https://api.mypolymerblog.com/upload\" max-files=\"20\" accept=\"application/json, jpg, image/*\" \n                    method=\"POST\" on-upload-success=\"uploadSuccess\">\n                    </vaadin-upload>\n                </div>\n                <iframe name=\"richTextField\" id=\"richtext\" class=\"richTextField\" srcdoc=\"{{item.post_content}}\"></iframe>\n                </div>\n\n                <paper-input decorator type=\"text\" label=\"Post Content\" id=\"post_content\" name=\"post_content\">\n                </paper-input>\n\n                <paper-input decorator type=\"text\" label=\"Post Excerpt\" id=\"post_excerpt\" name=\"post_excerpt\" value=\"{{item.post_excerpt}}\">\n                </paper-input>\n                \n                <paper-button raised type=\"submit\" on-click=\"submitForm\">Submit</paper-button>\n            </form>\n        </iron-form>\n        </template>\n      </div>\n    </div>\n"]);_templateObject_a6308380a7c311ea8b4ab998f4335326=function _templateObject_a6308380a7c311ea8b4ab998f4335326(){return data};return data}import{PolymerElement,html}from"../my-app.js";var EditPost=/*#__PURE__*/function(_PolymerElement){babelHelpers.inherits(EditPost,_PolymerElement);function EditPost(){babelHelpers.classCallCheck(this,EditPost);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(EditPost).apply(this,arguments))}babelHelpers.createClass(EditPost,[{key:"ready",value:function ready(){var _this=this;babelHelpers.get(babelHelpers.getPrototypeOf(EditPost.prototype),"ready",this).call(this);console.log(localStorage.getItem("cool-jwt"));fetch("https://api.mypolymerblog.com/protected",{headers:{Authorization:"Bearer "+localStorage.getItem("cool-jwt")}}).then(function(res){if(200!=res.status){_this.set("route.path","/view3");alert("Please login first")}else{return res.json()}}).then(function(myusers){return _this.myusers=myusers})}},{key:"getQueryParameters",value:function getQueryParameters(str){return(str||document.location.search).replace(/(^\?)/,"").split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this}.bind({}))[0]}},{key:"connectedCallback",value:function connectedCallback(){var _this2=this;babelHelpers.get(babelHelpers.getPrototypeOf(EditPost.prototype),"connectedCallback",this).call(this);var queryParams=this.getQueryParameters();console.log("HIHI",queryParams.post);var params;params=queryParams.post;fetch("https://api.mypolymerblog.com/post/".concat(params)).then(function(res){return res.json()}).then(function(singleposts){_this2.singleposts=singleposts})}},{key:"goAdmin",value:function goAdmin(){location.href="/admin"}},{key:"postsList",value:function postsList(){location.href="/adminposts"}},{key:"logOut",value:function logOut(){fetch("https://api.mypolymerblog.com/logout").then(function(res){return console.log(res.status)});localStorage.removeItem("cool-jwt");location.href="/view3"}},{key:"submitForm",value:function submitForm(err){debugger;var richtext=this.shadowRoot.getElementById("richtext"),richtextvalue=richtext.contentDocument.body,richtextcontent=this.shadowRoot.getElementById("post_content");richtextcontent.value=richtextvalue.innerHTML;var postform=this.shadowRoot.getElementById("postForm");postform.addEventListener("iron-form-presubmit",function(event){event.target.request.headers={Authorization:"Bearer "+localStorage.getItem("cool-jwt")}});var submitted=postform.submit();submitted;if(err){console.log(err)}alert("success");console.log("success")}/*Rich Text Editor Function*/},{key:"editCommand",value:function editCommand(){var richtext=this.shadowRoot.getElementById("richtext"),editmode=richtext.contentDocument;editmode.designMode="on"}},{key:"paragraphCommand",value:function paragraphCommand(){var richtext=this.shadowRoot.getElementById("richtext"),paragraphcmd=richtext.contentDocument;paragraphcmd.execCommand("formatBlock",/* ignoreName */ /* ignoreName */!1/* skipSlots */ /* skipSlots */,"p")}},{key:"boldCommand",value:function boldCommand(){var richtext=this.shadowRoot.getElementById("richtext"),boldcmd=richtext.contentDocument;boldcmd.execCommand("bold",!1,null)}},{key:"italicCommand",value:function italicCommand(){var richtext=this.shadowRoot.getElementById("richtext"),italiccmd=richtext.contentDocument;italiccmd.execCommand("italic",!1,null)}},{key:"alignLeft",value:function alignLeft(){var richtext=this.shadowRoot.getElementById("richtext"),alignleftcmd=richtext.contentDocument;alignleftcmd.execCommand("JustifyLeft",!1,"")}},{key:"alignCenter",value:function alignCenter(){var richtext=this.shadowRoot.getElementById("richtext"),aligncentercmd=richtext.contentDocument;aligncentercmd.execCommand("JustifyCenter",!1,"")}},{key:"alignRight",value:function alignRight(){var richtext=this.shadowRoot.getElementById("richtext"),alignrightcmd=richtext.contentDocument;alignrightcmd.execCommand("JustifyRight",!1,"")}},{key:"addLink",value:function addLink(){var richtext=this.shadowRoot.getElementById("richtext"),addlinkcmd=richtext.contentDocument,linkURL=prompt("Enter a URL:","http://"),sText=addlinkcmd.getSelection();addlinkcmd.execCommand("insertHTML",!1,"<a href=\""+linkURL+"\" target=\"_blank\">"+sText+"</a>")}},{key:"headingCommand",value:function headingCommand(){var richtext=this.shadowRoot.getElementById("richtext"),headingcmd=richtext.contentDocument,selectheader=this.shadowRoot.getElementById("selectHeading");headingcmd.execCommand("formatBlock",!1,selectheader.value)}},{key:"sizeCommand",value:function sizeCommand(){var richtext=this.shadowRoot.getElementById("richtext"),sizecmd=richtext.contentDocument,selectsize=this.shadowRoot.getElementById("selectSize");console.log(selectsize.value);sizecmd.execCommand("fontSize",!1,"7");for(var fontElements=sizecmd.getElementsByTagName("font"),i=0,len=fontElements.length;i<len;++i){if("7"==fontElements[i].size){fontElements[i].removeAttribute("size");fontElements[i].style.fontSize=selectsize.value}}}},{key:"fontCommand",value:function fontCommand(){var richtext=this.shadowRoot.getElementById("richtext"),fontcmd=richtext.contentDocument,selectfont=this.shadowRoot.getElementById("selectFont");console.log(selectfont.value);fontcmd.execCommand("fontName",!1,selectfont.value)}},{key:"uploadSuccess",value:function uploadSuccess(e){debugger;var imgname=e.detail.file.name,id="test";console.log(imgname);var richtext=this.shadowRoot.getElementById("richtext"),addimage=richtext.contentDocument,img="<div style='max-width: 800px;'><img alt='polymer-3.0' style='width: 100%;' src='https://api.mypolymerblog.com/images/"+imgname+"' id="+id+"></div>";addimage.execCommand("insertHTML",!0/* skipSlots */,img)}}],[{key:"template",get:function get(){return html(_templateObject_a6308380a7c311ea8b4ab998f4335326())}}]);return EditPost}(PolymerElement);window.customElements.define("edit-post",EditPost);