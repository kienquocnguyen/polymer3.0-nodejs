import{PolymerElement,html}from"./my-app.js";class MyPolymerelement extends PolymerElement{constructor(){super();this.page=0}static get properties(){return{queryParams:{type:Number,value:"1"},currentPage:{type:Number,value:2},routeData:Object,subroute:Object}}static get template(){return html`
    <style include="shared-styles app-grid-style">
      :host {
        display: block;
        --app-grid-columns: 2;
        --app-grid-item-height: 650px;
        margin-top: 30px;
        font-family: 'Nunito Sans', sans-serif;
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
      #content.content-with-sidebar-right{
          width: 73%;
          padding-right: 2%;
          float: left;
      }
      .blog-list{
          position: relative;
          height: auto;
          opacity: 1;
      }
      #sidebar.sidebar-right{
        float: right;
        width: 25%;
      }
      .widget-item{
        padding-bottom: 45px;
        margin-top: 60px;
      }
      #sidebar .widget-item .widget-title{
        color: #505050;
        font-size: 21px;
        font-weight: 800;
      }
      .recent-posts{
        position: relative;
      }
      @media screen and (max-width: 1100px) {
        :host {
          --app-grid-columns: 2;
          --app-grid-item-height: 625px;
        }
        #content.content-with-sidebar-right{
          float: none;
          width: 100%;
          padding-right: 0;
        }
        #sidebar.sidebar-right{
          margin-top: 60px;
          float: none;
          width: 50%;
          margin: auto;
        }
      }
      @media screen and (max-width: 970px) {
        :host {
          --app-grid-columns: 1;
          --app-grid-item-height: 625px;
        }
      }
      @media screen and (max-width: 500px){
        :host {
          --app-grid-item-height: 625px;
        }
      }
    </style>
    
    <app-location id="location"
      route="{{route}}"
      url-space-regex="^[[rootPath]]"
      >
    </app-location>
    <feature-image
      intro-title="Welcome To"
      page-name="Polymer Element"
      >
    </feature-image>
    <div class="entry-content">
      <div id="content" class="content-with-sidebar-right">
        <div class="blog-list">
          <div class="app-grid">
            <template is="dom-repeat" items="{{myposts}}">
              <div class="item">  
                <button class="posts-click" on-click="gotoSingle">
                  <grid-articles
                    post-images="https://api.mypolymerblog.com/images/{{item.post_images}}"
                    post-author="{{item.post_author}}"
                    post-title="{{item.post_title}}"
                    post-content="{{item.post_excerpt}}"
                    post-date="{{item.post_date}}"
                    post-categories="{{item.post_categories}}"
                    >
                  </grid-articles>
                </button>
              </div>
            </template>
          </div>
          <template is="dom-repeat" items="{{postcount}}">  
              <paper-pagination page="{{current}}" total-items="{{item.total}}" item-per-page="4" next-icon="paper-pagination:next-arrow" previous-icon="paper-pagination:previous-arrow">
              </paper-pagination>
          </template>
        </div>
      </div>
      <div id="sidebar" class="sidebar-right">
        <div class="widget-recent-posts widget-item">
          <div class="wrap-recent-posts">
            <h3 class="widget-title">Latest posts</h3>
            <div class="recent-posts">
              <template is="dom-repeat" items="{{latestposts}}">
                <button class="posts-click" on-click="gotoSingle">
                  <recent-posts
                    recent-categories="{{item.post_categories}}"
                    recent-title="{{item.post_title}}"
                    recent-images="https://api.mypolymerblog.com/images/{{item.post_images}}"
                    >
                  </recent-posts>
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    `}static get observers(){return["_currentPageChange(current)"]}gotoSingle(e){const permalinks=e.model.item.permalinks;location.href=`/single-post/?post=${permalinks}`}_currentPageChange(c){let location=this.$.location,path=location.path;this.page=c;var params=this.queryParams;if(1!=this.page){params=Math.pow(2,this.page);location.path=`/polymer-element/${this.page}`;fetch(`https://api.mypolymerblog.com/posts/polymerelement/${params}`).then(res=>res.json()).then(myposts=>this.myposts=myposts)}else{params=0;location.path=`/polymer-element/${this.page}`;fetch(`https://api.mypolymerblog.com/posts/polymerelement/${params}`).then(res=>res.json()).then(myposts=>this.myposts=myposts);console.log(this.page)}}connectedCallback(e){var params=this.queryParams;super.connectedCallback();fetch(`https://api.mypolymerblog.com/posts/polymerelement/${params}`).then(res=>res.json()).then(myposts=>this.myposts=myposts);console.log(params);fetch(`https://api.mypolymerblog.com/postscount/polymerelement`).then(res=>res.json()).then(postcount=>this.postcount=postcount);fetch(`https://api.mypolymerblog.com/latest/posts`).then(res=>res.json()).then(latestposts=>this.latestposts=latestposts)}}window.customElements.define("my-polymerelement",MyPolymerelement);