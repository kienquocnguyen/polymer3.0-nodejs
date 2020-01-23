/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      .card {
        margin: 24px;
        padding: 16px;
        color: #757575;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      .circle {
        display: inline-block;
        width: 64px;
        height: 64px;
        text-align: center;
        color: #555;
        border-radius: 50%;
        background: #ddd;
        font-size: 30px;
        line-height: 64px;
      }

      h1 {
        margin: 16px 0;
        color: #212121;
        font-size: 22px;
      }
      .post-item{
        left: 0px;
        top: 0px;
        width: 100%;
        float: left;
      }
      .post-container{
        transition: .3s all ease-in-out;
        bottom: 0;
        margin: 0 15px;
        position: relative;
      }
      .post-title{
        text-decoration: none;
      }
      .post-title h2{
        font-size: 28px;
        margin-top: 12px;
        margin-bottom: 14px;
        line-height: 100%!important;
        transition: .25s all ease;
        color: #3f3f3f;
      }
      .posts-list .post-title h2{
        display: block;
        width: 300px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .bypostauthor{
        font-weight: 400;
        color: #8d8d8d;
        text-decoration: none;
      }
      .post-meta-date{
        font-weight: 400;
        color: #8d8d8d;
        text-decoration: none;
        padding-left: 9px;
      }
      .post-content p{
        padding-bottom: 28px;
        color: #8d8d8d;
        font-size: 16px;
        width: 315px;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .test{
        max-width: 800px;
        max-height: 600px;
        border: 1px solid black;
      }
      .posts-click{
        background: none;
        border: none;
        text-align: left;
      }
      .posts-click:active{
        border: none;
      }
      @media screen and (max-width: 1100px) {
        .posts-click{
          width: 100%;
        }
      }
      @media screen and (max-width: 1300px) {
        .post-item{
          max-width: 380px;
        }
        .post-content p{
          width: 260px;
        }
        .posts-list .post-title h2{
          width: 260px;
        }
      }
/*Intro*/
        .container{
          margin-right: auto;
          margin-left: auto;
          padding-left: 0;
          padding-right: 0;
        }      
        .feature-image .container{
          padding: 0 15px;
        }
        .intro{
          padding: 130px 0;
          min-height: 60px;
          z-index: 100;
          position: relative;
        }
        .intro .intro-title{
          font-size: 48px;
          color: white;
          text-align: center;
          line-height: 0;
        }
        .intro p{
          font-size: 18px;
          font-style: normal;
          color: white;
          opacity: .8;
          text-align: center;
        }
        @media (max-width: 1025px){
          .container {
              max-width: 850px!important;
          }
        }
        @media (min-width: 768px)
        .container {
            width: 750px;
        }
/*Intro*/
      .post-meta-categories{
        padding-left: 0;
        float: left;
        font-size: 12px;
      }
      .post-meta-categories a{
        transition: all .3s ease-in-out;
        text-decoration: none;
        font-size: 13px;
        text-transform: uppercase;
        color: #8d8d8d;
      }
      .drawer-list a{
        color: black;
      }
      .entry-content{
        padding-left: 50px;
        padding-right: 50px;
        margin-top: 50px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
