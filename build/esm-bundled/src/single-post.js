import{IronResizableBehavior,IronSelectableBehavior,Polymer,html$1 as html,dom,ElementMixin,dedupingMixin,IronA11yKeysBehavior,addListener,setTouchAction,mixinBehaviors,PolymerElement,html as html$1,GestureEventListeners,IronA11yAnnouncer,ThemableMixin,ThemePropertyMixin,timeOut,Debouncer,flush,templatize,afterNextRender,FlattenedNodesObserver,ControlStateMixin,ElementMixin$1}from"./my-app.js";Polymer({_template:html`
    <style>
      :host {
        display: block;
      }

      :host > ::slotted(:not(slot):not(.iron-selected)) {
        display: none !important;
      }
    </style>

    <slot></slot>
`,is:"iron-pages",behaviors:[IronResizableBehavior,IronSelectableBehavior],properties:{// as the selected page is the only one visible, activateEvent
// is both non-sensical and problematic; e.g. in cases where a user
// handler attempts to change the page and the activateEvent
// handler immediately changes it back
activateEvent:{type:String,value:null}},observers:["_selectedPageChanged(selected)"],_selectedPageChanged:function(selected,old){this.async(this.notifyResize)}});/**
     * marked - a markdown parser
     * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
     * https://github.com/markedjs/marked
     */;(function(root){'use strict';/**
                 * Block-Level Grammar
                 */var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,table:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,paragraph:/^([^\n]+(?:\n?(?!hr|heading|lheading| {0,3}>|tag)[^\n]+)+)/,text:/^[^\n]+/,_label:/(?:\\[\[\]]|[^\[\]])+/,_title:/(?:"(?:\\"|[^"]|"[^"\n]*")*"|'\n?(?:[^'\n]+\n?)*'|\([^()]*\))/};block.def=edit(block.def).replace("label",block._label).replace("title",block._title).getRegex();block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=edit(block.item,"gm").replace(/bull/g,block.bullet).getRegex();block.list=edit(block.list).replace(/bull/g,block.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+block.def.source+")").getRegex();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b";block.html=edit(block.html).replace("comment",/<!--[\s\S]*?-->/).replace("closed",/<(tag)[\s\S]+?<\/\1>/).replace("closing",/<tag(?:"[^"]*"|'[^']*'|\s[^'"\/>\s]*)*?\/?>/).replace(/tag/g,block._tag).getRegex();block.paragraph=edit(block.paragraph).replace("hr",block.hr).replace("heading",block.heading).replace("lheading",block.lheading).replace("tag","<"+block._tag).getRegex();block.blockquote=edit(block.blockquote).replace("paragraph",block.paragraph).getRegex();/**
                                                                                               * Normal Block Grammar
                                                                                               */block.normal=merge({},block);/**
                                    * GFM Block Grammar
                                    */block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=edit(block.paragraph).replace("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|").getRegex();/**
                                                                                                                                                                                       * GFM + Tables Block Grammar
                                                                                                                                                                                       */block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});/**
       * Block Lexer
       */function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}/**
     * Expose Block Rules
     */Lexer.rules=block;/**
                        * Static Lex Method
                        */Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};/**
      * Preprocessing
      */Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,!0)};/**
      * Lexing
      */Lexer.prototype.token=function(src,top){src=src.replace(/^ +$/gm,"");var next,loose,cap,bull,b,item,space,i,tag,l,isordered;while(src){// newline
if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(1<cap[0].length){this.tokens.push({type:"space"})}}// code
if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}// fences (gfm)
if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}// heading
if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}// table no leading pipe (gfm)
if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}// hr
if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}// blockquote
if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");// Pass `top` to keep the current
// "toplevel" state. This is exactly
// how markdown.pl works.
this.token(cap,top);this.tokens.push({type:"blockquote_end"});continue}// list
if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];isordered=1<bull.length;this.tokens.push({type:"list_start",ordered:isordered,start:isordered?+bull:""});// Get each top-level item.
cap=cap[0].match(this.rules.item);next=!1;l=cap.length;i=0;for(;i<l;i++){item=cap[i];// Remove the list item's bullet
// so it is seen as the next token.
space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");// Outdent whatever the
// list item contains. Hacky.
if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}// Determine whether the next list item belongs here.
// Backpedal if it does not belong in this list.
if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(1<bull.length&&1<b.length)){src=cap.slice(i+1).join("\n")+src;i=l-1}}// Determine whether item is loose or not.
// Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
// for discount behavior.
loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next="\n"===item.charAt(item.length-1);if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});// Recurse.
this.token(item,!1);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}// html
if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===cap[1]||"script"===cap[1]||"style"===cap[1]),text:cap[0]});continue}// def
if(top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);if(cap[3])cap[3]=cap[3].substring(1,cap[3].length-1);tag=cap[1].toLowerCase();if(!this.tokens.links[tag]){this.tokens.links[tag]={href:cap[2],title:cap[3]}}continue}// table (gfm)
if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}// lheading
if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:"="===cap[2]?1:2,text:cap[1]});continue}// top-level paragraph
if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:"\n"===cap[1].charAt(cap[1].length-1)?cap[1].slice(0,-1):cap[1]});continue}// text
if(cap=this.rules.text.exec(src)){// Top-level should never reach here.
src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};/**
      * Inline-Level Grammar
      */var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?[a-zA-Z0-9\-]+(?:"[^"]*"|'[^']*'|\s[^<'">\/\s]*)*?\/?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^_([^\s_](?:[^_]|__)+?[^\s_])_\b|^\*((?:\*\*|[^*])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/,_scheme:/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,_email:/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/};inline.autolink=edit(inline.autolink).replace("scheme",inline._scheme).replace("email",inline._email).getRegex();inline._inside=/(?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=edit(inline.link).replace("inside",inline._inside).replace("href",inline._href).getRegex();inline.reflink=edit(inline.reflink).replace("inside",inline._inside).getRegex();/**
                                                                                       * Normal Inline Grammar
                                                                                       */inline.normal=merge({},inline);/**
                                      * Pedantic Inline Grammar
                                      */inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});/**
       * GFM Inline Grammar
       */inline.gfm=merge({},inline.normal,{escape:edit(inline.escape).replace("])","~|])").getRegex(),url:edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("email",inline._email).getRegex(),_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:edit(inline.text).replace("]|","~]|").replace("|","|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&'*+/=?^_`{\\|}~-]+@|").getRegex()});/**
       * GFM + Line Breaks Inline Grammar
       */inline.breaks=merge({},inline.gfm,{br:edit(inline.br).replace("{2,}","*").getRegex(),text:edit(inline.gfm.text).replace("{2,}","*").getRegex()});/**
       * Inline Lexer & Compiler
       */function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}/**
     * Expose Inline Rules
     */InlineLexer.rules=inline;/**
                               * Static Lexing/Compiling Method
                               */InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};/**
      * Lexing/Compiling
      */InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){// escape
if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}// autolink
if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if("@"===cap[2]){text=escape(this.mangle(cap[1]));href="mailto:"+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}// url (gfm)
if(!this.inLink&&(cap=this.rules.url.exec(src))){cap[0]=this.rules._backpedal.exec(cap[0])[0];src=src.substring(cap[0].length);if("@"===cap[2]){text=escape(cap[0]);href="mailto:"+text}else{text=escape(cap[0]);if("www."===cap[1]){href="http://"+text}else{href=text}}out+=this.renderer.link(href,null,text);continue}// tag
if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=!0}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=!1}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}// link
if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=!0;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=!1;continue}// reflink, nolink
if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=!0;out+=this.outputLink(cap,link);this.inLink=!1;continue}// strong
if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}// em
if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}// code
if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2].trim(),!0));continue}// br
if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}// del (gfm)
if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}// text
if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};/**
      * Compile Link
      */InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return"!"!==cap[0].charAt(0)?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};/**
      * Smartypants Transformations
      */InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text// em-dashes
.replace(/---/g,"\u2014")// en-dashes
.replace(/--/g,"\u2013")// opening singles
.replace(/(^|[-\u2014/(\[{"\s])'/g,"$1\u2018")// closing singles & apostrophes
.replace(/'/g,"\u2019")// opening doubles
.replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1\u201C")// closing doubles
.replace(/"/g,"\u201D")// ellipses
.replace(/\.{3}/g,"\u2026")};/**
      * Mangle Links
      */InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(.5<Math.random()){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};/**
      * Renderer
      */function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(null!=out&&out!==code){escaped=!0;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,!0))+"\n</code></pre>"}return"<pre><code class=\""+this.options.langPrefix+escape(lang,!0)+"\">"+(escaped?code:escape(code,!0))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+" id=\""+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+"\">"+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered,start){var type=ordered?"ol":"ul",startatt=ordered&&1!==start?" start=\""+start+"\"":"";return"<"+type+startatt+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td",tag=flags.align?"<"+type+" style=\"text-align:"+flags.align+"\">":"<"+type+">";return tag+content+"</"+type+">\n"};// span level renderer
Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return text}if(0===prot.indexOf("javascript:")||0===prot.indexOf("vbscript:")||0===prot.indexOf("data:")){return text}}if(this.options.baseUrl&&!originIndependentUrl.test(href)){href=resolveUrl(this.options.baseUrl,href)}var out="<a href=\""+href+"\"";if(title){out+=" title=\""+title+"\""}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){if(this.options.baseUrl&&!originIndependentUrl.test(href)){href=resolveUrl(this.options.baseUrl,href)}var out="<img src=\""+href+"\" alt=\""+text+"\"";if(title){out+=" title=\""+title+"\""}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};/**
      * TextRenderer
      * returns only the textual part of the token
      */function TextRenderer(){}// no need for block level renderers
TextRenderer.prototype.strong=TextRenderer.prototype.em=TextRenderer.prototype.codespan=TextRenderer.prototype.del=TextRenderer.prototype.text=function(text){return text};TextRenderer.prototype.link=TextRenderer.prototype.image=function(href,title,text){return""+text};TextRenderer.prototype.br=function(){return""};/**
      * Parsing & Compiling
      */function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}/**
     * Static Parse Method
     */Parser.parse=function(src,options){var parser=new Parser(options);return parser.parse(src)};/**
      * Parse Loop
      */Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options);// use an InlineLexer with a TextRenderer to extract pure text
this.inlineText=new InlineLexer(src.links,merge({},this.options,{renderer:new TextRenderer}));this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};/**
      * Next Token
      */Parser.prototype.next=function(){return this.token=this.tokens.pop()};/**
      * Preview Next Token
      */Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};/**
      * Parse Text Tokens
      */Parser.prototype.parseText=function(){var body=this.token.text;while("text"===this.peek().type){body+="\n"+this.next().text}return this.inline.output(body)};/**
      * Parse Current Token
      */Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,unescape(this.inlineText.output(this.token.text)))}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,j;// header
cell="";for(i=0;i<this.token.header.length;i++){cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:!0,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:!1,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{body="";while("blockquote_end"!==this.next().type){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{body="";var ordered=this.token.ordered,start=this.token.start;while("list_end"!==this.next().type){body+=this.tok()}return this.renderer.list(body,ordered,start)}case"list_item_start":{body="";while("list_item_end"!==this.next().type){body+="text"===this.token.type?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{body="";while("list_item_end"!==this.next().type){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};/**
      * Helpers
      */function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){// explicitly match decimal, hex, and named HTML entities
return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,function(_,n){n=n.toLowerCase();if("colon"===n)return":";if("#"===n.charAt(0)){return"x"===n.charAt(1)?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function edit(regex,opt){regex=regex.source;opt=opt||"";return{replace:function(name,val){val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return this},getRegex:function(){return new RegExp(regex,opt)}}}function resolveUrl(base,href){if(!baseUrls[" "+base]){// we can ignore everything in base after the last slash of its path component,
// but we might need to add _that_
// https://tools.ietf.org/html/rfc3986#section-3
if(/^[^:]+:\/*[^/]*$/.test(base)){baseUrls[" "+base]=base+"/"}else{baseUrls[" "+base]=base.replace(/[^/]*$/,"")}}base=baseUrls[" "+base];if("//"===href.slice(0,2)){return base.replace(/:[\s\S]*/,":")+href}else if("/"===href.charAt(0)){return base.replace(/(:\/*[^/]*)[\s\S]*/,"$1")+href}else{return base+href}}var baseUrls={},originIndependentUrl=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}/**
     * Marked
     */function marked(src,opt,callback){// throw error in case of non string input
if("undefined"===typeof src||null===src){throw new Error("marked(): input parameter is undefined or null")}if("string"!==typeof src){throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(src)+", string expected")}if(callback||"function"===typeof opt){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||3>highlight.length){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if("code"!==token.type){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(null==code||code===token.text){return--pending||done()}token.text=code;token.escaped=!0;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/markedjs/marked.";if((opt||marked.defaults).silent){return"<p>An error occurred:</p><pre>"+escape(e.message+"",!0)+"</pre>"}throw e}}/**
     * Options
     */marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new Renderer,xhtml:!1,baseUrl:null};/**
      * Expose
      */marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.TextRenderer=TextRenderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if("undefined"!==typeof module&&"object"===typeof exports){module.exports=marked}else if("function"===typeof define&&define.amd){define(function(){return marked})}else{root.marked=marked}})(void 0||("undefined"!==typeof window?window:global));var marked$1={};if(!window.marked){// For webpack support for the Polymer 3 version created by the Polymer
// Modulizer More info:
// https://github.com/PolymerElements/marked-element/issues/81
window.marked=marked$1}Polymer({_template:html`
    <style>
      :host {
        display: block;
      }
    </style>
    <slot name="markdown-html">
      <div id="content"></div>
    </slot>
  `,is:"marked-element",properties:{/**
     * The markdown source that should be rendered by this element.
     */markdown:{type:String,value:null},/**
     * Enable GFM line breaks (regular newlines instead of two spaces for
     * breaks)
     */breaks:{type:Boolean,value:!1},/**
     * Conform to obscure parts of markdown.pl as much as possible. Don't fix
     * any of the original markdown bugs or poor behavior.
     */pedantic:{type:Boolean,value:!1},/**
     * Function used to customize a renderer based on the [API specified in the
     * Marked
     * library](https://github.com/chjj/marked#overriding-renderer-methods).
     * It takes one argument: a marked renderer object, which is mutated by the
     * function.
     */renderer:{type:Function,value:null},/**
     * Sanitize the output. Ignore any HTML that has been input.
     */sanitize:{type:Boolean,value:!1},/**
     * Function used to customize a sanitize behavior.
     * It takes one argument: element String without text Contents.
     *
     * e.g. `<div>` `<a href="/">` `</p>'.
     * Note: To enable this function, must set `sanitize` to true.
     * WARNING: If you are using this option to untrusted text, you must to
     * prevent XSS Attacks.
     */sanitizer:{type:Function,value:null},/**
     * If true, disables the default sanitization of any markdown received by
     * a request and allows fetched unsanitized markdown
     *
     * e.g. fetching markdown via `src` that has HTML.
     * Note: this value overrides `sanitize` if a request is made.
     */disableRemoteSanitization:{type:Boolean,value:!1},/**
     * Use "smart" typographic punctuation for things like quotes and dashes.
     */smartypants:{type:Boolean,value:!1},/**
     * Callback function invoked by Marked after HTML has been rendered.
     * It must take two arguments: err and text and must return the resulting
     * text.
     */callback:{type:Function,value:null},/**
     * A reference to the XMLHttpRequest instance used to generate the
     * network request.
     *
     * @type {XMLHttpRequest}
     */xhr:{type:Object,notify:!0,readOnly:!0}},observers:["render(markdown, breaks, pedantic, renderer, sanitize, sanitizer, smartypants, callback)"],ready:function(){if(this.markdown){return}// Use the Markdown from the first `<script>` descendant whose MIME type
// starts with "text/markdown". Script elements beyond the first are
// ignored.
this._markdownElement=dom(this).querySelector("[type=\"text/markdown\"]");if(!this._markdownElement){return}if(this._markdownElement.src){this._request(this._markdownElement.src)}if(""!==this._markdownElement.textContent.trim()){this.markdown=this._unindent(this._markdownElement.textContent)}var observer=new MutationObserver(this._onScriptAttributeChanged.bind(this));observer.observe(this._markdownElement,{attributes:!0})},/**
   * Renders `markdown` to HTML when the element is attached.
   *
   * This serves a dual purpose:
   *
   *  * Prevents unnecessary work (no need to render when not visible).
   *
   *  * `attached` fires top-down, so we can give ancestors a chance to
   *    register listeners for the `syntax-highlight` event _before_ we render
   *    any markdown.
   *
   */attached:function(){this._attached=!0;this._outputElement=this.outputElement;this.render()},detached:function(){this._attached=!1},/**
   * Unindents the markdown source that will be rendered.
   *
   * @param {string} text
   * @return {string}
   */unindent:function(text){return this._unindent(text)},get outputElement(){var child=dom(this).queryDistributedElements("[slot=\"markdown-html\"]")[0];return child||this.$.content},/**
   * The `marked-render-complete` event is fired once Markdown to HTML
   * conversion has finished, and the DOM has been populated via the resulting
   * HTML.
   *
   * @event marked-render-complete
   */ /**
       * Renders `markdown` into this element's DOM.
       *
       * This is automatically called whenever the `markdown` property is changed.
       *
       * The only case where you should be calling this is if you are providing
       * markdown via `<script type="text/markdown">` after this element has been
       * constructed (or updating that markdown).
       */render:function(){if(!this._attached){return};if(!this.markdown){dom(this._outputElement).innerHTML="";return}var renderer=new marked.Renderer;if(this.renderer){this.renderer(renderer)}var opts={renderer:renderer,highlight:this._highlight.bind(this),breaks:this.breaks,sanitize:this.sanitize,sanitizer:this.sanitizer,pedantic:this.pedantic,smartypants:this.smartypants};dom(this._outputElement).innerHTML=marked(this.markdown,opts,this.callback);this.fire("marked-render-complete",{},{composed:!0})},/**
   * Fired when the content is being processed and before it is rendered.
   * Provides an opportunity to highlight code blocks based on the programming
   * language used. This is also known as syntax highlighting. One example would
   * be to use a prebuilt syntax highlighting library, e.g with
   * [highlightjs](https://highlightjs.org/).
   *
   * @param {string} code
   * @param {string} lang
   * @return {string}
   * @event syntax-highlight
   */_highlight:function(code,lang){var event=this.fire("syntax-highlight",{code:code,lang:lang},{composed:!0});return event.detail.code||code},/**
   * @param {string} text
   * @return {string}
   */_unindent:function(text){if(!text)return text;var lines=text.replace(/\t/g,"  ").split("\n"),indent=lines.reduce(function(prev,line){if(/^\s*$/.test(line))return prev;// Completely ignore blank lines.
var lineIndent=line.match(/^(\s*)/)[0].length;if(null===prev)return lineIndent;return lineIndent<prev?lineIndent:prev},null);return lines.map(function(l){return l.substr(indent)}).join("\n")},/**
   * Fired when the XHR finishes loading
   *
   * @param {string} url
   * @event marked-loadend
   */_request:function(url){this._setXhr(new XMLHttpRequest);var xhr=this.xhr;if(0<xhr.readyState){return null}xhr.addEventListener("error",this._handleError.bind(this));xhr.addEventListener("loadend",function(e){var status=this.xhr.status||0;// Note: if we are using the file:// protocol, the status code will be 0
// for all outcomes (successful or otherwise).
if(0===status||200<=status&&300>status){this.sanitize=!this.disableRemoteSanitization;this.markdown=e.target.response}else{this._handleError(e)}this.fire("marked-loadend",e)}.bind(this));xhr.open("GET",url);xhr.setRequestHeader("Accept","text/markdown");xhr.send()},/**
   * Fired when an error is received while fetching remote markdown content.
   *
   * @param {!Event} e
   * @event marked-request-error
   */_handleError:function(e){var evt=this.fire("marked-request-error",e,{cancelable:!0});if(!evt.defaultPrevented){this.markdown="Failed loading markdown source"}},/**
   * @param {!Array<!MutationRecord>} mutation
   */_onScriptAttributeChanged:function(mutation){if("src"!==mutation[0].attributeName){return}this._request(this._markdownElement.src)}});const DISABLED_ATTR="disable-upgrade",DisableUpgradeMixin=dedupingMixin(base=>{/**
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @extends {HTMLElement}
   * @private
   */const superClass=ElementMixin(base);/**
                                             * @polymer
                                             * @mixinClass
                                             * @implements {Polymer_DisableUpgradeMixin}
                                             */class DisableUpgradeClass extends superClass{/**
     * @suppress {missingProperties} go/missingfnprops
     */static get observedAttributes(){return super.observedAttributes.concat(DISABLED_ATTR)}/**
       * @override
       * @param {string} name Attribute name.
       * @param {?string} old The previous value for the attribute.
       * @param {?string} value The new value for the attribute.
       * @param {?string} namespace The XML namespace for the attribute.
       * @return {void}
       */attributeChangedCallback(name,old,value,namespace){if(name==DISABLED_ATTR){if(!this.__dataEnabled&&null==value&&this.isConnected){super.connectedCallback()}}else{super.attributeChangedCallback(name,old,value,/** @type {null|string} */namespace)}}/*
        NOTE: cannot gate on attribute because this is called before
        attributes are delivered. Therefore, we stub this out and
        call `super._initializeProperties()` manually.
      */ /** @override */_initializeProperties(){}// prevent user code in connected from running
/** @override */connectedCallback(){if(this.__dataEnabled||!this.hasAttribute(DISABLED_ATTR)){super.connectedCallback()}}// prevent element from turning on properties
/** @override */_enableProperties(){if(!this.hasAttribute(DISABLED_ATTR)){if(!this.__dataEnabled){super._initializeProperties()}super._enableProperties()}}// only go if "enabled"
/** @override */disconnectedCallback(){if(this.__dataEnabled){super.disconnectedCallback()}}}return DisableUpgradeClass});/**
                                          * Element class mixin that allows the element to boot up in a non-enabled
                                          * state when the `disable-upgrade` attribute is present. This mixin is
                                          * designed to be used with element classes like PolymerElement that perform
                                          * initial startup work when they are first connected. When the
                                          * `disable-upgrade` attribute is removed, if the element is connected, it
                                          * boots up and "enables" as it otherwise would; if it is not connected, the
                                          * element boots up when it is next connected.
                                          *
                                          * Using `disable-upgrade` with PolymerElement prevents any data propagation
                                          * to the element, any element DOM from stamping, or any work done in
                                          * connected/disconnctedCallback from occuring, but it does not prevent work
                                          * done in the element constructor.
                                          *
                                          * Note, this mixin must be applied on top of any element class that
                                          * itself implements a `connectedCallback` so that it can control the work
                                          * done in `connectedCallback`. For example,
                                          *
                                          *     MyClass = DisableUpgradeMixin(class extends BaseClass {...});
                                          *
                                          * @mixinFunction
                                          * @polymer
                                          * @appliesMixin ElementMixin
                                          * @template T
                                          * @param {function(new:T)} superClass Class to apply mixin to.
                                          * @return {function(new:T)} superClass with mixin applied.
                                          */var disableUpgradeMixin={DisableUpgradeMixin:DisableUpgradeMixin};/**
   @license
   Copyright (c) 2017 Vaadin Ltd.
   This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   */const DatePickerHelper=class VaadinDatePickerHelper{/**
   * Get ISO 8601 week number for the given date.
   *
   * @param {Date} Date object
   * @return {Number} Week number
   */static _getISOWeekNumber(date){// Ported from Vaadin Framework method com.vaadin.client.DateTimeService.getISOWeekNumber(date)
var dayOfWeek=date.getDay();// 0 == sunday
// ISO 8601 use weeks that start on monday so we use
// mon=1,tue=2,...sun=7;
if(0===dayOfWeek){dayOfWeek=7}// Find nearest thursday (defines the week in ISO 8601). The week number
// for the nearest thursday is the same as for the target date.
var nearestThursdayDiff=4-dayOfWeek,nearestThursday=new Date(date.getTime()+1e3*(3600*(24*nearestThursdayDiff))),firstOfJanuary=new Date(0,0);// 4 is thursday
firstOfJanuary.setFullYear(nearestThursday.getFullYear());var timeDiff=nearestThursday.getTime()-firstOfJanuary.getTime(),daysSinceFirstOfJanuary=Math.round(timeDiff/(1e3*(3600*24)));// Rounding the result, as the division doesn't result in an integer
// when the given date is inside daylight saving time period.
return Math.floor(daysSinceFirstOfJanuary/7+1)}/**
     * Check if two dates are equal.
     *
     * @param {Date} date1
     * @param {Date} date2
     * @return {Boolean} True if the given date objects refer to the same date
     */static _dateEquals(date1,date2){return date1 instanceof Date&&date2 instanceof Date&&date1.getFullYear()===date2.getFullYear()&&date1.getMonth()===date2.getMonth()&&date1.getDate()===date2.getDate()}/**
     * Check if the given date is in the range of allowed dates.
     *
     * @param {Date} date The date to check
     * @param {Date} min Range start
     * @param {Date} max Range end
     * @return {Boolean} True if the date is in the range
     */static _dateAllowed(date,min,max){return(!min||date>=min)&&(!max||date<=max)}/**
     * Get closest date from array of dates.
     *
     * @param {Date} date The date to compare dates with
     * @param {Array} dates Array of date objects
     * @return {Date} Closest date
     */static _getClosestDate(date,dates){return dates.filter(date=>date!==void 0).reduce((closestDate,candidate)=>{if(!candidate){return closestDate}if(!closestDate){return candidate}var candidateDiff=Math.abs(date.getTime()-candidate.getTime()),closestDateDiff=Math.abs(closestDate.getTime()-date.getTime());return candidateDiff<closestDateDiff?candidate:closestDate})}/**
     * Extracts the basic component parts of a date (day, month and year)
     * to the expected format.
     */static _extractDateParts(date){return{day:date.getDate(),month:date.getMonth(),year:date.getFullYear()}}};var vaadinDatePickerHelper={DatePickerHelper:DatePickerHelper};const DatePickerMixin=subclass=>class VaadinDatePickerMixin extends mixinBehaviors([IronResizableBehavior],subclass){static get properties(){return{/**
       * The current selected date.
       */_selectedDate:{type:Date},_focusedDate:Date,/**
       * The value for this element.
       *
       * Supported date formats:
       * - ISO 8601 `"YYYY-MM-DD"` (default)
       * - 6-digit extended ISO 8601 `"+YYYYYY-MM-DD"`, `"-YYYYYY-MM-DD"`
       *
       * @type {String}
       */value:{type:String,observer:"_valueChanged",notify:!0,value:""},/**
       * Set to true to mark the input as required.
       */required:{type:Boolean,value:!1},/**
       * The name of this element.
       */name:{type:String},/**
       * Date which should be visible when there is no value selected.
       *
       * The same date formats as for the `value` property are supported.
       */initialPosition:String,/**
       * The label for this element.
       */label:String,/**
       * Set true to open the date selector overlay.
       */opened:{type:Boolean,reflectToAttribute:!0,notify:!0,observer:"_openedChanged"},/**
       * Set true to display ISO-8601 week numbers in the calendar. Notice that
       * displaying week numbers is only supported when `i18n.firstDayOfWeek`
       * is 1 (Monday).
       */showWeekNumbers:{type:Boolean},_fullscreen:{value:!1,observer:"_fullscreenChanged"},_fullscreenMediaQuery:{value:"(max-width: 420px), (max-height: 420px)"},// An array of ancestor elements whose -webkit-overflow-scrolling is forced from value
// 'touch' to value 'auto' in order to prevent them from clipping the dropdown. iOS only.
_touchPrevented:Array,/**
       * The object used to localize this component.
       * To change the default localization, replace the entire
       * _i18n_ object or just the property you want to modify.
       *
       * The object has the following JSON structure and default values:
           {
            // An array with the full names of months starting
            // with January.
            monthNames: [
              'January', 'February', 'March', 'April', 'May',
              'June', 'July', 'August', 'September',
              'October', 'November', 'December'
            ],
             // An array of weekday names starting with Sunday. Used
            // in screen reader announcements.
            weekdays: [
              'Sunday', 'Monday', 'Tuesday', 'Wednesday',
              'Thursday', 'Friday', 'Saturday'
            ],
             // An array of short weekday names starting with Sunday.
            // Displayed in the calendar.
            weekdaysShort: [
              'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
            ],
             // An integer indicating the first day of the week
            // (0 = Sunday, 1 = Monday, etc.).
            firstDayOfWeek: 0,
             // Used in screen reader announcements along with week
            // numbers, if they are displayed.
            week: 'Week',
             // Translation of the Calendar icon button title.
            calendar: 'Calendar',
             // Translation of the Clear icon button title.
            clear: 'Clear',
             // Translation of the Today shortcut button text.
            today: 'Today',
             // Translation of the Cancel button text.
            cancel: 'Cancel',
             // A function to format given `Object` as
            // date string. Object is in the format `{ day: ..., month: ..., year: ... }`
            // Note: The argument month is 0-based. This means that January = 0 and December = 11.
            formatDate: d => {
              // returns a string representation of the given
              // object in 'MM/DD/YYYY' -format
            },
             // A function to parse the given text to an `Object` in the format `{ day: ..., month: ..., year: ... }`.
            // Must properly parse (at least) text formatted by `formatDate`.
            // Setting the property to null will disable keyboard input feature.
            // Note: The argument month is 0-based. This means that January = 0 and December = 11.
            parseDate: text => {
              // Parses a string in 'MM/DD/YY', 'MM/DD' or 'DD' -format to
              // an `Object` in the format `{ day: ..., month: ..., year: ... }`.
            }
             // A function to format given `monthName` and
            // `fullYear` integer as calendar title string.
            formatTitle: (monthName, fullYear) => {
              return monthName + ' ' + fullYear;
            }
          }
        *
       * @default {English/US}
       */i18n:{type:Object,value:()=>{return{monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],firstDayOfWeek:0,week:"Week",calendar:"Calendar",clear:"Clear",today:"Today",cancel:"Cancel",formatDate:d=>{const yearStr=(d.year+"").replace(/\d+/,y=>"0000".substr(y.length)+y);return[d.month+1,d.day,yearStr].join("/")},parseDate:text=>{const parts=text.split("/"),today=new Date;let date,month=today.getMonth(),year=today.getFullYear();if(3===parts.length){year=parseInt(parts[2]);if(3>parts[2].length&&0<=year){year+=50>year?2e3:1900}month=parseInt(parts[0])-1;date=parseInt(parts[1])}else if(2===parts.length){month=parseInt(parts[0])-1;date=parseInt(parts[1])}else if(1===parts.length){date=parseInt(parts[0])}if(date!==void 0){return{day:date,month,year}}},formatTitle:(monthName,fullYear)=>{return monthName+" "+fullYear}}}},/**
       * The earliest date that can be selected. All earlier dates will be disabled.
       *
       * Supported date formats:
       * - ISO 8601 `"YYYY-MM-DD"` (default)
       * - 6-digit extended ISO 8601 `"+YYYYYY-MM-DD"`, `"-YYYYYY-MM-DD"`
       *
       * @type {String}
       */min:{type:String,observer:"_minChanged"},/**
       * The latest date that can be selected. All later dates will be disabled.
       *
       * Supported date formats:
       * - ISO 8601 `"YYYY-MM-DD"` (default)
       * - 6-digit extended ISO 8601 `"+YYYYYY-MM-DD"`, `"-YYYYYY-MM-DD"`
       *
       * @type {String}
       */max:{type:String,observer:"_maxChanged"},/**
       * The earliest date that can be selected. All earlier dates will be disabled.
       */_minDate:{type:Date,// null does not work here because minimizer passes undefined to overlay (#351)
value:""},/**
       * The latest date that can be selected. All later dates will be disabled.
       */_maxDate:{type:Date,value:""},_noInput:{type:Boolean,computed:"_isNoInput(_fullscreen, _ios, i18n, i18n.*)"},_ios:{type:Boolean,value:navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/)},_webkitOverflowScroll:{type:Boolean,value:""===document.createElement("div").style.webkitOverflowScrolling},_ignoreAnnounce:{value:!0},_focusOverlayOnOpen:Boolean,_overlayInitialized:Boolean}}static get observers(){return["_updateHasValue(value)","_validateInput(_selectedDate, _minDate, _maxDate)","_selectedDateChanged(_selectedDate, i18n.formatDate)","_focusedDateChanged(_focusedDate, i18n.formatDate)","_announceFocusedDate(_focusedDate, opened, _ignoreAnnounce)"]}ready(){super.ready();this._boundOnScroll=this._onScroll.bind(this);this._boundFocus=this._focus.bind(this);this._boundUpdateAlignmentAndPosition=this._updateAlignmentAndPosition.bind(this);const isClearButton=e=>{const path=e.composedPath(),inputIndex=path.indexOf(this._inputElement);return 1===path.slice(0,inputIndex).filter(el=>el.getAttribute&&"clear-button"===el.getAttribute("part")).length};addListener(this,"tap",e=>{// FIXME(platosha): use preventDefault in the text field clear button,
// then the following composedPath check could be simplified down
// to `if (!e.defaultPrevented)`.
// https://github.com/vaadin/vaadin-text-field/issues/352
if(!isClearButton(e)){this.open()}});this.addEventListener("touchend",e=>{if(!isClearButton(e)){e.preventDefault()}});this.addEventListener("keydown",this._onKeydown.bind(this));this.addEventListener("input",this._onUserInput.bind(this));this.addEventListener("focus",e=>this._noInput&&e.target.blur());this.addEventListener("blur",e=>!this.opened&&this.validate())}_initOverlay(){this.$.overlay.removeAttribute("disable-upgrade");this._overlayInitialized=!0;this.$.overlay.addEventListener("opened-changed",e=>this.opened=e.detail.value);this._overlayContent.addEventListener("close",this._close.bind(this));this._overlayContent.addEventListener("focus-input",this._focusAndSelect.bind(this));this.$.overlay.addEventListener("vaadin-overlay-escape-press",this._boundFocus);// Keep focus attribute in focusElement for styling
this._overlayContent.addEventListener("focus",()=>this.focusElement._setFocused(!0));this.$.overlay.addEventListener("vaadin-overlay-close",this._onVaadinOverlayClose.bind(this))}/**
     * @protected
     */disconnectedCallback(){super.disconnectedCallback();if(this._overlayInitialized){this.$.overlay.removeEventListener("vaadin-overlay-escape-press",this._boundFocus)}this.opened=!1}/**
     * Opens the dropdown.
     */open(){if(!this.disabled&&!this.readonly){this.opened=!0}}_close(e){if(e){e.stopPropagation()}this._focus();this.close()}/**
     * Closes the dropdown.
     */close(){if(this._overlayInitialized){this.$.overlay.close()}}get _inputElement(){return this._input()}get _nativeInput(){if(this._inputElement){// vaadin-text-field's input is focusElement
// iron-input's input is inputElement
return this._inputElement.focusElement?this._inputElement.focusElement:this._inputElement.inputElement?this._inputElement.inputElement:window.unwrap?window.unwrap(this._inputElement):this._inputElement}}_parseDate(str){// Parsing with RegExp to ensure correct format
var parts=/^([-+]\d{1}|\d{2,4}|[-+]\d{6})-(\d{1,2})-(\d{1,2})$/.exec(str);if(!parts){return}var date=new Date(0,0);// Wrong date (1900-01-01), but with midnight in local time
date.setFullYear(parseInt(parts[1],10));date.setMonth(parseInt(parts[2],10)-1);date.setDate(parseInt(parts[3],10));return date}_isNoInput(fullscreen,ios,i18n){return!this._inputElement||fullscreen||ios||!i18n.parseDate}_formatISO(date){if(!(date instanceof Date)){return""}const pad=(num,fmt="00")=>(fmt+num).substr((fmt+num).length-fmt.length);let yearSign="",yearFmt="0000",yearAbs=date.getFullYear();if(0>yearAbs){yearAbs=-yearAbs;yearSign="-";yearFmt="000000"}else if(1e4<=date.getFullYear()){yearSign="+";yearFmt="000000"}const year=yearSign+pad(yearAbs,yearFmt),month=pad(date.getMonth()+1),day=pad(date.getDate());return[year,month,day].join("-")}_openedChanged(opened){if(opened&&!this._overlayInitialized){this._initOverlay()}if(this._overlayInitialized){this.$.overlay.opened=opened}if(opened){this._updateAlignmentAndPosition()}}_selectedDateChanged(selectedDate,formatDate){if(selectedDate===void 0||formatDate===void 0){return}if(this.__userInputOccurred){this.__dispatchChange=!0}const inputValue=selectedDate&&formatDate(DatePickerHelper._extractDateParts(selectedDate)),value=this._formatISO(selectedDate);if(value!==this.value){this.validate(inputValue);this.value=value}this.__userInputOccurred=!1;this.__dispatchChange=!1;this._ignoreFocusedDateChange=!0;this._focusedDate=selectedDate;this._ignoreFocusedDateChange=!1;this._inputValue=selectedDate?inputValue:""}_focusedDateChanged(focusedDate,formatDate){if(focusedDate===void 0||formatDate===void 0){return}this.__userInputOccurred=!0;if(!this._ignoreFocusedDateChange&&!this._noInput){this._inputValue=focusedDate?formatDate(DatePickerHelper._extractDateParts(focusedDate)):""}}_updateHasValue(value){if(value){this.setAttribute("has-value","")}else{this.removeAttribute("has-value")}}__getOverlayTheme(theme,overlayInitialized){if(overlayInitialized){return theme}}_handleDateChange(property,value,oldValue){if(!value){this[property]="";return}var date=this._parseDate(value);if(!date){this.value=oldValue;return}if(!DatePickerHelper._dateEquals(this[property],date)){this[property]=date}}_valueChanged(value,oldValue){if(this.__dispatchChange){this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}this._handleDateChange("_selectedDate",value,oldValue)}_minChanged(value,oldValue){this._handleDateChange("_minDate",value,oldValue)}_maxChanged(value,oldValue){this._handleDateChange("_maxDate",value,oldValue)}_updateAlignmentAndPosition(){if(!this._overlayInitialized){return}if(!this._fullscreen){const inputRect=this._inputElement.getBoundingClientRect(),bottomAlign=inputRect.top>window.innerHeight/2,rightAlign=inputRect.left+this.clientWidth/2>window.innerWidth/2;if(rightAlign){const viewportWidth=Math.min(window.innerWidth,document.documentElement.clientWidth);this.$.overlay.setAttribute("right-aligned","");this.$.overlay.style.removeProperty("left");this.$.overlay.style.right=viewportWidth-inputRect.right+"px"}else{this.$.overlay.removeAttribute("right-aligned");this.$.overlay.style.removeProperty("right");this.$.overlay.style.left=inputRect.left+"px"}if(bottomAlign){const viewportHeight=Math.min(window.innerHeight,document.documentElement.clientHeight);this.$.overlay.setAttribute("bottom-aligned","");this.$.overlay.style.removeProperty("top");this.$.overlay.style.bottom=viewportHeight-inputRect.top+"px"}else{this.$.overlay.removeAttribute("bottom-aligned");this.$.overlay.style.removeProperty("bottom");this.$.overlay.style.top=inputRect.bottom+"px"}}this.$.overlay.setAttribute("dir",getComputedStyle(this._inputElement).getPropertyValue("direction"));this._overlayContent._repositionYearScroller()}_fullscreenChanged(){if(this._overlayInitialized&&this.$.overlay.opened){this._updateAlignmentAndPosition()}}_onOverlayOpened(){this._openedWithFocusRing=this.hasAttribute("focus-ring")||this.focusElement&&this.focusElement.hasAttribute("focus-ring");var parsedInitialPosition=this._parseDate(this.initialPosition),initialPosition=this._selectedDate||this._overlayContent.initialPosition||parsedInitialPosition||new Date;if(parsedInitialPosition||DatePickerHelper._dateAllowed(initialPosition,this._minDate,this._maxDate)){this._overlayContent.initialPosition=initialPosition}else{this._overlayContent.initialPosition=DatePickerHelper._getClosestDate(initialPosition,[this._minDate,this._maxDate])}this._overlayContent.scrollToDate(this._overlayContent.focusedDate||this._overlayContent.initialPosition);// Have a default focused date
this._ignoreFocusedDateChange=!0;this._overlayContent.focusedDate=this._overlayContent.focusedDate||this._overlayContent.initialPosition;this._ignoreFocusedDateChange=!1;window.addEventListener("scroll",this._boundOnScroll,!0);this.addEventListener("iron-resize",this._boundUpdateAlignmentAndPosition);if(this._webkitOverflowScroll){this._touchPrevented=this._preventWebkitOverflowScrollingTouch(this.parentElement)}if(this._focusOverlayOnOpen){this._overlayContent.focus();this._focusOverlayOnOpen=!1}else{this._focus()}if(this._noInput&&this.focusElement){this.focusElement.blur()}this.updateStyles();this._ignoreAnnounce=!1}// A hack needed for iOS to prevent dropdown from being clipped in an
// ancestor container with -webkit-overflow-scrolling: touch;
_preventWebkitOverflowScrollingTouch(element){var result=[];while(element){if("touch"===window.getComputedStyle(element).webkitOverflowScrolling){var oldInlineValue=element.style.webkitOverflowScrolling;element.style.webkitOverflowScrolling="auto";result.push({element:element,oldInlineValue:oldInlineValue})}element=element.parentElement}return result}_onOverlayClosed(){this._ignoreAnnounce=!0;window.removeEventListener("scroll",this._boundOnScroll,!0);this.removeEventListener("iron-resize",this._boundUpdateAlignmentAndPosition);if(this._touchPrevented){this._touchPrevented.forEach(prevented=>prevented.element.style.webkitOverflowScrolling=prevented.oldInlineValue);this._touchPrevented=[]}this.updateStyles();// Select the parsed input or focused date
this._ignoreFocusedDateChange=!0;if(this.i18n.parseDate){var inputValue=this._inputValue||"";const dateObject=this.i18n.parseDate(inputValue),parsedDate=dateObject&&this._parseDate(`${dateObject.year}-${dateObject.month+1}-${dateObject.day}`);if(this._isValidDate(parsedDate)){this._selectedDate=parsedDate}else{this._selectedDate=null;this._inputValue=inputValue}}else if(this._focusedDate){this._selectedDate=this._focusedDate}this._ignoreFocusedDateChange=!1;if(this._nativeInput&&this._nativeInput.selectionStart){this._nativeInput.selectionStart=this._nativeInput.selectionEnd}this.validate()}/**
     * Returns true if `value` is valid, and sets the `invalid` flag appropriately.
     *
     * @param {string} value Value to validate. Optional, defaults to user's input value.
     * @return {boolean} True if the value is valid and sets the `invalid` flag appropriately
     */validate(value){// reset invalid state on the underlying text field
this.invalid=!1;value=value!==void 0?value:this._inputValue;return!(this.invalid=!this.checkValidity(value))}/**
     * Returns true if the current input value satisfies all constraints (if any)
     *
     * Override the `checkValidity` method for custom validations.
     *
     * @param {string} value Value to validate. Optional, defaults to the selected date.
     * @return {boolean} True if the value is valid
     */checkValidity(value){var inputValid=!value||this._selectedDate&&value===this.i18n.formatDate(DatePickerHelper._extractDateParts(this._selectedDate)),minMaxValid=!this._selectedDate||DatePickerHelper._dateAllowed(this._selectedDate,this._minDate,this._maxDate),inputValidity=!0;if(this._inputElement){if(this._inputElement.checkValidity){// vaadin native input elements have the checkValidity method
inputValidity=this._inputElement.checkValidity(value)}else if(this._inputElement.validate){// iron-form-elements have the validate API
inputValidity=this._inputElement.validate(value)}}return inputValid&&minMaxValid&&inputValidity}_onScroll(e){if(e.target===window||!this._overlayContent.contains(e.target)){this._updateAlignmentAndPosition()}}_focus(){if(this._noInput){this._overlayInitialized&&this._overlayContent.focus()}else{this._inputElement.focus()}}_focusAndSelect(){this._focus();this._setSelectionRange(0,this._inputValue.length)}_setSelectionRange(a,b){if(this._nativeInput&&this._nativeInput.setSelectionRange){this._nativeInput.setSelectionRange(a,b)}}/**
     * Keyboard Navigation
     */_eventKey(e){for(var keys=["down","up","enter","esc","tab"],i=0,k;i<keys.length;i++){k=keys[i];if(IronA11yKeysBehavior.keyboardEventMatchesKeys(e,k)){return k}}}_isValidDate(d){return d&&!isNaN(d.getTime())}_onKeydown(e){if(this._noInput){// The input element cannot be readonly as it would conflict with
// the required attribute. Both are not allowed on an input element.
// Therefore we prevent default on most keydown events.
var allowedKeys=[9// tab
];if(-1===allowedKeys.indexOf(e.keyCode)){e.preventDefault()}}switch(this._eventKey(e)){case"down":case"up":// prevent scrolling the page with arrows
e.preventDefault();if(this.opened){this._overlayContent.focus();this._overlayContent._onKeydown(e)}else{this._focusOverlayOnOpen=!0;this.open()}break;case"enter":{const dateObject=this.i18n.parseDate(this._inputValue),parsedDate=dateObject&&this._parseDate(dateObject.year+"-"+(dateObject.month+1)+"-"+dateObject.day);if(this._overlayInitialized&&this._overlayContent.focusedDate&&this._isValidDate(parsedDate)){this._selectedDate=this._overlayContent.focusedDate}this.close();break}case"esc":this._focusedDate=this._selectedDate;this._close();break;case"tab":if(this.opened){e.preventDefault();// Clear the selection range (remains visible on IE)
this._setSelectionRange(0,0);if(e.shiftKey){this._overlayContent.focusCancel()}else{this._overlayContent.focus();this._overlayContent.revealDate(this._focusedDate)}}break;}}_validateInput(date,min,max){if(date&&(min||max)){this.invalid=!DatePickerHelper._dateAllowed(date,min,max)}}_onUserInput(e){if(!this.opened&&this._inputElement.value){this.open()}this._userInputValueChanged()}_userInputValueChanged(value){if(this.opened&&this._inputValue){const dateObject=this.i18n.parseDate&&this.i18n.parseDate(this._inputValue),parsedDate=dateObject&&this._parseDate(`${dateObject.year}-${dateObject.month+1}-${dateObject.day}`);if(this._isValidDate(parsedDate)){this._ignoreFocusedDateChange=!0;if(!DatePickerHelper._dateEquals(parsedDate,this._focusedDate)){this._focusedDate=parsedDate}this._ignoreFocusedDateChange=!1}}}_announceFocusedDate(_focusedDate,opened,_ignoreAnnounce){if(opened&&!_ignoreAnnounce){this._overlayContent.announceFocusedDate()}}get _overlayContent(){return this.$.overlay.content.querySelector("#overlay-content")}/**
     * Fired when the user commits a value change.
     *
     * @event change
     */};var vaadinDatePickerMixin={DatePickerMixin:DatePickerMixin};class MonthCalendarElement extends ThemableMixin(GestureEventListeners(PolymerElement)){static get template(){return html`
    <style>
      :host {
        display: block;
      }

      [part="weekdays"],
      #days {
        display: flex;
        flex-wrap: wrap;
        flex-grow: 1;
      }

      #days-container,
      #weekdays-container {
        display: flex;
      }

      [part="week-numbers"] {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-shrink: 0;
      }

      [part="week-numbers"][hidden],
      [part="weekday"][hidden] {
        display: none;
      }

      [part="weekday"],
      [part="date"] {
        /* Would use calc(100% / 7) but it doesn't work nice on IE */
        width: 14.285714286%;
      }

      [part="weekday"]:empty,
      [part="week-numbers"] {
        width: 12.5%;
        flex-shrink: 0;
      }
    </style>

    <div part="month-header" role="heading">[[_getTitle(month, i18n.monthNames)]]</div>
    <div id="monthGrid" on-tap="_handleTap" on-touchend="_preventDefault" on-touchstart="_onMonthGridTouchStart">
      <div id="weekdays-container">
        <div hidden="[[!_showWeekSeparator(showWeekNumbers, i18n.firstDayOfWeek)]]" part="weekday"></div>
        <div part="weekdays">
          <template is="dom-repeat" items="[[_getWeekDayNames(i18n.weekdays, i18n.weekdaysShort, showWeekNumbers, i18n.firstDayOfWeek)]]">
            <div part="weekday" role="heading" aria-label\$="[[item.weekDay]]">[[item.weekDayShort]]</div>
          </template>
        </div>
      </div>
      <div id="days-container">
        <div part="week-numbers" hidden="[[!_showWeekSeparator(showWeekNumbers, i18n.firstDayOfWeek)]]">
          <template is="dom-repeat" items="[[_getWeekNumbers(_days)]]">
            <div part="week-number" role="heading" aria-label\$="[[i18n.week]] [[item]]">[[item]]</div>
          </template>
        </div>
        <div id="days">
          <template is="dom-repeat" items="[[_days]]">
            <div part="date" today\$="[[_isToday(item)]]" selected\$="[[_dateEquals(item, selectedDate)]]" focused\$="[[_dateEquals(item, focusedDate)]]" date="[[item]]" disabled\$="[[!_dateAllowed(item, minDate, maxDate)]]" role\$="[[_getRole(item)]]" aria-label\$="[[_getAriaLabel(item)]]" aria-disabled\$="[[_getAriaDisabled(item, minDate, maxDate)]]">[[_getDate(item)]]</div>
          </template>
        </div>
      </div>
    </div>
`}static get is(){return"vaadin-month-calendar"}static get properties(){return{/**
       * A `Date` object defining the month to be displayed. Only year and
       * month properties are actually used.
       */month:{type:Date,value:new Date},/**
       * A `Date` object for the currently selected date.
       */selectedDate:{type:Date,notify:!0},/**
       * A `Date` object for the currently focused date.
       */focusedDate:Date,showWeekNumbers:{type:Boolean,value:!1},i18n:{type:Object},/**
       * Flag stating whether taps on the component should be ignored.
       */ignoreTaps:Boolean,_notTapping:Boolean,/**
       * The earliest date that can be selected. All earlier dates will be disabled.
       */minDate:{type:Date,value:null},/**
       * The latest date that can be selected. All later dates will be disabled.
       */maxDate:{type:Date,value:null},_days:{type:Array,computed:"_getDays(month, i18n.firstDayOfWeek, minDate, maxDate)"},disabled:{type:Boolean,reflectToAttribute:!0,computed:"_isDisabled(month, minDate, maxDate)"}}}static get observers(){return["_showWeekNumbersChanged(showWeekNumbers, i18n.firstDayOfWeek)"]}_dateEquals(date1,date2){return DatePickerHelper._dateEquals(date1,date2)}_dateAllowed(date,min,max){return DatePickerHelper._dateAllowed(date,min,max)}/* Returns true if all the dates in the month are out of the allowed range */_isDisabled(month,minDate,maxDate){// First day of the month
var firstDate=new Date(0,0);firstDate.setFullYear(month.getFullYear());firstDate.setMonth(month.getMonth());firstDate.setDate(1);// Last day of the month
var lastDate=new Date(0,0);lastDate.setFullYear(month.getFullYear());lastDate.setMonth(month.getMonth()+1);lastDate.setDate(0);if(minDate&&maxDate&&minDate.getMonth()===maxDate.getMonth()&&minDate.getMonth()===month.getMonth()&&0<=maxDate.getDate()-minDate.getDate()){return!1}return!this._dateAllowed(firstDate,minDate,maxDate)&&!this._dateAllowed(lastDate,minDate,maxDate)}_getTitle(month,monthNames){if(month===void 0||monthNames===void 0){return}return this.i18n.formatTitle(monthNames[month.getMonth()],month.getFullYear())}_onMonthGridTouchStart(){this._notTapping=!1;setTimeout(()=>this._notTapping=!0,300)}_dateAdd(date,delta){date.setDate(date.getDate()+delta)}_applyFirstDayOfWeek(weekDayNames,firstDayOfWeek){if(weekDayNames===void 0||firstDayOfWeek===void 0){return}return weekDayNames.slice(firstDayOfWeek).concat(weekDayNames.slice(0,firstDayOfWeek))}_getWeekDayNames(weekDayNames,weekDayNamesShort,showWeekNumbers,firstDayOfWeek){if(weekDayNames===void 0||weekDayNamesShort===void 0||showWeekNumbers===void 0||firstDayOfWeek===void 0){return}weekDayNames=this._applyFirstDayOfWeek(weekDayNames,firstDayOfWeek);weekDayNamesShort=this._applyFirstDayOfWeek(weekDayNamesShort,firstDayOfWeek);weekDayNames=weekDayNames.map((day,index)=>{return{weekDay:day,weekDayShort:weekDayNamesShort[index]}});return weekDayNames}_getDate(date){return date?date.getDate():""}_showWeekNumbersChanged(showWeekNumbers,firstDayOfWeek){if(showWeekNumbers&&1===firstDayOfWeek){this.setAttribute("week-numbers","")}else{this.removeAttribute("week-numbers")}}_showWeekSeparator(showWeekNumbers,firstDayOfWeek){// Currently only supported for locales that start the week on Monday.
return showWeekNumbers&&1===firstDayOfWeek}_isToday(date){return this._dateEquals(new Date,date)}_getDays(month,firstDayOfWeek){if(month===void 0||firstDayOfWeek===void 0){return}// First day of the month (at midnight).
var date=new Date(0,0);date.setFullYear(month.getFullYear());date.setMonth(month.getMonth());date.setDate(1);// Rewind to first day of the week.
while(date.getDay()!==firstDayOfWeek){this._dateAdd(date,-1)}var days=[],startMonth=date.getMonth(),targetMonth=month.getMonth();while(date.getMonth()===targetMonth||date.getMonth()===startMonth){days.push(date.getMonth()===targetMonth?new Date(date.getTime()):null);// Advance to next day.
this._dateAdd(date,1)}return days}_getWeekNumber(date,days){if(date===void 0||days===void 0){return}if(!date){// Get the first non-null date from the days array.
date=days.reduce((acc,d)=>{return!acc&&d?d:acc})}return DatePickerHelper._getISOWeekNumber(date)}_getWeekNumbers(dates){return dates.map(date=>this._getWeekNumber(date,dates)).filter((week,index,arr)=>arr.indexOf(week)===index)}_handleTap(e){if(!this.ignoreTaps&&!this._notTapping&&e.target.date&&!e.target.hasAttribute("disabled")){this.selectedDate=e.target.date;this.dispatchEvent(new CustomEvent("date-tap",{bubbles:!0,composed:!0}))}}_preventDefault(e){e.preventDefault()}_getRole(date){return date?"button":"presentation"}_getAriaLabel(date){if(!date){return""}var ariaLabel=this._getDate(date)+" "+this.i18n.monthNames[date.getMonth()]+" "+date.getFullYear()+", "+this.i18n.weekdays[date.getDay()];if(this._isToday(date)){ariaLabel+=", "+this.i18n.today}return ariaLabel}_getAriaDisabled(date,min,max){if(date===void 0||min===void 0||max===void 0){return}return this._dateAllowed(date,min,max)?"false":"true"}}customElements.define(MonthCalendarElement.is,MonthCalendarElement);class InfiniteScrollerElement extends PolymerElement{static get template(){return html`
    <style>
      :host {
        display: block;
        overflow: hidden;
        height: 500px;
      }

      #scroller {
        position: relative;
        height: 100%;
        overflow: auto;
        outline: none;
        margin-right: -40px;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
        overflow-x: hidden;
      }

      #scroller.notouchscroll {
        -webkit-overflow-scrolling: auto;
      }

      #scroller::-webkit-scrollbar {
        display: none;
      }

      .buffer {
        position: absolute;
        width: var(--vaadin-infinite-scroller-buffer-width, 100%);
        box-sizing: border-box;
        padding-right: 40px;
        top: var(--vaadin-infinite-scroller-buffer-offset, 0);
        animation: fadein 0.2s;
      }

      @keyframes fadein {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    </style>

    <div id="scroller" on-scroll="_scroll">
      <div class="buffer"></div>
      <div class="buffer"></div>
      <div id="fullHeight"></div>
    </div>
`}static get is(){return"vaadin-infinite-scroller"}static get properties(){return{/**
       * Count of individual items in each buffer.
       * The scroller has 2 buffers altogether so bufferSize of 20
       * will result in 40 buffered DOM items in total.
       * Changing after initialization not supported.
       */bufferSize:{type:Number,value:20},/**
       * The amount of initial scroll top. Needed in order for the
       * user to be able to scroll backwards.
       */_initialScroll:{value:5e5},/**
       * The index/position mapped at _initialScroll point.
       */_initialIndex:{value:0},_buffers:Array,_preventScrollEvent:Boolean,_mayHaveMomentum:Boolean,_initialized:Boolean,active:{type:Boolean,observer:"_activated"}}}ready(){super.ready();this._buffers=Array.prototype.slice.call(this.root.querySelectorAll(".buffer"));this.$.fullHeight.style.height=2*this._initialScroll+"px";var tpl=this.querySelector("template");this._TemplateClass=templatize(tpl,this,{forwardHostProp:function(prop,value){if("index"!==prop){this._buffers.forEach(buffer=>{[].forEach.call(buffer.children,insertionPoint=>{insertionPoint._itemWrapper.instance[prop]=value})})}}});// Firefox interprets elements with overflow:auto as focusable
// https://bugzilla.mozilla.org/show_bug.cgi?id=1069739
var isFirefox=-1<navigator.userAgent.toLowerCase().indexOf("firefox");if(isFirefox){this.$.scroller.tabIndex=-1}}_activated(active){if(active&&!this._initialized){this._createPool();this._initialized=!0}}_finishInit(){if(!this._initDone){// Once the first set of items start fading in, stamp the rest
this._buffers.forEach(buffer=>{[].forEach.call(buffer.children,insertionPoint=>this._ensureStampedInstance(insertionPoint._itemWrapper))},this);if(!this._buffers[0].translateY){this._reset()}this._initDone=!0}}_translateBuffer(up){var index=up?1:0;this._buffers[index].translateY=this._buffers[index?0:1].translateY+this._bufferHeight*(index?-1:1);this._buffers[index].style.transform="translate3d(0, "+this._buffers[index].translateY+"px, 0)";this._buffers[index].updated=!1;this._buffers.reverse()}_scroll(){if(this._scrollDisabled){return}var scrollTop=this.$.scroller.scrollTop;if(scrollTop<this._bufferHeight||scrollTop>2*this._initialScroll-this._bufferHeight){// Scrolled near the end/beginning of the scrollable area -> reset.
this._initialIndex=~~this.position;this._reset()}// Check if we scrolled enough to translate the buffer positions.
var bufferOffset=this.root.querySelector(".buffer").offsetTop,upperThresholdReached=scrollTop>this._buffers[1].translateY+this.itemHeight+bufferOffset,lowerThresholdReached=scrollTop<this._buffers[0].translateY+this.itemHeight+bufferOffset;if(upperThresholdReached||lowerThresholdReached){this._translateBuffer(lowerThresholdReached);this._updateClones()}if(!this._preventScrollEvent){this.dispatchEvent(new CustomEvent("custom-scroll",{bubbles:!1,composed:!0}));this._mayHaveMomentum=!0}this._preventScrollEvent=!1;this._debouncerScrollFinish=Debouncer.debounce(this._debouncerScrollFinish,timeOut.after(200),()=>{var scrollerRect=this.$.scroller.getBoundingClientRect();if(!this._isVisible(this._buffers[0],scrollerRect)&&!this._isVisible(this._buffers[1],scrollerRect)){this.position=this.position}})}/**
     * Current scroller position as index. Can be a fractional number.
     *
     * @type {Number}
     */set position(index){this._preventScrollEvent=!0;if(index>this._firstIndex&&index<this._firstIndex+2*this.bufferSize){this.$.scroller.scrollTop=this.itemHeight*(index-this._firstIndex)+this._buffers[0].translateY}else{this._initialIndex=~~index;this._reset();this._scrollDisabled=!0;this.$.scroller.scrollTop+=index%1*this.itemHeight;this._scrollDisabled=!1}if(this._mayHaveMomentum){// Stop the possible iOS Safari momentum with -webkit-overflow-scrolling: auto;
this.$.scroller.classList.add("notouchscroll");this._mayHaveMomentum=!1;setTimeout(()=>{// Restore -webkit-overflow-scrolling: touch; after a small delay.
this.$.scroller.classList.remove("notouchscroll")},10)}}/**
     * @private
     */get position(){return(this.$.scroller.scrollTop-this._buffers[0].translateY)/this.itemHeight+this._firstIndex}get itemHeight(){if(!this._itemHeightVal){if(!(window.ShadyCSS&&window.ShadyCSS.nativeCss)){this.updateStyles()}const itemHeight=window.ShadyCSS?window.ShadyCSS.getComputedStyleValue(this,"--vaadin-infinite-scroller-item-height"):getComputedStyle(this).getPropertyValue("--vaadin-infinite-scroller-item-height"),tmpStyleProp="background-position";// Use background-position temp inline style for unit conversion
this.$.fullHeight.style.setProperty(tmpStyleProp,itemHeight);const itemHeightPx=getComputedStyle(this.$.fullHeight).getPropertyValue(tmpStyleProp);this.$.fullHeight.style.removeProperty(tmpStyleProp);this._itemHeightVal=parseFloat(itemHeightPx)}return this._itemHeightVal}get _bufferHeight(){return this.itemHeight*this.bufferSize}_reset(){this._scrollDisabled=!0;this.$.scroller.scrollTop=this._initialScroll;this._buffers[0].translateY=this._initialScroll-this._bufferHeight;this._buffers[1].translateY=this._initialScroll;this._buffers.forEach(buffer=>{buffer.style.transform="translate3d(0, "+buffer.translateY+"px, 0)"});this._buffers[0].updated=this._buffers[1].updated=!1;this._updateClones(!0);this._debouncerUpdateClones=Debouncer.debounce(this._debouncerUpdateClones,timeOut.after(200),()=>{this._buffers[0].updated=this._buffers[1].updated=!1;this._updateClones()});this._scrollDisabled=!1}_createPool(){var container=this.getBoundingClientRect();this._buffers.forEach(buffer=>{for(var i=0;i<this.bufferSize;i++){const itemWrapper=document.createElement("div");itemWrapper.style.height=this.itemHeight+"px";itemWrapper.instance={};const contentId=InfiniteScrollerElement._contentIndex=InfiniteScrollerElement._contentIndex+1||0,slotName="vaadin-infinite-scroller-item-content-"+contentId,insertionPoint=document.createElement("slot");insertionPoint.setAttribute("name",slotName);insertionPoint._itemWrapper=itemWrapper;buffer.appendChild(insertionPoint);itemWrapper.setAttribute("slot",slotName);this.appendChild(itemWrapper);// This is needed by IE
flush();setTimeout(()=>{// Only stamp the visible instances first
if(this._isVisible(itemWrapper,container)){this._ensureStampedInstance(itemWrapper)}},1);// Wait for first reset
}},this);setTimeout(()=>{afterNextRender(this,this._finishInit.bind(this))},1)}_ensureStampedInstance(itemWrapper){if(itemWrapper.firstElementChild){return}var tmpInstance=itemWrapper.instance;itemWrapper.instance=new this._TemplateClass({});itemWrapper.appendChild(itemWrapper.instance.root);Object.keys(tmpInstance).forEach(prop=>{itemWrapper.instance.set(prop,tmpInstance[prop])})}_updateClones(viewPortOnly){this._firstIndex=~~((this._buffers[0].translateY-this._initialScroll)/this.itemHeight)+this._initialIndex;var scrollerRect=viewPortOnly?this.$.scroller.getBoundingClientRect():void 0;this._buffers.forEach((buffer,bufferIndex)=>{if(!buffer.updated){var firstIndex=this._firstIndex+this.bufferSize*bufferIndex;[].forEach.call(buffer.children,(insertionPoint,index)=>{const itemWrapper=insertionPoint._itemWrapper;if(!viewPortOnly||this._isVisible(itemWrapper,scrollerRect)){itemWrapper.instance.index=firstIndex+index}});buffer.updated=!0}},this)}_isVisible(element,container){var rect=element.getBoundingClientRect();return rect.bottom>container.top&&rect.top<container.bottom}}customElements.define(InfiniteScrollerElement.is,InfiniteScrollerElement);const $_documentContainer=document.createElement("template");$_documentContainer.innerHTML=`<dom-module id="vaadin-date-picker-overlay-styles" theme-for="vaadin-date-picker-overlay">
  <template>
    <style>
      :host {
        align-items: flex-start;
        justify-content: flex-start;
      }

      :host([bottom-aligned]) {
        justify-content: flex-end;
      }

      :host([right-aligned]) {
        align-items: flex-end;
      }

      :host([right-aligned][dir="rtl"]) {
        align-items: flex-start;
      }

      [part="overlay"] {
        display: flex;
        flex: auto;
      }

      [part~="content"] {
        flex: auto;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer.content);class DatePickerOverlayContentElement extends ThemableMixin(ThemePropertyMixin(GestureEventListeners(PolymerElement))){static get template(){return html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        outline: none;
        background: #fff;
      }

      [part="overlay-header"] {
        display: flex;
        flex-shrink: 0;
        flex-wrap: nowrap;
        align-items: center;
      }

      :host(:not([fullscreen])) [part="overlay-header"] {
        display: none;
      }

      [part="label"] {
        flex-grow: 1;
      }

      [part="clear-button"]:not([showclear]) {
        display: none;
      }

      [part="years-toggle-button"] {
        display: flex;
      }

      [part="years-toggle-button"][desktop] {
        display: none;
      }

      :host(:not([years-visible])) [part="years-toggle-button"]::before {
        transform: rotate(180deg);
      }

      #scrollers {
        display: flex;
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
      }

      [part="months"],
      [part="years"] {
        height: 100%;
      }

      [part="months"] {
        --vaadin-infinite-scroller-item-height: 270px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      #scrollers[desktop] [part="months"] {
        right: 50px;
        transform: none !important;
      }

      [part="years"] {
        --vaadin-infinite-scroller-item-height: 80px;
        width: 50px;
        position: absolute;
        right: 0;
        transform: translateX(100%);
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        /* Center the year scroller position. */
        --vaadin-infinite-scroller-buffer-offset: 50%;
      }

      #scrollers[desktop] [part="years"] {
        position: absolute;
        transform: none !important;
      }

      [part="years"]::before {
        content: '';
        display: block;
        background: transparent;
        width: 0;
        height: 0;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border-width: 6px;
        border-style: solid;
        border-color: transparent;
        border-left-color: #000;
      }

      :host(.animate) [part="months"],
      :host(.animate) [part="years"] {
        transition: all 200ms;
      }

      [part="toolbar"] {
        display: flex;
        justify-content: space-between;
        z-index: 2;
        flex-shrink: 0;
      }

      [part~="overlay-header"]:not([desktop]) {
        padding-bottom: 40px;
      }

      [part~="years-toggle-button"] {
        position: absolute;
        top: auto;
        right: 8px;
        bottom: 0;
        z-index: 1;
        padding: 8px;
      }

      #announcer {
        display: inline-block;
        position: fixed;
        clip: rect(0, 0, 0, 0);
        clip-path: inset(100%);
      }
    </style>

    <div id="announcer" role="alert" aria-live="polite">
      [[i18n.calendar]]
    </div>

    <div part="overlay-header" on-touchend="_preventDefault" desktop\$="[[_desktopMode]]" aria-hidden="true">
      <div part="label">[[_formatDisplayed(selectedDate, i18n.formatDate, label)]]</div>
      <div part="clear-button" on-tap="_clear" showclear\$="[[_showClear(selectedDate)]]"></div>
      <div part="toggle-button" on-tap="_cancel"></div>

      <div part="years-toggle-button" desktop\$="[[_desktopMode]]" on-tap="_toggleYearScroller" aria-hidden="true">
        [[_yearAfterXMonths(_visibleMonthIndex)]]
      </div>
    </div>

    <div id="scrollers" desktop\$="[[_desktopMode]]" on-track="_track">
      <vaadin-infinite-scroller id="monthScroller" on-custom-scroll="_onMonthScroll" on-touchstart="_onMonthScrollTouchStart" buffer-size="3" active="[[initialPosition]]" part="months">
        <template>
          <vaadin-month-calendar i18n="[[i18n]]" month="[[_dateAfterXMonths(index)]]" selected-date="{{selectedDate}}" focused-date="[[focusedDate]]" ignore-taps="[[_ignoreTaps]]" show-week-numbers="[[showWeekNumbers]]" min-date="[[minDate]]" max-date="[[maxDate]]" focused\$="[[_focused]]" part="month" theme\$="[[theme]]">
          </vaadin-month-calendar>
        </template>
      </vaadin-infinite-scroller>
      <vaadin-infinite-scroller id="yearScroller" on-tap="_onYearTap" on-custom-scroll="_onYearScroll" on-touchstart="_onYearScrollTouchStart" buffer-size="12" active="[[initialPosition]]" part="years">
        <template>
          <div part="year-number" role="button" current\$="[[_isCurrentYear(index)]]" selected\$="[[_isSelectedYear(index, selectedDate)]]">
            [[_yearAfterXYears(index)]]
          </div>
          <div part="year-separator" aria-hidden="true"></div>
        </template>
      </vaadin-infinite-scroller>
    </div>

    <div on-touchend="_preventDefault" role="toolbar" part="toolbar">
      <vaadin-button id="todayButton" part="today-button" disabled="[[!_isTodayAllowed(minDate, maxDate)]]" on-tap="_onTodayTap">
        [[i18n.today]]
      </vaadin-button>
      <vaadin-button id="cancelButton" part="cancel-button" on-tap="_cancel">
        [[i18n.cancel]]
      </vaadin-button>
    </div>

    <iron-media-query query="(min-width: 375px)" query-matches="{{_desktopMode}}"></iron-media-query>
`}static get is(){return"vaadin-date-picker-overlay-content"}static get properties(){return{/**
       * The value for this element.
       */selectedDate:{type:Date,notify:!0},/**
       * Date value which is focused using keyboard.
       */focusedDate:{type:Date,notify:!0,observer:"_focusedDateChanged"},_focusedMonthDate:Number,/**
       * Date which should be visible when there is no value selected.
       */initialPosition:{type:Date,observer:"_initialPositionChanged"},_originDate:{value:new Date},_visibleMonthIndex:Number,_desktopMode:Boolean,_translateX:{observer:"_translateXChanged"},_yearScrollerWidth:{value:50},i18n:{type:Object},showWeekNumbers:{type:Boolean},_ignoreTaps:Boolean,_notTapping:Boolean,/**
       * The earliest date that can be selected. All earlier dates will be disabled.
       */minDate:Date,/**
       * The latest date that can be selected. All later dates will be disabled.
       */maxDate:Date,_focused:Boolean,/**
       * Input label
       */label:String}}ready(){super.ready();this.setAttribute("tabindex",0);this.addEventListener("keydown",this._onKeydown.bind(this));addListener(this,"tap",this._stopPropagation);this.addEventListener("focus",this._onOverlayFocus.bind(this));this.addEventListener("blur",this._onOverlayBlur.bind(this))}/**
     * Fired when the scroller reaches the target scrolling position.
     * @event scroll-animation-finished
     * @param {Number} detail.position new position
     * @param {Number} detail.oldPosition old position
     */connectedCallback(){super.connectedCallback();this._closeYearScroller();this._toggleAnimateClass(!0);setTouchAction(this.$.scrollers,"pan-y");IronA11yAnnouncer.requestAvailability()}announceFocusedDate(){var focusedDate=this._currentlyFocusedDate(),announce=[];if(DatePickerHelper._dateEquals(focusedDate,new Date)){announce.push(this.i18n.today)}announce=announce.concat([this.i18n.weekdays[focusedDate.getDay()],focusedDate.getDate(),this.i18n.monthNames[focusedDate.getMonth()],focusedDate.getFullYear()]);if(this.showWeekNumbers&&1===this.i18n.firstDayOfWeek){announce.push(this.i18n.week);announce.push(DatePickerHelper._getISOWeekNumber(focusedDate))}this.dispatchEvent(new CustomEvent("iron-announce",{bubbles:!0,composed:!0,detail:{text:announce.join(" ")}}));return}/**
     * Focuses the cancel button
     */focusCancel(){this.$.cancelButton.focus()}/**
     * Scrolls the list to the given Date.
     */scrollToDate(date,animate){this._scrollToPosition(this._differenceInMonths(date,this._originDate),animate)}_focusedDateChanged(focusedDate){this.revealDate(focusedDate)}_isCurrentYear(yearsFromNow){return 0===yearsFromNow}_isSelectedYear(yearsFromNow,selectedDate){if(selectedDate){return selectedDate.getFullYear()===this._originDate.getFullYear()+yearsFromNow}}/**
     * Scrolls the month and year scrollers enough to reveal the given date.
     */revealDate(date){if(date){var diff=this._differenceInMonths(date,this._originDate),scrolledAboveViewport=this.$.monthScroller.position>diff,visibleItems=this.$.monthScroller.clientHeight/this.$.monthScroller.itemHeight,scrolledBelowViewport=this.$.monthScroller.position+visibleItems-1<diff;if(scrolledAboveViewport){this._scrollToPosition(diff,!0)}else if(scrolledBelowViewport){this._scrollToPosition(diff-visibleItems+1,!0)}}}_onOverlayFocus(){this._focused=!0}_onOverlayBlur(){this._focused=!1}_initialPositionChanged(initialPosition){this.scrollToDate(initialPosition)}_repositionYearScroller(){this._visibleMonthIndex=Math.floor(this.$.monthScroller.position);this.$.yearScroller.position=(this.$.monthScroller.position+this._originDate.getMonth())/12}_repositionMonthScroller(){this.$.monthScroller.position=12*this.$.yearScroller.position-this._originDate.getMonth();this._visibleMonthIndex=Math.floor(this.$.monthScroller.position)}_onMonthScroll(){this._repositionYearScroller();this._doIgnoreTaps()}_onYearScroll(){this._repositionMonthScroller();this._doIgnoreTaps()}_onYearScrollTouchStart(){this._notTapping=!1;setTimeout(()=>this._notTapping=!0,300);this._repositionMonthScroller()}_onMonthScrollTouchStart(){this._repositionYearScroller()}_doIgnoreTaps(){this._ignoreTaps=!0;this._debouncer=Debouncer.debounce(this._debouncer,timeOut.after(300),()=>this._ignoreTaps=!1)}_formatDisplayed(date,formatDate,label){if(date){return formatDate(DatePickerHelper._extractDateParts(date))}else{return label}}_onTodayTap(){var today=new Date;if(.001>Math.abs(this.$.monthScroller.position-this._differenceInMonths(today,this._originDate))){// Select today only if the month scroller is positioned approximately
// at the beginning of the current month
this.selectedDate=today;this._close()}else{this._scrollToCurrentMonth()}}_scrollToCurrentMonth(){if(this.focusedDate){this.focusedDate=new Date}this.scrollToDate(new Date,!0)}_showClear(selectedDate){return!!selectedDate}_onYearTap(e){if(!this._ignoreTaps&&!this._notTapping){var scrollDelta=e.detail.y-(this.$.yearScroller.getBoundingClientRect().top+this.$.yearScroller.clientHeight/2),yearDelta=scrollDelta/this.$.yearScroller.itemHeight;this._scrollToPosition(this.$.monthScroller.position+12*yearDelta,!0)}}_scrollToPosition(targetPosition,animate){if(this._targetPosition!==void 0){this._targetPosition=targetPosition;return}if(!animate){this.$.monthScroller.position=targetPosition;this._targetPosition=void 0;this._repositionYearScroller();return}this._targetPosition=targetPosition;// http://gizma.com/easing/
var easingFunction=(t,b,c,d)=>{t/=d/2;if(1>t){return c/2*t*t+b}t--;return-c/2*(t*(t-2)-1)+b},duration=animate?300:0,start=0,initialPosition=this.$.monthScroller.position,smoothScroll=timestamp=>{start=start||timestamp;var currentTime=timestamp-start;if(currentTime<duration){var currentPos=easingFunction(currentTime,initialPosition,this._targetPosition-initialPosition,duration);this.$.monthScroller.position=currentPos;window.requestAnimationFrame(smoothScroll)}else{this.dispatchEvent(new CustomEvent("scroll-animation-finished",{bubbles:!0,composed:!0,detail:{position:this._targetPosition,oldPosition:initialPosition}}));this.$.monthScroller.position=this._targetPosition;this._targetPosition=void 0}setTimeout(this._repositionYearScroller.bind(this),1)};// Start the animation.
window.requestAnimationFrame(smoothScroll)}_limit(value,range){return Math.min(range.max,Math.max(range.min,value))}_handleTrack(e){// Check if horizontal movement threshold (dx) not exceeded or
// scrolling fast vertically (ddy).
if(10>Math.abs(e.detail.dx)||10<Math.abs(e.detail.ddy)){return}// If we're flinging quickly -> start animating already.
if(Math.abs(e.detail.ddx)>this._yearScrollerWidth/3){this._toggleAnimateClass(!0)}var newTranslateX=this._translateX+e.detail.ddx;this._translateX=this._limit(newTranslateX,{min:0,max:this._yearScrollerWidth})}_track(e){if(this._desktopMode){// No need to track for swipe gestures on desktop.
return}switch(e.detail.state){case"start":this._toggleAnimateClass(!1);break;case"track":this._handleTrack(e);break;case"end":this._toggleAnimateClass(!0);if(this._translateX>=this._yearScrollerWidth/2){this._closeYearScroller()}else{this._openYearScroller()}break;}}_toggleAnimateClass(enable){if(enable){this.classList.add("animate")}else{this.classList.remove("animate")}}_toggleYearScroller(){this._isYearScrollerVisible()?this._closeYearScroller():this._openYearScroller()}_openYearScroller(){this._translateX=0;this.setAttribute("years-visible","")}_closeYearScroller(){this.removeAttribute("years-visible");this._translateX=this._yearScrollerWidth}_isYearScrollerVisible(){return this._translateX<this._yearScrollerWidth/2}_translateXChanged(x){if(!this._desktopMode){this.$.monthScroller.style.transform="translateX("+(x-this._yearScrollerWidth)+"px)";this.$.yearScroller.style.transform="translateX("+x+"px)"}}_yearAfterXYears(index){var result=new Date(this._originDate);result.setFullYear(parseInt(index)+this._originDate.getFullYear());return result.getFullYear()}_yearAfterXMonths(months){return this._dateAfterXMonths(months).getFullYear()}_dateAfterXMonths(months){var result=new Date(this._originDate);result.setDate(1);result.setMonth(parseInt(months)+this._originDate.getMonth());return result}_differenceInMonths(date1,date2){var months=12*(date1.getFullYear()-date2.getFullYear());return months-date2.getMonth()+date1.getMonth()}_differenceInYears(date1,date2){return this._differenceInMonths(date1,date2)/12}_clear(){this.selectedDate=""}_close(){const overlayContent=this.getRootNode().host,overlay=overlayContent?overlayContent.getRootNode().host:null;if(overlay){overlay.opened=!1}this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_cancel(){this.focusedDate=this.selectedDate;this._close()}_preventDefault(e){e.preventDefault()}/**
     * Keyboard Navigation
     */_eventKey(e){for(var keys=["down","up","right","left","enter","space","home","end","pageup","pagedown","tab","esc"],i=0,k;i<keys.length;i++){k=keys[i];if(IronA11yKeysBehavior.keyboardEventMatchesKeys(e,k)){return k}}}_onKeydown(e){var focus=this._currentlyFocusedDate();// Cannot use (today/cancel).focused flag because vaadin-text-field removes it
// previously in the keydown event.
const isToday=0<=e.composedPath().indexOf(this.$.todayButton),isCancel=0<=e.composedPath().indexOf(this.$.cancelButton),isScroller=!isToday&&!isCancel;var eventKey=this._eventKey(e);if("tab"===eventKey){// We handle tabs here and don't want to bubble up.
e.stopPropagation();const isFullscreen=this.hasAttribute("fullscreen"),isShift=e.shiftKey;if(isFullscreen){e.preventDefault()}else if(isShift&&isScroller||!isShift&&isCancel){// Return focus back to the input field
e.preventDefault();this.dispatchEvent(new CustomEvent("focus-input",{bubbles:!0,composed:!0}))}else if(isShift&&isToday){// Browser returns focus back to the scrollable area. We need to set
// the focused flag, and move the scroll to focused date.
this._focused=!0;setTimeout(()=>this.revealDate(this.focusedDate),1)}else{// Browser moves the focus out of the scroller, hence focused flag must
// set to false.
this._focused=!1}}else if(eventKey){e.preventDefault();e.stopPropagation();switch(eventKey){case"down":this._moveFocusByDays(7);this.focus();break;case"up":this._moveFocusByDays(-7);this.focus();break;case"right":if(isScroller){this._moveFocusByDays(1)}break;case"left":if(isScroller){this._moveFocusByDays(-1)}break;case"enter":if(isScroller||isCancel){this._close()}else if(isToday){this._onTodayTap()}break;case"space":if(isCancel){this._close()}else if(isToday){this._onTodayTap()}else{var focusedDate=this.focusedDate;if(DatePickerHelper._dateEquals(focusedDate,this.selectedDate)){this.selectedDate="";this.focusedDate=focusedDate}else{this.selectedDate=focusedDate}}break;case"home":this._moveFocusInsideMonth(focus,"minDate");break;case"end":this._moveFocusInsideMonth(focus,"maxDate");break;case"pagedown":this._moveFocusByMonths(e.shiftKey?12:1);break;case"pageup":this._moveFocusByMonths(e.shiftKey?-12:-1);break;case"esc":this._cancel();break;}}}_currentlyFocusedDate(){return this.focusedDate||this.selectedDate||this.initialPosition||new Date}_focusDate(dateToFocus){this.focusedDate=dateToFocus;this._focusedMonthDate=dateToFocus.getDate()}_focusClosestDate(focus){this._focusDate(DatePickerHelper._getClosestDate(focus,[this.minDate,this.maxDate]))}_moveFocusByDays(days){var focus=this._currentlyFocusedDate(),dateToFocus=new Date(0,0);dateToFocus.setFullYear(focus.getFullYear());dateToFocus.setMonth(focus.getMonth());dateToFocus.setDate(focus.getDate()+days);if(this._dateAllowed(dateToFocus,this.minDate,this.maxDate)){this._focusDate(dateToFocus)}else{if(this._dateAllowed(focus,this.minDate,this.maxDate)){// Move to min or max date
if(0<days){// down or right
this._focusDate(this.maxDate)}else{// up or left
this._focusDate(this.minDate)}}else{// Move to closest allowed date
this._focusClosestDate(focus)}}}_moveFocusByMonths(months){var focus=this._currentlyFocusedDate(),dateToFocus=new Date(0,0);dateToFocus.setFullYear(focus.getFullYear());dateToFocus.setMonth(focus.getMonth()+months);var targetMonth=dateToFocus.getMonth();dateToFocus.setDate(this._focusedMonthDate||(this._focusedMonthDate=focus.getDate()));if(dateToFocus.getMonth()!==targetMonth){dateToFocus.setDate(0)}if(this._dateAllowed(dateToFocus,this.minDate,this.maxDate)){this.focusedDate=dateToFocus}else{if(this._dateAllowed(focus,this.minDate,this.maxDate)){// Move to min or max date
if(0<months){// pagedown
this._focusDate(this.maxDate)}else{// pageup
this._focusDate(this.minDate)}}else{// Move to closest allowed date
this._focusClosestDate(focus)}}}_moveFocusInsideMonth(focusedDate,property){var dateToFocus=new Date(0,0);dateToFocus.setFullYear(focusedDate.getFullYear());if("minDate"===property){dateToFocus.setMonth(focusedDate.getMonth());dateToFocus.setDate(1)}else{dateToFocus.setMonth(focusedDate.getMonth()+1);dateToFocus.setDate(0)}if(this._dateAllowed(dateToFocus,this.minDate,this.maxDate)){this._focusDate(dateToFocus)}else{if(this._dateAllowed(focusedDate,this.minDate,this.maxDate)){// Move to minDate or maxDate
this._focusDate(this[property])}else{// Move to closest allowed date
this._focusClosestDate(focusedDate)}}}_dateAllowed(date,min,max){return(!min||date>=min)&&(!max||date<=max)}_isTodayAllowed(min,max){var today=new Date,todayMidnight=new Date(0,0);todayMidnight.setFullYear(today.getFullYear());todayMidnight.setMonth(today.getMonth());todayMidnight.setDate(today.getDate());return this._dateAllowed(todayMidnight,min,max)}_stopPropagation(e){e.stopPropagation()}}customElements.define(DatePickerOverlayContentElement.is,DatePickerOverlayContentElement);const p=Element.prototype,matches=p.matches||p.matchesSelector||p.mozMatchesSelector||p.msMatchesSelector||p.oMatchesSelector||p.webkitMatchesSelector,FocusablesHelper={/**
   * Returns a sorted array of tabbable nodes, including the root node.
   * It searches the tabbable nodes in the light and shadow dom of the children,
   * sorting the result by tabindex.
   * @param {!Node} node
   * @return {!Array<!HTMLElement>}
   */getTabbableNodes:function(node){const result=[],needsSortByTabIndex=this._collectTabbableNodes(node,result);// If there is at least one element with tabindex > 0, we need to sort
// the final array by tabindex.
if(needsSortByTabIndex){return this._sortByTabIndex(result)}return result},/**
   * Returns if a element is focusable.
   * @param {!HTMLElement} element
   * @return {boolean}
   */isFocusable:function(element){// From http://stackoverflow.com/a/1600194/4228703:
// There isn't a definite list, it's up to the browser. The only
// standard we have is DOM Level 2 HTML
// https://www.w3.org/TR/DOM-Level-2-HTML/html.html, according to which the
// only elements that have a focus() method are HTMLInputElement,
// HTMLSelectElement, HTMLTextAreaElement and HTMLAnchorElement. This
// notably omits HTMLButtonElement and HTMLAreaElement. Referring to these
// tests with tabbables in different browsers
// http://allyjs.io/data-tables/focusable.html
// Elements that cannot be focused if they have [disabled] attribute.
if(matches.call(element,"input, select, textarea, button, object")){return matches.call(element,":not([disabled])")}// Elements that can be focused even if they have [disabled] attribute.
return matches.call(element,"a[href], area[href], iframe, [tabindex], [contentEditable]")},/**
   * Returns if a element is tabbable. To be tabbable, a element must be
   * focusable, visible, and with a tabindex !== -1.
   * @param {!HTMLElement} element
   * @return {boolean}
   */isTabbable:function(element){return this.isFocusable(element)&&matches.call(element,":not([tabindex=\"-1\"])")&&this._isVisible(element)},/**
   * Returns the normalized element tabindex. If not focusable, returns -1.
   * It checks for the attribute "tabindex" instead of the element property
   * `tabIndex` since browsers assign different values to it.
   * e.g. in Firefox `<div contenteditable>` has `tabIndex = -1`
   * @param {!HTMLElement} element
   * @return {!number}
   * @private
   */_normalizedTabIndex:function(element){if(this.isFocusable(element)){const tabIndex=element.getAttribute("tabindex")||0;return+tabIndex}return-1},/**
   * Searches for nodes that are tabbable and adds them to the `result` array.
   * Returns if the `result` array needs to be sorted by tabindex.
   * @param {!Node} node The starting point for the search; added to `result` if tabbable.
   * @param {!Array<!HTMLElement>} result
   * @return {boolean}
   * @private
   */_collectTabbableNodes:function(node,result){// If not an element or not visible, no need to explore children.
if(node.nodeType!==Node.ELEMENT_NODE||!this._isVisible(node)){return!1}const element=/** @type {!HTMLElement} */node,tabIndex=this._normalizedTabIndex(element);let needsSort=0<tabIndex;if(0<=tabIndex){result.push(element)}// In ShadowDOM v1, tab order is affected by the order of distribution.
// E.g. getTabbableNodes(#root) in ShadowDOM v1 should return [#A, #B];
// in ShadowDOM v0 tab order is not affected by the distribution order,
// in fact getTabbableNodes(#root) returns [#B, #A].
//  <div id="root">
//   <!-- shadow -->
//     <slot name="a">
//     <slot name="b">
//   <!-- /shadow -->
//   <input id="A" slot="a">
//   <input id="B" slot="b" tabindex="1">
//  </div>
let children;if("slot"===element.localName){children=element.assignedNodes({flatten:!0})}else{// Use shadow root if possible, will check for distributed nodes.
children=(element.shadowRoot||element).children}if(children){for(let i=0;i<children.length;i++){// Ensure method is always invoked to collect tabbable children.
needsSort=this._collectTabbableNodes(children[i],result)||needsSort}}return needsSort},/**
   * Returns false if the element has `visibility: hidden` or `display: none`
   * @param {!HTMLElement} element
   * @return {boolean}
   * @private
   */_isVisible:function(element){// Check inline style first to save a re-flow. If looks good, check also
// computed style.
let style=element.style;if("hidden"!==style.visibility&&"none"!==style.display){style=window.getComputedStyle(element);return"hidden"!==style.visibility&&"none"!==style.display}return!1},/**
   * Sorts an array of tabbable elements by tabindex. Returns a new array.
   * @param {!Array<!HTMLElement>} tabbables
   * @return {!Array<!HTMLElement>}
   * @private
   */_sortByTabIndex:function(tabbables){// Implement a merge sort as Array.prototype.sort does a non-stable sort
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
const len=tabbables.length;if(2>len){return tabbables}const pivot=Math.ceil(len/2),left=this._sortByTabIndex(tabbables.slice(0,pivot)),right=this._sortByTabIndex(tabbables.slice(pivot));return this._mergeSortByTabIndex(left,right)},/**
   * Merge sort iterator, merges the two arrays into one, sorted by tab index.
   * @param {!Array<!HTMLElement>} left
   * @param {!Array<!HTMLElement>} right
   * @return {!Array<!HTMLElement>}
   * @private
   */_mergeSortByTabIndex:function(left,right){const result=[];while(0<left.length&&0<right.length){if(this._hasLowerTabOrder(left[0],right[0])){result.push(right.shift())}else{result.push(left.shift())}}return result.concat(left,right)},/**
   * Returns if element `a` has lower tab order compared to element `b`
   * (both elements are assumed to be focusable and tabbable).
   * Elements with tabindex = 0 have lower tab order compared to elements
   * with tabindex > 0.
   * If both have same tabindex, it returns false.
   * @param {!HTMLElement} a
   * @param {!HTMLElement} b
   * @return {boolean}
   * @private
   */_hasLowerTabOrder:function(a,b){// Normalize tabIndexes
// e.g. in Firefox `<div contenteditable>` has `tabIndex = -1`
const ati=Math.max(a.tabIndex,0),bti=Math.max(b.tabIndex,0);return 0===ati||0===bti?bti>ati:ati>bti}};var vaadinFocusablesHelper={FocusablesHelper:FocusablesHelper};let overlayContentCounter=0;const overlayContentCache={},createOverlayContent=cssText=>{const is=overlayContentCache[cssText]||processOverlayStyles(cssText);return document.createElement(is)},processOverlayStyles=cssText=>{overlayContentCounter++;const is=`vaadin-overlay-content-${overlayContentCounter}`,styledTemplate=document.createElement("template"),style=document.createElement("style");style.textContent=":host { display: block; }"+cssText;styledTemplate.content.appendChild(style);if(window.ShadyCSS){window.ShadyCSS.prepareTemplate(styledTemplate,is)}// NOTE(platosha): Have to use an awkward IIFE returning class here
// to prevent this class from showing up in analysis.json & API docs.
/** @private */const klass=(()=>class extends HTMLElement{static get is(){return is}constructor(){super();if(!this.shadowRoot){this.attachShadow({mode:"open"});this.shadowRoot.appendChild(document.importNode(styledTemplate.content,!0))}}connectedCallback(){if(window.ShadyCSS){window.ShadyCSS.styleElement(this)}}})();customElements.define(klass.is,klass);overlayContentCache[cssText]=is;return is};/**
    *
    * `<vaadin-overlay>` is a Web Component for creating overlays. The content of the overlay
    * can be populated in two ways: imperatively by using renderer callback function and
    * declaratively by using Polymer's Templates.
    *
    * ### Rendering
    *
    * By default, the overlay uses the content provided by using the renderer callback function.
    *
    * The renderer function provides `root`, `owner`, `model` arguments when applicable.
    * Generate DOM content by using `model` object properties if needed, append it to the `root`
    * element and control the state of the host element by accessing `owner`. Before generating new
    * content, users are able to check if there is already content in `root` for reusing it.
    *
    * ```html
    * <vaadin-overlay id="overlay"></vaadin-overlay>
    * ```
    * ```js
    * const overlay = document.querySelector('#overlay');
    * overlay.renderer = function(root) {
    *  root.textContent = "Overlay content";
    * };
    * ```
    *
    * Renderer is called on the opening of the overlay and each time the related model is updated.
    * DOM generated during the renderer call can be reused
    * in the next renderer call and will be provided with the `root` argument.
    * On first call it will be empty.
    *
    * **NOTE:** when the renderer property is defined, the `<template>` content is not used.
    *
    * ### Templating
    *
    * Alternatively, the content can be provided with Polymer Template.
    * Overlay finds the first child template and uses that in case renderer callback function
    * is not provided. You can also set a custom template using the `template` property.
    *
    * After the content from the template is stamped, the `content` property
    * points to the content container.
    *
    * The overlay provides `forwardHostProp` when calling
    * `Polymer.Templatize.templatize` for the template, so that the bindings
    * from the parent scope propagate to the content.  You can also pass
    * custom `instanceProps` object using the `instanceProps` property.
    *
    * ```html
    * <vaadin-overlay>
    *   <template>Overlay content</template>
    * </vaadin-overlay>
    * ```
    *
    * **NOTE:** when using `instanceProps`: because of the Polymer limitation,
    * every template can only be templatized once, so it is important
    * to set `instanceProps` before the `template` is assigned to the overlay.
    *
    * ### Styling
    *
    * To style the overlay content, use styles in the parent scope:
    *
    * - If the overlay is used in a component, then the component styles
    *   apply the overlay content.
    * - If the overlay is used in the global DOM scope, then global styles
    *   apply to the overlay content.
    *
    * See examples for styling the overlay content in the live demos.
    *
    * The following Shadow DOM parts are available for styling the overlay component itself:
    *
    * Part name  | Description
    * -----------|---------------------------------------------------------|
    * `backdrop` | Backdrop of the overlay
    * `overlay`  | Container for position/sizing/alignment of the content
    * `content`  | Content of the overlay
    *
    * The following state attributes are available for styling:
    *
    * Attribute | Description | Part
    * ---|---|---
    * `opening` | Applied just after the overlay is attached to the DOM. You can apply a CSS @keyframe animation for this state. | `:host`
    * `closing` | Applied just before the overlay is detached from the DOM. You can apply a CSS @keyframe animation for this state. | `:host`
    *
    * The following custom CSS properties are available for styling:
    *
    * Custom CSS property | Description | Default value
    * ---|---|---
    * `--vaadin-overlay-viewport-bottom` | Bottom offset of the visible viewport area | `0` or detected offset
    *
    * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
    *
    * @memberof Vaadin
    * @mixes Vaadin.ThemableMixin
    * @demo demo/index.html
    */class OverlayElement extends ThemableMixin(PolymerElement){static get template(){return html`
    <style>
      :host {
        z-index: 200;
        position: fixed;

        /*
          Despite of what the names say, <vaadin-overlay> is just a container
          for position/sizing/alignment. The actual overlay is the overlay part.
        */

        /*
          Default position constraints: the entire viewport. Note: themes can
          override this to introduce gaps between the overlay and the viewport.
        */
        top: 0;
        right: 0;
        bottom: var(--vaadin-overlay-viewport-bottom);
        left: 0;

        /* Use flexbox alignment for the overlay part. */
        display: flex;
        flex-direction: column; /* makes dropdowns sizing easier */
        /* Align to center by default. */
        align-items: center;
        justify-content: center;

        /* Allow centering when max-width/max-height applies. */
        margin: auto;

        /* The host is not clickable, only the overlay part is. */
        pointer-events: none;

        /* Remove tap highlight on touch devices. */
        -webkit-tap-highlight-color: transparent;

        /* CSS API for host */
        --vaadin-overlay-viewport-bottom: 0;
      }

      :host([hidden]),
      :host(:not([opened]):not([closing])) {
        display: none !important;
      }

      [part="overlay"] {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
        pointer-events: auto;

        /* Prevent overflowing the host in MSIE 11 */
        max-width: 100%;
        box-sizing: border-box;

        -webkit-tap-highlight-color: initial; /* reenable tap highlight inside */
      }

      [part="backdrop"] {
        z-index: -1;
        content: "";
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: auto;
      }
    </style>

    <div id="backdrop" part="backdrop" hidden\$="{{!withBackdrop}}"></div>
    <div part="overlay" id="overlay" tabindex="0">
      <div part="content" id="content">
        <slot></slot>
      </div>
    </div>
`}static get is(){return"vaadin-overlay"}static get properties(){return{opened:{type:Boolean,notify:!0,observer:"_openedChanged",reflectToAttribute:!0},/**
       * Owner element passed with renderer function
       */owner:Element,/**
       * Custom function for rendering the content of the overlay.
       * Receives three arguments:
       *
       * - `root` The root container DOM element. Append your content to it.
       * - `owner` The host element of the renderer function.
       * - `model` The object with the properties related with rendering.
       */renderer:Function,/**
       * The template of the overlay content.
       */template:{type:Object,notify:!0},/**
       * Optional argument for `Polymer.Templatize.templatize`.
       */instanceProps:{type:Object},/**
       * References the content container after the template is stamped.
       */content:{type:Object,notify:!0},withBackdrop:{type:Boolean,value:!1,reflectToAttribute:!0},/**
       * Object with properties that is passed to `renderer` function
       */model:Object,/**
       * When true the overlay won't disable the main content, showing
       * it doesn’t change the functionality of the user interface.
       */modeless:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_modelessChanged"},/**
       * When set to true, the overlay is hidden. This also closes the overlay
       * immediately in case there is a closing animation in progress.
       */hidden:{type:Boolean,reflectToAttribute:!0,observer:"_hiddenChanged"},/**
       * When true move focus to the first focusable element in the overlay,
       * or to the overlay if there are no focusable elements.
       */focusTrap:{type:Boolean,value:!1},/**
       * Set to true to enable restoring of focus when overlay is closed.
       */restoreFocusOnClose:{type:Boolean,value:!1},_mouseDownInside:{type:Boolean},_mouseUpInside:{type:Boolean},_instance:{type:Object},_originalContentPart:Object,_contentNodes:Array,_oldOwner:Element,_oldModel:Object,_oldTemplate:Object,_oldInstanceProps:Object,_oldRenderer:Object,_oldOpened:Boolean}}static get observers(){return["_templateOrRendererChanged(template, renderer, owner, model, instanceProps, opened)"]}constructor(){super();this._boundMouseDownListener=this._mouseDownListener.bind(this);this._boundMouseUpListener=this._mouseUpListener.bind(this);this._boundOutsideClickListener=this._outsideClickListener.bind(this);this._boundKeydownListener=this._keydownListener.bind(this);this._observer=new FlattenedNodesObserver(this,info=>{this._setTemplateFromNodes(info.addedNodes)});// Listener for preventing closing of the paper-dialog and all components extending `iron-overlay-behavior`.
this._boundIronOverlayCanceledListener=this._ironOverlayCanceled.bind(this);if(/iPad|iPhone|iPod/.test(navigator.userAgent)){this._boundIosResizeListener=()=>this._detectIosNavbar()}}ready(){super.ready();this._observer.flush();// Need to add dummy click listeners to this and the backdrop or else
// the document click event listener (_outsideClickListener) may never
// get invoked on iOS Safari (reproducible in <vaadin-dialog>
// and <vaadin-context-menu>).
this.addEventListener("click",()=>{});this.$.backdrop.addEventListener("click",()=>{})}_detectIosNavbar(){if(!this.opened){return}const innerHeight=window.innerHeight,innerWidth=window.innerWidth,landscape=innerWidth>innerHeight,clientHeight=document.documentElement.clientHeight;if(landscape&&clientHeight>innerHeight){this.style.setProperty("--vaadin-overlay-viewport-bottom",clientHeight-innerHeight+"px")}else{this.style.setProperty("--vaadin-overlay-viewport-bottom","0")}}_setTemplateFromNodes(nodes){this.template=nodes.filter(node=>node.localName&&"template"===node.localName)[0]||this.template}/**
     * @event vaadin-overlay-close
     * fired before the `vaadin-overlay` will be closed. If canceled the closing of the overlay is canceled as well.
     */close(sourceEvent){var evt=new CustomEvent("vaadin-overlay-close",{bubbles:!0,cancelable:!0,detail:{sourceEvent:sourceEvent}});this.dispatchEvent(evt);if(!evt.defaultPrevented){this.opened=!1}}connectedCallback(){super.connectedCallback();if(this._boundIosResizeListener){this._detectIosNavbar();window.addEventListener("resize",this._boundIosResizeListener)}}disconnectedCallback(){super.disconnectedCallback();this._boundIosResizeListener&&window.removeEventListener("resize",this._boundIosResizeListener)}_ironOverlayCanceled(event){event.preventDefault()}_mouseDownListener(event){this._mouseDownInside=0<=event.composedPath().indexOf(this.$.overlay)}_mouseUpListener(event){this._mouseUpInside=0<=event.composedPath().indexOf(this.$.overlay)}/**
     * We need to listen on 'click' / 'tap' event and capture it and close the overlay before
     * propagating the event to the listener in the button. Otherwise, if the clicked button would call
     * open(), this would happen: https://www.youtube.com/watch?v=Z86V_ICUCD4
     *
     * @event vaadin-overlay-outside-click
     * fired before the `vaadin-overlay` will be closed on outside click. If canceled the closing of the overlay is canceled as well.
     */_outsideClickListener(event){if(-1!==event.composedPath().indexOf(this.$.overlay)||this._mouseDownInside||this._mouseUpInside){this._mouseDownInside=!1;this._mouseUpInside=!1;return}if(!this._last){return}const evt=new CustomEvent("vaadin-overlay-outside-click",{bubbles:!0,cancelable:!0,detail:{sourceEvent:event}});this.dispatchEvent(evt);if(this.opened&&!evt.defaultPrevented){this.close(event)}}/**
     * @event vaadin-overlay-escape-press
     * fired before the `vaadin-overlay` will be closed on ESC button press. If canceled the closing of the overlay is canceled as well.
     */_keydownListener(event){if(!this._last){return}// TAB
if("Tab"===event.key&&this.focusTrap&&!event.defaultPrevented){// if only tab key is pressed, cycle forward, else cycle backwards.
this._cycleTab(event.shiftKey?-1:1);event.preventDefault();// ESC
}else if("Escape"===event.key||"Esc"===event.key){const evt=new CustomEvent("vaadin-overlay-escape-press",{bubbles:!0,cancelable:!0,detail:{sourceEvent:event}});this.dispatchEvent(evt);if(this.opened&&!evt.defaultPrevented){this.close(event)}}}_ensureTemplatized(){this._setTemplateFromNodes(Array.from(this.children))}/**
     * @event vaadin-overlay-open
     * fired after the `vaadin-overlay` is opened.
     */_openedChanged(opened,wasOpened){if(!this._instance){this._ensureTemplatized()}if(opened){// Store focused node.
this.__restoreFocusNode=this._getActiveElement();this._animatedOpening();afterNextRender(this,()=>{if(this.focusTrap&&!this.contains(document._activeElement||document.activeElement)){this._cycleTab(0,0)}const evt=new CustomEvent("vaadin-overlay-open",{bubbles:!0});this.dispatchEvent(evt)});if(!this.modeless){this._addGlobalListeners()}}else if(wasOpened){this._animatedClosing();if(!this.modeless){this._removeGlobalListeners()}}}_hiddenChanged(hidden){if(hidden&&this.hasAttribute("closing")){this._flushAnimation("closing")}}_shouldAnimate(){const name=getComputedStyle(this).getPropertyValue("animation-name"),hidden="none"===getComputedStyle(this).getPropertyValue("display");return!hidden&&name&&"none"!=name}_enqueueAnimation(type,callback){const handler=`__${type}Handler`,listener=()=>{callback();this.removeEventListener("animationend",listener);delete this[handler]};this[handler]=listener;this.addEventListener("animationend",listener)}_flushAnimation(type){const handler=`__${type}Handler`;if("function"===typeof this[handler]){this[handler]()}}_animatedOpening(){if(this.parentNode===document.body&&this.hasAttribute("closing")){this._flushAnimation("closing")}this._attachOverlay();this.setAttribute("opening","");const finishOpening=()=>{this.removeAttribute("opening");document.addEventListener("iron-overlay-canceled",this._boundIronOverlayCanceledListener);if(!this.modeless){this._enterModalState()}};if(this._shouldAnimate()){this._enqueueAnimation("opening",finishOpening)}else{finishOpening()}}_attachOverlay(){this._placeholder=document.createComment("vaadin-overlay-placeholder");this.parentNode.insertBefore(this._placeholder,this);document.body.appendChild(this)}_animatedClosing(){if(this.hasAttribute("opening")){this._flushAnimation("opening")}if(this._placeholder){this.setAttribute("closing","");const finishClosing=()=>{this.shadowRoot.querySelector("[part=\"overlay\"]").style.removeProperty("pointer-events");this._exitModalState();document.removeEventListener("iron-overlay-canceled",this._boundIronOverlayCanceledListener);this._detachOverlay();this.removeAttribute("closing");if(this.restoreFocusOnClose&&this.__restoreFocusNode){// If the activeElement is `<body>` or inside the overlay,
// we are allowed to restore the focus. In all the other
// cases focus might have been moved elsewhere by another
// component or by the user interaction (e.g. click on a
// button outside the overlay).
const activeElement=this._getActiveElement();if(activeElement===document.body||this._deepContains(activeElement)){this.__restoreFocusNode.focus()}this.__restoreFocusNode=null}};if(this._shouldAnimate()){this._enqueueAnimation("closing",finishClosing)}else{finishClosing()}}}_detachOverlay(){this._placeholder.parentNode.insertBefore(this,this._placeholder);this._placeholder.parentNode.removeChild(this._placeholder)}/**
     * Returns all attached overlays.
     */static get __attachedInstances(){return Array.from(document.body.children).filter(el=>el instanceof OverlayElement)}/**
     * returns true if this is the last one in the opened overlays stack
     */get _last(){return this===OverlayElement.__attachedInstances.pop()}_modelessChanged(modeless){if(!modeless){if(this.opened){this._addGlobalListeners();this._enterModalState()}}else{this._removeGlobalListeners();this._exitModalState()}}_addGlobalListeners(){document.addEventListener("mousedown",this._boundMouseDownListener);document.addEventListener("mouseup",this._boundMouseUpListener);// Firefox leaks click to document on contextmenu even if prevented
// https://bugzilla.mozilla.org/show_bug.cgi?id=990614
document.documentElement.addEventListener("click",this._boundOutsideClickListener,!0);document.addEventListener("keydown",this._boundKeydownListener)}_enterModalState(){if("none"!==document.body.style.pointerEvents){// Set body pointer-events to 'none' to disable mouse interactions with
// other document nodes.
this._previousDocumentPointerEvents=document.body.style.pointerEvents;document.body.style.pointerEvents="none"}// Disable pointer events in other attached overlays
OverlayElement.__attachedInstances.forEach(el=>{if(el!==this&&!el.hasAttribute("opening")&&!el.hasAttribute("closing")){el.shadowRoot.querySelector("[part=\"overlay\"]").style.pointerEvents="none"}})}_removeGlobalListeners(){document.removeEventListener("mousedown",this._boundMouseDownListener);document.removeEventListener("mouseup",this._boundMouseUpListener);document.documentElement.removeEventListener("click",this._boundOutsideClickListener,!0);document.removeEventListener("keydown",this._boundKeydownListener)}_exitModalState(){if(this._previousDocumentPointerEvents!==void 0){// Restore body pointer-events
document.body.style.pointerEvents=this._previousDocumentPointerEvents;delete this._previousDocumentPointerEvents}// Restore pointer events in the previous overlay(s)
const instances=OverlayElement.__attachedInstances;let el;// Use instances.pop() to ensure the reverse order
while(el=instances.pop()){if(el===this){// Skip the current instance
continue}el.shadowRoot.querySelector("[part=\"overlay\"]").style.removeProperty("pointer-events");if(!el.modeless){// Stop after the last modal
break}}}_removeOldContent(){if(!this.content||!this._contentNodes){return}this._observer.disconnect();this._contentNodes.forEach(node=>{if(node.parentNode===this.content){this.content.removeChild(node)}});if(this._originalContentPart){// Restore the original <div part="content">
this.$.content.parentNode.replaceChild(this._originalContentPart,this.$.content);this.$.content=this._originalContentPart;this._originalContentPart=void 0}this._observer.connect();this._contentNodes=void 0;this.content=void 0}_stampOverlayTemplate(template,instanceProps){this._removeOldContent();if(!template._Templatizer){template._Templatizer=templatize(template,this,{instanceProps:instanceProps,forwardHostProp:function(prop,value){if(this._instance){this._instance.forwardHostProp(prop,value)}}})}this._instance=new template._Templatizer({});this._contentNodes=Array.from(this._instance.root.childNodes);const templateRoot=template._templateRoot||(template._templateRoot=template.getRootNode()),_isScoped=templateRoot!==document;if(_isScoped){const isShady=window.ShadyCSS&&!window.ShadyCSS.nativeShadow;if(!this.$.content.shadowRoot){this.$.content.attachShadow({mode:"open"})}let scopeCssText=Array.from(templateRoot.querySelectorAll("style")).reduce((result,style)=>result+style.textContent,"");if(isShady){// NOTE(platosha): ShadyCSS removes <style>’s from templates, so
// we have to use these protected APIs to get their contents back
const styleInfo=window.ShadyCSS.ScopingShim._styleInfoForNode(templateRoot.host);if(styleInfo){scopeCssText+=styleInfo._getStyleRules().parsedCssText;scopeCssText+="}"}}// The overlay root’s :host styles should not apply inside the overlay
scopeCssText=scopeCssText.replace(/:host/g,":host-nomatch");if(scopeCssText){if(isShady){// ShadyDOM: replace the <div part="content"> with a generated
// styled custom element
const contentPart=createOverlayContent(scopeCssText);contentPart.id="content";contentPart.setAttribute("part","content");this.$.content.parentNode.replaceChild(contentPart,this.$.content);// NOTE(platosha): carry the style scope of the content part
contentPart.className=this.$.content.className;this._originalContentPart=this.$.content;this.$.content=contentPart}else{// Shadow DOM: append a style to the content shadowRoot
const style=document.createElement("style");style.textContent=scopeCssText;this.$.content.shadowRoot.appendChild(style);this._contentNodes.unshift(style)}}this.$.content.shadowRoot.appendChild(this._instance.root);this.content=this.$.content.shadowRoot}else{this.appendChild(this._instance.root);this.content=this}}_removeNewRendererOrTemplate(template,oldTemplate,renderer,oldRenderer){if(template!==oldTemplate){this.template=void 0}else if(renderer!==oldRenderer){this.renderer=void 0}}/**
     * Manually invoke existing renderer.
     */render(){if(this.renderer){this.renderer.call(this.owner,this.content,this.owner,this.model)}}_templateOrRendererChanged(template,renderer,owner,model,instanceProps,opened){if(template&&renderer){this._removeNewRendererOrTemplate(template,this._oldTemplate,renderer,this._oldRenderer);throw new Error("You should only use either a renderer or a template for overlay content")}const ownerOrModelChanged=this._oldOwner!==owner||this._oldModel!==model;this._oldModel=model;this._oldOwner=owner;const templateOrInstancePropsChanged=this._oldInstanceProps!==instanceProps||this._oldTemplate!==template;this._oldInstanceProps=instanceProps;this._oldTemplate=template;const rendererChanged=this._oldRenderer!==renderer;this._oldRenderer=renderer;const openedChanged=this._oldOpened!==opened;this._oldOpened=opened;if(template&&templateOrInstancePropsChanged){this._stampOverlayTemplate(template,instanceProps)}else if(renderer&&(rendererChanged||openedChanged||ownerOrModelChanged)){this.content=this;if(rendererChanged){while(this.content.firstChild){this.content.removeChild(this.content.firstChild)}}if(opened){this.render()}}}_isFocused(element){return element&&element.getRootNode().activeElement===element}_focusedIndex(elements){elements=elements||this._getFocusableElements();return elements.indexOf(elements.filter(this._isFocused).pop())}_cycleTab(increment,index){const focusableElements=this._getFocusableElements();if(index===void 0){index=this._focusedIndex(focusableElements)}index+=increment;// rollover to first item
if(index>=focusableElements.length){index=0;// go to last item
}else if(0>index){index=focusableElements.length-1}focusableElements[index].focus()}_getFocusableElements(){// collect all focusable elements
return FocusablesHelper.getTabbableNodes(this.$.overlay)}_getActiveElement(){let active=document._activeElement||document.activeElement;// document.activeElement can be null
// https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
// In IE 11, it can also be an object when operating in iframes
// or document.documentElement (when overlay closed on outside click).
// In these cases, default it to document.body.
if(!active||active===document.documentElement||!1===active instanceof Element){active=document.body}while(active.shadowRoot&&active.shadowRoot.activeElement){active=active.shadowRoot.activeElement}return active}_deepContains(node){if(this.contains(node)){return!0}let n=node;const doc=node.ownerDocument;// walk from node to `this` or `document`
while(n&&n!==doc&&n!==this){n=n.parentNode||n.host}return n===this}}customElements.define(OverlayElement.is,OverlayElement);var vaadinOverlay={OverlayElement:OverlayElement};class DatePickerOverlayElement extends DisableUpgradeMixin(OverlayElement){static get is(){return"vaadin-date-picker-overlay"}}customElements.define(DatePickerOverlayElement.is,DatePickerOverlayElement);const $_documentContainer$1=document.createElement("template");$_documentContainer$1.innerHTML=`<dom-module id="vaadin-text-field-shared-styles">
  <template>
    <style>
      :host {
        display: inline-flex;
        outline: none;
      }

      :host::before {
        content: "\\2003";
        width: 0;
        display: inline-block;
        /* Size and position this element on the same vertical position as the input-field element
           to make vertical align for the host element work as expected */
      }

      :host([hidden]) {
        display: none !important;
      }

      .vaadin-text-field-container,
      .vaadin-text-area-container {
        display: flex;
        flex-direction: column;
        min-width: 100%;
        max-width: 100%;
        width: var(--vaadin-text-field-default-width, 12em);
      }

      [part="label"]:empty {
        display: none;
      }

      [part="input-field"] {
        display: flex;
        align-items: center;
        flex: auto;
      }

      .vaadin-text-field-container [part="input-field"] {
        flex-grow: 0;
      }

      /* Reset the native input styles */
      [part="value"],
      [part="input-field"] ::slotted(input),
      [part="input-field"] ::slotted(textarea) {
        -webkit-appearance: none;
        -moz-appearance: none;
        outline: none;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: 0;
        min-width: 0;
        font: inherit;
        font-size: 1em;
        line-height: normal;
        color: inherit;
        background-color: transparent;
        /* Disable default invalid style in Firefox */
        box-shadow: none;
      }

      [part="input-field"] ::slotted(*) {
        flex: none;
      }

      [part="value"],
      [part="input-field"] ::slotted(input),
      [part="input-field"] ::slotted(textarea),
      /* Slotted by vaadin-select-text-field */
      [part="input-field"] ::slotted([part="value"]) {
        flex: auto;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }

      [part="input-field"] ::slotted(textarea) {
        resize: none;
      }

      [part="value"]::-ms-clear,
      [part="input-field"] ::slotted(input)::-ms-clear {
        display: none;
      }

      [part="clear-button"] {
        cursor: default;
      }

      [part="clear-button"]::before {
        content: "✕";
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$1.content);const HOST_PROPS={default:["list","autofocus","pattern","autocapitalize","autocorrect","maxlength","minlength","name","placeholder","autocomplete","title"],accessible:["disabled","readonly","required","invalid"]},PROP_TYPE={DEFAULT:"default",ACCESSIBLE:"accessible"},TextFieldMixin=subclass=>class VaadinTextFieldMixin extends ControlStateMixin(subclass){static get properties(){return{/**
       * Whether the value of the control can be automatically completed by the browser.
       * List of available options at:
       * https://developer.mozilla.org/en/docs/Web/HTML/Element/input#attr-autocomplete
       */autocomplete:{type:String},/**
       * This is a property supported by Safari that is used to control whether
       * autocorrection should be enabled when the user is entering/editing the text.
       * Possible values are:
       * on: Enable autocorrection.
       * off: Disable autocorrection.
       */autocorrect:{type:String},/**
       * This is a property supported by Safari and Chrome that is used to control whether
       * autocapitalization should be enabled when the user is entering/editing the text.
       * Possible values are:
       * characters: Characters capitalization.
       * words: Words capitalization.
       * sentences: Sentences capitalization.
       * none: No capitalization.
       */autocapitalize:{type:String},/**
       * Specify that the value should be automatically selected when the field gains focus.
       */autoselect:{type:Boolean,value:!1},/**
       * Set to true to display the clear icon which clears the input.
       */clearButtonVisible:{type:Boolean,value:!1},/**
       * Error to show when the input value is invalid.
       */errorMessage:{type:String,value:""},/**
       * Object with translated strings used for localization. Has
       * the following structure and default values:
       *
       * ```
       * {
       *   // Translation of the clear icon button accessible label
       *   clear: 'Clear'
       * }
       * ```
       */i18n:{type:Object,value:()=>{return{clear:"Clear"}}},/**
       * String used for the label element.
       */label:{type:String,value:"",observer:"_labelChanged"},/**
       * Maximum number of characters (in Unicode code points) that the user can enter.
       */maxlength:{type:Number},/**
       * Minimum number of characters (in Unicode code points) that the user can enter.
       */minlength:{type:Number},/**
       * The name of the control, which is submitted with the form data.
       */name:{type:String},/**
       * A hint to the user of what can be entered in the control.
       */placeholder:{type:String},/**
       * This attribute indicates that the user cannot modify the value of the control.
       */readonly:{type:Boolean,reflectToAttribute:!0},/**
       * Specifies that the user must fill in a value.
       */required:{type:Boolean,reflectToAttribute:!0},/**
       * The initial value of the control.
       * It can be used for two-way data binding.
       */value:{type:String,value:"",observer:"_valueChanged",notify:!0},/**
       * This property is set to true when the control value is invalid.
       */invalid:{type:Boolean,reflectToAttribute:!0,notify:!0,value:!1},/**
       * Specifies that the text field has value.
       */hasValue:{type:Boolean,reflectToAttribute:!0},/**
       * When set to true, user is prevented from typing a value that
       * conflicts with the given `pattern`.
       */preventInvalidInput:{type:Boolean},/**
       * A pattern matched against individual characters the user inputs.
       * When set, the field will prevent:
       * - `keyDown` events if the entered key doesn't match `/^_enabledCharPattern$/`
       * - `paste` events if the pasted text doesn't match `/^_enabledCharPattern*$/`
       * - `drop` events if the dropped text doesn't match `/^_enabledCharPattern*$/`
       *
       * For example, to enable entering only numbers and minus signs,
       * `_enabledCharPattern = "[\\d-]"`
       */_enabledCharPattern:String,_labelId:String,_errorId:String,_inputId:String}}static get observers(){return["_stateChanged(disabled, readonly, clearButtonVisible, hasValue)","_hostPropsChanged("+HOST_PROPS.default.join(", ")+")","_hostAccessiblePropsChanged("+HOST_PROPS.accessible.join(", ")+")","_getActiveErrorId(invalid, errorMessage, _errorId)","_getActiveLabelId(label, _labelId, _inputId)","__observeOffsetHeight(errorMessage, invalid, label)","__enabledCharPatternChanged(_enabledCharPattern)"]}get focusElement(){if(!this.shadowRoot){return}const slotted=this.querySelector(`${this._slottedTagName}[slot="${this._slottedTagName}"]`);if(slotted){return slotted}return this.shadowRoot.querySelector("[part=\"value\"]")}/**
     * @private
     */get inputElement(){return this.focusElement}get _slottedTagName(){return"input"}_createConstraintsObserver(){// This complex observer needs to be added dynamically here (instead of defining it above in the `get observers()`)
// so that it runs after complex observers of inheriting classes. Otherwise e.g. `_stepOrMinChanged()` observer of
// vaadin-number-field would run after this and the `min` and `step` properties would not yet be propagated to
// the `inputElement` when this runs.
this._createMethodObserver("_constraintsChanged(required, minlength, maxlength, pattern)")}_onInput(e){if(this.__preventInput){e.stopImmediatePropagation();this.__preventInput=!1;return}if(this.preventInvalidInput){const input=this.inputElement;if(0<input.value.length&&!this.checkValidity()){input.value=this.value||"";// add input-prevented attribute for 200ms
this.setAttribute("input-prevented","");this._inputDebouncer=Debouncer.debounce(this._inputDebouncer,timeOut.after(200),()=>{this.removeAttribute("input-prevented")});return}}if(!e.__fromClearButton){this.__userInput=!0}this.value=e.target.value}// NOTE(yuriy): Workaround needed for IE11 and Edge for proper displaying
// of the clear button instead of setting display property for it depending on state.
_stateChanged(disabled,readonly,clearButtonVisible,hasValue){if(!disabled&&!readonly&&clearButtonVisible&&hasValue){this.$.clearButton.removeAttribute("hidden")}else{this.$.clearButton.setAttribute("hidden",!0)}}_onChange(e){if(this._valueClearing){return}// In the Shadow DOM, the `change` event is not leaked into the
// ancestor tree, so we must do this manually.
const changeEvent=new CustomEvent("change",{detail:{sourceEvent:e},bubbles:e.bubbles,cancelable:e.cancelable});this.dispatchEvent(changeEvent)}_valueChanged(newVal,oldVal){// setting initial value to empty string, skip validation
if(""===newVal&&oldVal===void 0){return}if(""!==newVal&&null!=newVal){this.hasValue=!0}else{this.hasValue=!1}if(this.__userInput){this.__userInput=!1;return}else if(newVal!==void 0){this.inputElement.value=newVal}else{this.value=this.inputElement.value=""}if(this.invalid){this.validate()}}_labelChanged(label){if(""!==label&&null!=label){this.setAttribute("has-label","")}else{this.removeAttribute("has-label")}}_onSlotChange(){const slotted=this.querySelector(`${this._slottedTagName}[slot="${this._slottedTagName}"]`);if(this.value){this.inputElement.value=this.value;this.validate()}if(slotted&&!this._slottedInput){this._validateSlottedValue(slotted);this._addInputListeners(slotted);this._addIEListeners(slotted);this._slottedInput=slotted}else if(!slotted&&this._slottedInput){this._removeInputListeners(this._slottedInput);this._removeIEListeners(this._slottedInput);this._slottedInput=void 0}Object.keys(PROP_TYPE).map(key=>PROP_TYPE[key]).forEach(type=>this._propagateHostAttributes(HOST_PROPS[type].map(attr=>this[attr]),type))}_hostPropsChanged(...attributesValues){this._propagateHostAttributes(attributesValues,PROP_TYPE.DEFAULT)}_hostAccessiblePropsChanged(...attributesValues){this._propagateHostAttributes(attributesValues,PROP_TYPE.ACCESSIBLE)}_validateSlottedValue(slotted){if(slotted.value!==this.value){console.warn("Please define value on the vaadin-text-field component!");slotted.value=""}}_propagateHostAttributes(attributesValues,type){const input=this.inputElement,attributeNames=HOST_PROPS[type];if("accessible"===type){attributeNames.forEach((attr,index)=>{this._setOrToggleAttribute(attr,attributesValues[index],input);this._setOrToggleAttribute(`aria-${attr}`,attributesValues[index],input)})}else{attributeNames.forEach((attr,index)=>{this._setOrToggleAttribute(attr,attributesValues[index],input)})}}_setOrToggleAttribute(name,value,node){if(!name||!node){return}if(value){node.setAttribute(name,"boolean"===typeof value?"":value)}else{node.removeAttribute(name)}}_constraintsChanged(required,minlength,maxlength,pattern){if(!this.invalid){return}if(!required&&!minlength&&!maxlength&&!pattern){this.invalid=!1}else{this.validate()}}/**
     * Returns true if the current input value satisfies all constraints (if any)
     * @returns {boolean}
     */checkValidity(){if(this.required||this.pattern||this.maxlength||this.minlength){return this.inputElement.checkValidity()}else{return!this.invalid}}_addInputListeners(node){node.addEventListener("input",this._boundOnInput);node.addEventListener("change",this._boundOnChange);node.addEventListener("blur",this._boundOnBlur);node.addEventListener("focus",this._boundOnFocus);node.addEventListener("paste",this._boundOnPaste);node.addEventListener("drop",this._boundOnDrop);node.addEventListener("beforeinput",this._boundOnBeforeInput)}_removeInputListeners(node){node.removeEventListener("input",this._boundOnInput);node.removeEventListener("change",this._boundOnChange);node.removeEventListener("blur",this._boundOnBlur);node.removeEventListener("focus",this._boundOnFocus);node.removeEventListener("paste",this._boundOnPaste);node.removeEventListener("drop",this._boundOnDrop);node.removeEventListener("beforeinput",this._boundOnBeforeInput)}ready(){super.ready();this._createConstraintsObserver();this._boundOnInput=this._onInput.bind(this);this._boundOnChange=this._onChange.bind(this);this._boundOnBlur=this._onBlur.bind(this);this._boundOnFocus=this._onFocus.bind(this);this._boundOnPaste=this._onPaste.bind(this);this._boundOnDrop=this._onDrop.bind(this);this._boundOnBeforeInput=this._onBeforeInput.bind(this);const defaultInput=this.shadowRoot.querySelector("[part=\"value\"]");this._slottedInput=this.querySelector(`${this._slottedTagName}[slot="${this._slottedTagName}"]`);this._addInputListeners(defaultInput);this._addIEListeners(defaultInput);if(this._slottedInput){this._addIEListeners(this._slottedInput);this._addInputListeners(this._slottedInput)}this.shadowRoot.querySelector("[name=\"input\"], [name=\"textarea\"]").addEventListener("slotchange",this._onSlotChange.bind(this));if(!(window.ShadyCSS&&window.ShadyCSS.nativeCss)){this.updateStyles()}this.$.clearButton.addEventListener("mousedown",()=>this._valueClearing=!0);this.$.clearButton.addEventListener("mouseleave",()=>this._valueClearing=!1);this.$.clearButton.addEventListener("click",this._onClearButtonClick.bind(this));this.addEventListener("keydown",this._onKeyDown.bind(this));var uniqueId=TextFieldMixin._uniqueId=1+TextFieldMixin._uniqueId||0;this._errorId=`${this.constructor.is}-error-${uniqueId}`;this._labelId=`${this.constructor.is}-label-${uniqueId}`;this._inputId=`${this.constructor.is}-input-${uniqueId}`;// Lumo theme defines a max-height transition for the "error-message"
// part on invalid state change.
this.shadowRoot.querySelector("[part=\"error-message\"]").addEventListener("transitionend",()=>{this.__observeOffsetHeight()})}/**
     * Returns true if `value` is valid.
     * `<iron-form>` uses this to check the validity for all its elements.
     *
     * @return {boolean} True if the value is valid.
     */validate(){return!(this.invalid=!this.checkValidity())}clear(){this.value=""}_onBlur(){this.validate()}_onFocus(){if(this.autoselect){this.inputElement.select();// iOS 9 workaround: https://stackoverflow.com/a/7436574
setTimeout(()=>{try{this.inputElement.setSelectionRange(0,9999)}catch(e){// The workaround may cause errors on different input types.
// Needs to be suppressed. See https://github.com/vaadin/flow/issues/6070
}})}}_onClearButtonClick(e){e.preventDefault();// NOTE(yuriy): This line won't affect focus on the host. Cannot be properly tested.
this.inputElement.focus();this.clear();this._valueClearing=!1;if(navigator.userAgent.match(/Trident/)){// Disable IE input" event prevention here, we want the input event from
// below to propagate normally.
this.__preventInput=!1}const inputEvent=new Event("input",{bubbles:!0,composed:!0});inputEvent.__fromClearButton=!0;const changeEvent=new Event("change",{bubbles:!this._slottedInput});changeEvent.__fromClearButton=!0;this.inputElement.dispatchEvent(inputEvent);this.inputElement.dispatchEvent(changeEvent)}_onKeyDown(e){if(27===e.keyCode&&this.clearButtonVisible){const dispatchChange=!!this.value;this.clear();dispatchChange&&this.inputElement.dispatchEvent(new Event("change",{bubbles:!this._slottedInput}))}if(this._enabledCharPattern&&!this.__shouldAcceptKey(e)){e.preventDefault()}}__shouldAcceptKey(event){return event.metaKey||event.ctrlKey||!event.key// allow typing anything if event.key is not supported
||1!==event.key.length// allow "Backspace", "ArrowLeft" etc.
||this.__enabledCharRegExp.test(event.key)}_onPaste(e){if(this._enabledCharPattern){const pastedText=(e.clipboardData||window.clipboardData).getData("text");if(!this.__enabledTextRegExp.test(pastedText)){e.preventDefault()}}}_onDrop(e){if(this._enabledCharPattern){const draggedText=e.dataTransfer.getData("text");if(!this.__enabledTextRegExp.test(draggedText)){e.preventDefault()}}}_onBeforeInput(e){// The `beforeinput` event covers all the cases for `_enabledCharPattern`: keyboard, pasting and dropping,
// but it is still experimental technology so we can't rely on it. It's used here just as an additional check,
// because it seems to be the only way to detect and prevent specific keys on mobile devices. See issue #429.
if(this._enabledCharPattern&&e.data&&!this.__enabledTextRegExp.test(e.data)){e.preventDefault()}}__enabledCharPatternChanged(_enabledCharPattern){this.__enabledCharRegExp=_enabledCharPattern&&new RegExp("^"+_enabledCharPattern+"$");this.__enabledTextRegExp=_enabledCharPattern&&new RegExp("^"+_enabledCharPattern+"*$")}_addIEListeners(node){/* istanbul ignore if */if(navigator.userAgent.match(/Trident/)){// IE11 dispatches `input` event in following cases:
// - focus or blur, when placeholder attribute is set
// - placeholder attribute value changed
// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/101220/
this._shouldPreventInput=()=>{this.__preventInput=!0;requestAnimationFrame(()=>{this.__preventInput=!1})};node.addEventListener("focusin",this._shouldPreventInput);node.addEventListener("focusout",this._shouldPreventInput);this._createPropertyObserver("placeholder",this._shouldPreventInput)}}_removeIEListeners(node){/* istanbul ignore if */if(navigator.userAgent.match(/Trident/)){node.removeEventListener("focusin",this._shouldPreventInput);node.removeEventListener("focusout",this._shouldPreventInput)}}_getActiveErrorId(invalid,errorMessage,errorId){this._setOrToggleAttribute("aria-describedby",errorMessage&&invalid?errorId:void 0,this.focusElement)}_getActiveLabelId(label,_labelId,_inputId){let ids=_inputId;if(label){ids=`${_labelId} ${_inputId}`}this.focusElement.setAttribute("aria-labelledby",ids)}_getErrorMessageAriaHidden(invalid,errorMessage,errorId){return(!(errorMessage&&invalid?errorId:void 0)).toString()}_dispatchIronResizeEventIfNeeded(sizePropertyName,value){const previousSizePropertyName="__previous"+sizePropertyName;if(this[previousSizePropertyName]!==void 0&&this[previousSizePropertyName]!==value){this.dispatchEvent(new CustomEvent("iron-resize",{bubbles:!0}))}this[previousSizePropertyName]=value}__observeOffsetHeight(){this._dispatchIronResizeEventIfNeeded("Height",this.offsetHeight)}/**
     * @protected
     */attributeChangedCallback(prop,oldVal,newVal){super.attributeChangedCallback(prop,oldVal,newVal);// Needed until Edge has CSS Custom Properties (present in Edge Preview)
/* istanbul ignore if */if(!(window.ShadyCSS&&window.ShadyCSS.nativeCss)&&/^(focused|focus-ring|invalid|disabled|placeholder|has-value)$/.test(prop)){this.updateStyles()}// Safari has an issue with repainting shadow root element styles when a host attribute changes.
// Need this workaround (toggle any inline css property on and off) until the issue gets fixed.
const isSafari=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);/* istanbul ignore if */if(isSafari&&this.root){const WEBKIT_PROPERTY="-webkit-backface-visibility";this.root.querySelectorAll("*").forEach(el=>{el.style[WEBKIT_PROPERTY]="visible";el.style[WEBKIT_PROPERTY]=""})}}/**
     * Fired when the user commits a value change.
     *
     * @event change
     */ /**
         * Fired when the value is changed by the user: on every typing keystroke,
         * and the value is cleared using the clear button.
         *
         * @event input
         */ /**
             * Fired when the size of the element changes.
             *
             * @event iron-resize
             */};var vaadinTextFieldMixin={TextFieldMixin:TextFieldMixin};class TextFieldElement extends ElementMixin$1(TextFieldMixin(ThemableMixin(PolymerElement))){static get template(){return html`
    <style include="vaadin-text-field-shared-styles">
      /* polymer-cli linter breaks with empty line */
    </style>

    <div class="vaadin-text-field-container">

      <label part="label" on-click="focus" id="[[_labelId]]">[[label]]</label>

      <div part="input-field" id="[[_inputId]]">

        <slot name="prefix"></slot>

        <slot name="input">
          <input part="value">
        </slot>

        <div part="clear-button" id="clearButton" role="button" aria-label\$="[[i18n.clear]]"></div>
        <slot name="suffix"></slot>

      </div>

      <div part="error-message" id="[[_errorId]]" aria-live="assertive" aria-hidden\$="[[_getErrorMessageAriaHidden(invalid, errorMessage, _errorId)]]">[[errorMessage]]</div>

    </div>
`}static get is(){return"vaadin-text-field"}static get version(){return"2.5.3"}static get properties(){return{/**
       * Identifies a list of pre-defined options to suggest to the user.
       * The value must be the id of a <datalist> element in the same document.
       */list:{type:String},/**
       * A regular expression that the value is checked against.
       * The pattern must match the entire value, not just some subset.
       */pattern:{type:String},/**
       * The text usually displayed in a tooltip popup when the mouse is over the field.
       */title:{type:String}}}}customElements.define(TextFieldElement.is,TextFieldElement);var vaadinTextField={TextFieldElement:TextFieldElement};class DatePickerElement extends ElementMixin$1(ControlStateMixin(ThemableMixin(ThemePropertyMixin(DatePickerMixin(GestureEventListeners(PolymerElement)))))){static get template(){return html`
    <style>
      :host {
        display: inline-block;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host([opened]) {
        pointer-events: auto;
      }

      [part="text-field"] {
        width: 100%;
        min-width: 0;
      }
    </style>


    <vaadin-text-field id="input" role="application" autocomplete="off" on-focus="_focus" value="{{_userInputValue}}" invalid="[[invalid]]" label="[[label]]" name="[[name]]" placeholder="[[placeholder]]" required="[[required]]" disabled="[[disabled]]" readonly="[[readonly]]" error-message="[[errorMessage]]" clear-button-visible="[[clearButtonVisible]]" aria-label\$="[[label]]" part="text-field" theme\$="[[theme]]">
      <slot name="prefix" slot="prefix"></slot>
      <div part="toggle-button" slot="suffix" on-tap="_toggle" role="button" aria-label\$="[[i18n.calendar]]" aria-expanded\$="[[_getAriaExpanded(opened)]]"></div>
    </vaadin-text-field>

    <vaadin-date-picker-overlay id="overlay" fullscreen\$="[[_fullscreen]]" theme\$="[[__getOverlayTheme(theme, _overlayInitialized)]]" on-vaadin-overlay-open="_onOverlayOpened" on-vaadin-overlay-close="_onOverlayClosed" disable-upgrade="">
      <template>
        <vaadin-date-picker-overlay-content id="overlay-content" i18n="[[i18n]]" fullscreen\$="[[_fullscreen]]" label="[[label]]" selected-date="{{_selectedDate}}" slot="dropdown-content" focused-date="{{_focusedDate}}" show-week-numbers="[[showWeekNumbers]]" min-date="[[_minDate]]" max-date="[[_maxDate]]" role="dialog" on-date-tap="_close" part="overlay-content" theme\$="[[__getOverlayTheme(theme, _overlayInitialized)]]">
        </vaadin-date-picker-overlay-content>
      </template>
    </vaadin-date-picker-overlay>

    <iron-media-query query="[[_fullscreenMediaQuery]]" query-matches="{{_fullscreen}}">
    </iron-media-query>
`}static get is(){return"vaadin-date-picker"}static get version(){return"4.0.5"}static get properties(){return{/**
       * Set to true to display the clear icon which clears the input.
       */clearButtonVisible:{type:Boolean,value:!1},/**
       * Set to true to disable this element.
       */disabled:{type:Boolean,value:!1,reflectToAttribute:!0},/**
       * The error message to display when the input is invalid.
       */errorMessage:String,/**
       * A placeholder string in addition to the label. If this is set, the label will always float.
       */placeholder:String,/**
       * Set to true to make this element read-only.
       */readonly:{type:Boolean,value:!1,reflectToAttribute:!0},/**
       * This property is set to true when the control value invalid.
       */invalid:{type:Boolean,reflectToAttribute:!0,notify:!0,value:!1},_userInputValue:String}}static get observers(){return["_userInputValueChanged(_userInputValue)","_setClearButtonLabel(i18n.clear)"]}ready(){super.ready();// In order to have synchronized invalid property, we need to use the same validate logic.
afterNextRender(this,()=>this._inputElement.validate=()=>{});// FIXME(platosha): dispatch `input` event on
// <vaadin-text-field> clear button
// https://github.com/vaadin/vaadin-text-field/issues/347
this._inputElement.addEventListener("change",()=>{if(""===this._inputElement.value){this.__dispatchChange=!0;this.value="";this.validate();this.__dispatchChange=!1}})}_onVaadinOverlayClose(e){if(this._openedWithFocusRing&&this.hasAttribute("focused")){this.focusElement.setAttribute("focus-ring","")}else if(!this.hasAttribute("focused")){this.focusElement.blur()}if(e.detail.sourceEvent&&-1!==e.detail.sourceEvent.composedPath().indexOf(this)){e.preventDefault()}}_toggle(e){e.stopPropagation();this[this._overlayInitialized&&this.$.overlay.opened?"close":"open"]()}_input(){return this.$.input}set _inputValue(value){this._inputElement.value=value}get _inputValue(){return this._inputElement.value}_getAriaExpanded(opened){return(!!opened).toString()}/**
     * Focussable element used by vaadin-control-state-mixin
     */get focusElement(){return this._input()||this}_setClearButtonLabel(i18nClear){// FIXME(platosha): expose i18n API in <vaadin-text-field>
// https://github.com/vaadin/vaadin-text-field/issues/348
this._inputElement.shadowRoot.querySelector("[part=\"clear-button\"]").setAttribute("aria-label",i18nClear)}}customElements.define(DatePickerElement.is,DatePickerElement);var vaadinDatePicker={DatePickerElement:DatePickerElement};const $_documentContainer$2=html`<dom-module id="lumo-date-picker-overlay-content" theme-for="vaadin-date-picker-overlay-content">
  <template>
    <style>
      :host {
        position: relative;
        background-color: transparent;
        /* Background for the year scroller, placed here as we are using a mask image on the actual years part */
        background-image: linear-gradient(var(--lumo-shade-5pct), var(--lumo-shade-5pct));
        background-size: 57px 100%;
        background-position: top right;
        background-repeat: no-repeat;
        cursor: default;
      }

      /* Month scroller */

      [part="months"] {
        /* Month calendar height:
              header height + margin-bottom
            + weekdays height + margin-bottom
            + date cell heights
            + small margin between month calendars
        */
        --vaadin-infinite-scroller-item-height:
          calc(
              var(--lumo-font-size-l) + var(--lumo-space-m)
            + var(--lumo-font-size-xs) + var(--lumo-space-s)
            + var(--lumo-size-m) * 6
            + var(--lumo-space-s)
          );
        --vaadin-infinite-scroller-buffer-offset: 20%;
        -webkit-mask-image: linear-gradient(transparent, #000 10%, #000 85%, transparent);
        mask-image: linear-gradient(transparent, #000 10%, #000 85%, transparent);
        position: relative;
        margin-right: 57px;
      }

      /* Year scroller */

      [part="years"] {
        /* TODO get rid of fixed magic number */
        --vaadin-infinite-scroller-buffer-width: 97px;
        width: 57px;
        height: auto;
        top: 0;
        bottom: 0;
        font-size: var(--lumo-font-size-s);
        box-shadow: inset 2px 0 4px 0 var(--lumo-shade-5pct);
        -webkit-mask-image: linear-gradient(transparent, #000 35%, #000 65%, transparent);
        mask-image: linear-gradient(transparent, #000 35%, #000 65%, transparent);
      }

      [part="year-number"],
      [part="year-separator"] {
        opacity: 0.5;
        transition: 0.2s opacity;
      }

      [part="years"]:hover [part="year-number"],
      [part="years"]:hover [part="year-separator"] {
        opacity: 1;
      }

      /* TODO unsupported selector */
      #scrollers {
        position: static;
        display: block;
      }

      /* TODO unsupported selector, should fix this in vaadin-date-picker that it adapts to the
       * width of the year scroller */
      #scrollers[desktop] [part="months"] {
        right: auto;
      }

      /* Year scroller position indicator */
      [part="years"]::before {
        border: none;
        width: 1em;
        height: 1em;
        background-color: var(--lumo-base-color);
        background-image: linear-gradient(var(--lumo-tint-5pct), var(--lumo-tint-5pct));
        transform: translate(-75%, -50%) rotate(45deg);
        border-top-right-radius: calc(var(--lumo-border-radius) / 2);
        box-shadow: 2px -2px 6px 0 var(--lumo-shade-5pct);
        z-index: 1;
      }

      [part="year-number"],
      [part="year-separator"] {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50%;
        transform: translateY(-50%);
      }

      [part="years"] [part="year-separator"]::after {
        color: var(--lumo-disabled-text-color);
        content: "•";
      }

      /* Current year */

      [part="years"] [part="year-number"][current] {
        color: var(--lumo-primary-text-color);
      }

      /* Toolbar (footer) */

      [part="toolbar"] {
        padding: var(--lumo-space-s);
        box-shadow: 0 -1px 0 0 var(--lumo-contrast-10pct);
        border-bottom-left-radius: var(--lumo-border-radius);
        margin-right: 57px;
      }

      @supports (mask-image: linear-gradient(#000, #000)) or (-webkit-mask-image: linear-gradient(#000, #000)) {
        [part="toolbar"] {
          box-shadow: none;
        }
      }

      /* Today and Cancel buttons */

      /* TODO: Would be great if I could apply the "tertiary" theme from here instead of copying those styles */
      [part="toolbar"] [part\$="button"] {
        background-color: transparent;
        margin: 0;
        min-width: 0;
        padding: 0 0.75em;
      }

      /* Narrow viewport mode (fullscreen) */

      :host([fullscreen]) [part="toolbar"] {
        order: -1;
        background-color: var(--lumo-base-color);
      }

      :host([fullscreen]) [part="overlay-header"] {
        order: -2;
        height: var(--lumo-size-m);
        padding: var(--lumo-space-s);
        position: absolute;
        left: 0;
        right: 0;
        justify-content: center;
      }

      :host([fullscreen]) [part="toggle-button"],
      :host([fullscreen]) [part="clear-button"],
      [part="overlay-header"] [part="label"] {
        display: none;
      }

      /* Very narrow screen (year scroller initially hidden) */

      [part="years-toggle-button"] {
        position: relative;
        right: auto;
        display: flex;
        align-items: center;
        height: var(--lumo-size-s);
        padding: 0 0.5em;
        border-radius: var(--lumo-border-radius);
        z-index: 3;
        color: var(--lumo-primary-text-color);
        font-weight: 500;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      :host([years-visible]) [part="years-toggle-button"] {
        background-color: var(--lumo-primary-color);
        color: var(--lumo-primary-contrast-color);
      }

      [part="years-toggle-button"]::before {
        content: none;
      }

      /* TODO magic number (same as used for iron-media-query in vaadin-date-picker-overlay-content) */
      @media screen and (max-width: 374px) {
        :host {
          background-image: none;
        }

        [part="years"] {
          background-color: var(--lumo-shade-5pct);
        }

        [part="toolbar"],
        [part="months"] {
          margin-right: 0;
        }

        /* TODO make date-picker adapt to the width of the years part */
        [part="years"] {
          --vaadin-infinite-scroller-buffer-width: 90px;
          width: 50px;
        }

        :host([years-visible]) [part="months"] {
          padding-left: 50px;
        }
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$2.content);const $_documentContainer$3=document.createElement("template");$_documentContainer$3.innerHTML=`<dom-module id="lumo-overlay">
  <template>
    <style>
      :host {
        top: var(--lumo-space-m);
        right: var(--lumo-space-m);
        bottom: var(--lumo-space-m);
        left: var(--lumo-space-m);
        /* Workaround for Edge issue (only on Surface), where an overflowing vaadin-list-box inside vaadin-select-overlay makes the overlay transparent */
        /* stylelint-disable-next-line */
        outline: 0px solid transparent;
      }

      [part="overlay"] {
        background-color: var(--lumo-base-color);
        background-image: linear-gradient(var(--lumo-tint-5pct), var(--lumo-tint-5pct));
        border-radius: var(--lumo-border-radius-m);
        box-shadow: 0 0 0 1px var(--lumo-shade-5pct), var(--lumo-box-shadow-m);
        color: var(--lumo-body-text-color);
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-m);
        font-weight: 400;
        line-height: var(--lumo-line-height-m);
        letter-spacing: 0;
        text-transform: none;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      [part="content"] {
        padding: var(--lumo-space-xs);
      }

      [part="backdrop"] {
        background-color: var(--lumo-shade-20pct);
        animation: 0.2s lumo-overlay-backdrop-enter both;
        will-change: opacity;
      }

      @keyframes lumo-overlay-backdrop-enter {
        0% {
          opacity: 0;
        }
      }

      :host([closing]) [part="backdrop"] {
        animation: 0.2s lumo-overlay-backdrop-exit both;
      }

      @keyframes lumo-overlay-backdrop-exit {
        100% {
          opacity: 0;
        }
      }

      @keyframes lumo-overlay-dummy-animation {
        0% { opacity: 1; }
        100% { opacity: 1; }
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$3.content);const $_documentContainer$4=document.createElement("template");$_documentContainer$4.innerHTML=`<dom-module id="lumo-menu-overlay-core">
  <template>
    <style>
      :host([opening]),
      :host([closing]) {
        animation: 0.14s lumo-overlay-dummy-animation;
      }

      [part="overlay"] {
        will-change: opacity, transform;
      }

      :host([opening]) [part="overlay"] {
        animation: 0.1s lumo-menu-overlay-enter ease-out both;
      }

      @keyframes lumo-menu-overlay-enter {
        0% {
          opacity: 0;
          transform: translateY(-4px);
        }
      }

      :host([closing]) [part="overlay"] {
        animation: 0.1s lumo-menu-overlay-exit both;
      }

      @keyframes lumo-menu-overlay-exit {
        100% {
          opacity: 0;
        }
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-menu-overlay">
  <template>
    <style include="lumo-overlay lumo-menu-overlay-core">
      /* Small viewport (bottom sheet) styles */
      /* Use direct media queries instead of the state attributes (\`[phone]\` and \`[fullscreen]\`) provided by the elements */
      @media (max-width: 420px), (max-height: 420px) {
        :host {
          top: 0 !important;
          right: 0 !important;
          bottom: var(--vaadin-overlay-viewport-bottom, 0) !important;
          left: 0 !important;
          align-items: stretch !important;
          justify-content: flex-end !important;
        }

        [part="overlay"] {
          max-height: 50vh;
          width: 100vw;
          border-radius: 0;
          box-shadow: var(--lumo-box-shadow-xl);
        }

        /* The content part scrolls instead of the overlay part, because of the gradient fade-out */
        [part="content"] {
          padding: 30px var(--lumo-space-m);
          max-height: inherit;
          box-sizing: border-box;
          -webkit-overflow-scrolling: touch;
          overflow: auto;
          -webkit-mask-image: linear-gradient(transparent, #000 40px, #000 calc(100% - 40px), transparent);
          mask-image: linear-gradient(transparent, #000 40px, #000 calc(100% - 40px), transparent);
        }

        [part="backdrop"] {
          display: block;
        }

        /* Animations */

        :host([opening]) [part="overlay"] {
          animation: 0.2s lumo-mobile-menu-overlay-enter cubic-bezier(.215, .61, .355, 1) both;
        }

        :host([closing]),
        :host([closing]) [part="backdrop"] {
          animation-delay: 0.14s;
        }

        :host([closing]) [part="overlay"] {
          animation: 0.14s 0.14s lumo-mobile-menu-overlay-exit cubic-bezier(.55, .055, .675, .19) both;
        }
      }

      @keyframes lumo-mobile-menu-overlay-enter {
        0% {
          transform: translateY(150%);
        }
      }

      @keyframes lumo-mobile-menu-overlay-exit {
        100% {
          transform: translateY(150%);
        }
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$4.content);/* Split as a separate module because combo box can only use the "fullscreen" styles */ /*
                                                                                                                                                  FIXME(polymer-modulizer): the above comments were extracted
                                                                                                                                                  from HTML and may be out of place here. Review them and
                                                                                                                                                  then delete this comment!
                                                                                                                                                  */;const $_documentContainer$5=html`<dom-module id="lumo-date-picker-overlay" theme-for="vaadin-date-picker-overlay">
  <template>
    <style include="lumo-menu-overlay">
      [part="overlay"] {
        /*
        Width:
            date cell widths
          + month calendar side padding
          + year scroller width
        */
        width:
          calc(
              var(--lumo-size-m) * 7
            + var(--lumo-space-xs) * 2
            + 57px
          );
        height: 100%;
        max-height: calc(var(--lumo-size-m) * 14);
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
      }

      [part="overlay"] {
        flex-direction: column;
      }

      [part="content"] {
        padding: 0;
        height: 100%;
        overflow: hidden;
        -webkit-mask-image: none;
        mask-image: none;
      }

      @media (max-width: 420px), (max-height: 420px) {
        [part="overlay"] {
          width: 100vw;
          height: 70vh;
          max-height: 70vh;
        }
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$5.content);const $_documentContainer$6=document.createElement("template");$_documentContainer$6.innerHTML=`<dom-module id="lumo-required-field">
  <template>
    <style>
      [part="label"] {
        align-self: flex-start;
        color: var(--lumo-secondary-text-color);
        font-weight: 500;
        font-size: var(--lumo-font-size-s);
        margin-left: calc(var(--lumo-border-radius-m) / 4);
        transition: color 0.2s;
        line-height: 1;
        padding-bottom: 0.5em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
        max-width: 100%;
        box-sizing: border-box;
      }

      :host([has-label])::before {
        margin-top: calc(var(--lumo-font-size-s) * 1.5);
      }

      :host([has-label]) {
        padding-top: var(--lumo-space-m);
      }

      :host([required]) [part="label"] {
        padding-right: 1em;
      }

      [part="label"]::after {
        content: var(--lumo-required-field-indicator, "•");
        transition: opacity 0.2s;
        opacity: 0;
        color: var(--lumo-primary-text-color);
        position: absolute;
        right: 0;
        width: 1em;
        text-align: center;
      }

      :host([required]:not([has-value])) [part="label"]::after {
        opacity: 1;
      }

      :host([invalid]) [part="label"]::after {
        color: var(--lumo-error-text-color);
      }

      [part="error-message"] {
        margin-left: calc(var(--lumo-border-radius-m) / 4);
        font-size: var(--lumo-font-size-xs);
        line-height: var(--lumo-line-height-xs);
        color: var(--lumo-error-text-color);
        will-change: max-height;
        transition: 0.4s max-height;
        max-height: 5em;
      }

      /* Margin that doesn’t reserve space when there’s no error message */
      [part="error-message"]:not(:empty)::before,
      [part="error-message"]:not(:empty)::after {
        content: "";
        display: block;
        height: 0.4em;
      }

      :host(:not([invalid])) [part="error-message"] {
        max-height: 0;
        overflow: hidden;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$6.content);const $_documentContainer$7=html`<dom-module id="lumo-text-field" theme-for="vaadin-text-field">
  <template>
    <style include="lumo-required-field lumo-field-button">
      :host {
        --lumo-text-field-size: var(--lumo-size-m);
        color: var(--lumo-body-text-color);
        font-size: var(--lumo-font-size-m);
        font-family: var(--lumo-font-family);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-tap-highlight-color: transparent;
        padding: var(--lumo-space-xs) 0;
      }

      :host::before {
        height: var(--lumo-text-field-size);
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
      }

      :host([focused]:not([readonly])) [part="label"] {
        color: var(--lumo-primary-text-color);
      }

      [part="value"],
      [part="input-field"] ::slotted(input),
      [part="input-field"] ::slotted(textarea),
      /* Slotted by vaadin-select-text-field */
      [part="input-field"] ::slotted([part="value"]) {
        cursor: inherit;
        min-height: var(--lumo-text-field-size);
        padding: 0 0.25em;
        --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em);
        -webkit-mask-image: var(--_lumo-text-field-overflow-mask-image);
      }

      [part="value"]:focus,
      :host([focused]) [part="input-field"] ::slotted(input),
      :host([focused]) [part="input-field"] ::slotted(textarea) {
        -webkit-mask-image: none;
        mask-image: none;
      }

      /*
        TODO: CSS custom property in \`mask-image\` causes crash in Edge
        see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15415089/
      */
      @-moz-document url-prefix() {
        [part="value"],
        [part="input-field"] ::slotted(input),
        [part="input-field"] ::slotted(textarea),
        [part="input-field"] ::slotted([part="value"]) {
          mask-image: var(--_lumo-text-field-overflow-mask-image);
        }
      }

      [part="value"]::-webkit-input-placeholder {
        color: inherit;
        transition: opacity 0.175s 0.05s;
        opacity: 0.5;
      }

      [part="value"]:-ms-input-placeholder {
        color: inherit;
        opacity: 0.5;
      }

      [part="value"]::-moz-placeholder {
        color: inherit;
        transition: opacity 0.175s 0.05s;
        opacity: 0.5;
      }

      [part="value"]::placeholder {
        color: inherit;
        transition: opacity 0.175s 0.1s;
        opacity: 0.5;
      }

      [part="input-field"] {
        border-radius: var(--lumo-border-radius);
        background-color: var(--lumo-contrast-10pct);
        padding: 0 calc(0.375em + var(--lumo-border-radius) / 4 - 1px);
        font-weight: 500;
        line-height: 1;
        position: relative;
        cursor: text;
        box-sizing: border-box;
      }

      /* Used for hover and activation effects */
      [part="input-field"]::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: inherit;
        pointer-events: none;
        background-color: var(--lumo-contrast-50pct);
        opacity: 0;
        transition: transform 0.15s, opacity 0.2s;
        transform-origin: 100% 0;
      }

      /* Hover */

      :host(:hover:not([readonly]):not([focused])) [part="label"] {
        color: var(--lumo-body-text-color);
      }

      :host(:hover:not([readonly]):not([focused])) [part="input-field"]::after {
        opacity: 0.1;
      }

      /* Touch device adjustment */
      @media (pointer: coarse) {
        :host(:hover:not([readonly]):not([focused])) [part="label"] {
          color: var(--lumo-secondary-text-color);
        }

        :host(:hover:not([readonly]):not([focused])) [part="input-field"]::after {
          opacity: 0;
        }

        :host(:active:not([readonly]):not([focused])) [part="input-field"]::after {
          opacity: 0.2;
        }
      }

      /* Trigger when not focusing using the keyboard */
      :host([focused]:not([focus-ring]):not([readonly])) [part="input-field"]::after {
        transform: scaleX(0);
        transition-duration: 0.15s, 1s;
      }

      /* Focus-ring */

      :host([focus-ring]) [part="input-field"] {
        box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);
      }

      /* Read-only and disabled */
      :host([readonly]) [part="value"]::-webkit-input-placeholder,
      :host([disabled]) [part="value"]::-webkit-input-placeholder {
        opacity: 0;
      }

      :host([readonly]) [part="value"]:-ms-input-placeholder,
      :host([disabled]) [part="value"]:-ms-input-placeholder {
        opacity: 0;
      }

      :host([readonly]) [part="value"]::-moz-placeholder,
      :host([disabled]) [part="value"]::-moz-placeholder {
        opacity: 0;
      }

      :host([readonly]) [part="value"]::placeholder,
      :host([disabled]) [part="value"]::placeholder {
        opacity: 0;
      }

      /* Read-only */

      :host([readonly]) [part="input-field"] {
        color: var(--lumo-secondary-text-color);
        background-color: transparent;
        cursor: default;
      }

      :host([readonly]) [part="input-field"]::after {
        background-color: transparent;
        opacity: 1;
        border: 1px dashed var(--lumo-contrast-30pct);
      }

      /* Disabled style */

      :host([disabled]) {
        pointer-events: none;
      }

      :host([disabled]) [part="input-field"] {
        background-color: var(--lumo-contrast-5pct);
      }

      :host([disabled]) [part="label"],
      :host([disabled]) [part="value"],
      :host([disabled]) [part="input-field"] ::slotted(*) {
        color: var(--lumo-disabled-text-color);
        -webkit-text-fill-color: var(--lumo-disabled-text-color);
      }

      /* Invalid style */

      :host([invalid]) [part="input-field"] {
        background-color: var(--lumo-error-color-10pct);
      }

      :host([invalid]) [part="input-field"]::after {
        background-color: var(--lumo-error-color-50pct);
      }

      :host([invalid][focus-ring]) [part="input-field"] {
        box-shadow: 0 0 0 2px var(--lumo-error-color-50pct);
      }

      :host([input-prevented]) [part="input-field"] {
        color: var(--lumo-error-text-color);
      }

      /* Small theme */

      :host([theme~="small"]) {
        font-size: var(--lumo-font-size-s);
        --lumo-text-field-size: var(--lumo-size-s);
      }

      :host([theme~="small"][has-label]) [part="label"] {
        font-size: var(--lumo-font-size-xs);
      }

      :host([theme~="small"][has-label]) [part="error-message"] {
        font-size: var(--lumo-font-size-xxs);
      }

      /* Text align */

      :host([theme~="align-center"]) [part="value"] {
        text-align: center;
        --_lumo-text-field-overflow-mask-image: none;
      }

      :host([theme~="align-right"]) [part="value"] {
        text-align: right;
        --_lumo-text-field-overflow-mask-image: none;
      }

      @-moz-document url-prefix() {
        /* Firefox is smart enough to align overflowing text to right */
        :host([theme~="align-right"]) [part="value"] {
          --_lumo-text-field-overflow-mask-image: linear-gradient(to right, transparent 0.25em, #000 1.5em);
        }
      }

      /* Slotted content */

      [part="input-field"] ::slotted(:not([part]):not(iron-icon):not(input):not(textarea)) {
        color: var(--lumo-secondary-text-color);
        font-weight: 400;
      }

      /* Slotted icons */

      [part="input-field"] ::slotted(iron-icon) {
        color: var(--lumo-contrast-60pct);
        width: var(--lumo-icon-size-m);
        height: var(--lumo-icon-size-m);
      }

      /* Vaadin icons are based on a 16x16 grid (unlike Lumo and Material icons with 24x24), so they look too big by default */
      [part="input-field"] ::slotted(iron-icon[icon^="vaadin:"]) {
        padding: 0.25em;
        box-sizing: border-box !important;
      }

      [part="clear-button"]::before {
        content: var(--lumo-icons-cross);
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$7.content);const $_documentContainer$8=html`<dom-module id="lumo-date-picker" theme-for="vaadin-date-picker">
  <template>
    <style include="lumo-field-button">
      :host {
        outline: none;
      }

      [part="toggle-button"]::before {
        content: var(--lumo-icons-calendar);
      }

      [part="clear-button"]::before {
        content: var(--lumo-icons-cross);
      }

      @media (max-width: 420px), (max-height: 420px) {
        [part="overlay-content"] {
          height: 70vh;
        }
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$8.content);const $_documentContainer$9=html`<dom-module id="lumo-month-calendar" theme-for="vaadin-month-calendar">
  <template>
    <style>
      :host {
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        font-size: var(--lumo-font-size-m);
        color: var(--lumo-body-text-color);
        text-align: center;
        padding: 0 var(--lumo-space-xs);
      }

      /* Month header */

      [part="month-header"] {
        color: var(--lumo-header-text-color);
        font-size: var(--lumo-font-size-l);
        line-height: 1;
        font-weight: 500;
        margin-bottom: var(--lumo-space-m);
      }

      /* Week days and numbers */

      [part="weekdays"],
      [part="weekday"],
      [part="week-numbers"] {
        font-size: var(--lumo-font-size-xs);
        line-height: 1;
        color: var(--lumo-tertiary-text-color);
      }

      [part="weekdays"] {
        margin-bottom: var(--lumo-space-s);
      }

      /* TODO should have part="week-number" for the cell in weekdays-container */
      [part="weekday"]:empty,
      [part="week-numbers"] {
        width: var(--lumo-size-xs);
      }

      /* Date and week number cells */

      [part="date"],
      [part="week-number"] {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: var(--lumo-size-m);
        position: relative;
      }

      [part="date"] {
        transition: color 0.1s;
      }

      /* Today date */

      [part="date"][today] {
        color: var(--lumo-primary-text-color);
      }

      /* Focused date */

      [part="date"]::before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 2em;
        min-height: 2em;
        width: 80%;
        height: 80%;
        max-height: 100%;
        max-width: 100%;
        border-radius: var(--lumo-border-radius);
      }

      [part="date"][focused]::before {
        box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);
      }

      :host(:not([focused])) [part="date"][focused]::before {
        animation: vaadin-date-picker-month-calendar-focus-date 1.4s infinite;
      }

      @keyframes vaadin-date-picker-month-calendar-focus-date {
        50% {
          box-shadow: 0 0 0 2px transparent;
        }
      }

      /* TODO should not rely on the role attribute */
      [part="date"][role="button"]:not([disabled]):not([selected]):hover::before {
        background-color: var(--lumo-primary-color-10pct);
      }

      [part="date"][selected] {
        color: var(--lumo-primary-contrast-color);
      }

      [part="date"][selected]::before {
        background-color: var(--lumo-primary-color);
      }

      [part="date"][disabled] {
        color: var(--lumo-disabled-text-color);
      }

      @media (pointer: coarse) {
        [part="date"]:hover:not([selected])::before,
        [part="date"][focused]:not([selected])::before {
          display: none;
        }

        [part="date"][role="button"]:not([disabled]):active::before {
          display: block;
        }

        [part="date"][selected]::before {
          box-shadow: none;
        }
      }

      /* Disabled */

      :host([disabled]) * {
        color: var(--lumo-disabled-text-color) !important;
      }
    </style>
  </template>
</dom-module><custom-style>
  <style>
    @keyframes vaadin-date-picker-month-calendar-focus-date {
      50% {
        box-shadow: 0 0 0 2px transparent;
      }
    }
  </style>
</custom-style>`;document.head.appendChild($_documentContainer$9.content);class SingleContent extends PolymerElement{static get properties(){return{singleTitle:{type:String,value:"Blog"},singleImages:{type:String,value:"Blog"},singleAuthor:{type:String,value:"Blog"},singleDate:{type:Date,value:new Date("1900-01-01")},singleCategories:{type:String,value:"02/10/2018"},singleContent:{type:String,value:"Blog"}}}static get template(){return html$1`
      <style include="shared-styles app-grid-style">
        :host {
            display: block;
            --app-grid-columns: 2;
            --app-grid-item-height: 650px;
            margin-top: 30px;
            font-family: 'Nunito Sans', sans-serif;
        }
        .single-content{
            margin-bottom: 40px;
            width: 100%;
            display: block;
        }
        .single-meta{
            display: block;
            max-width: 100%;
            overflow-y: var(--posts-length-limit, hidden);
        }
        .post-images {
            --iron-image-height: 480px;
            --iron-image-width: 852px;
        }
        .post-meta-data{
            font-size: 14px;
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 35px;
            margin-bottom: 20px;
        }
        .single-post-meta{
            margin-bottom: 0;
            float: left;
        }
        .post-meta-author{
            color: #8d8d8d;
        }
        .single-post-meta-two{
            padding-top: 0;
            border-top: 0;
            float: right;
        }
        .post-meta-comments{
            padding-left: 15px;
        }
        .post-meta-categories{
            padding-left: 0px;
        }
        .post-meta-categories a{
            color: #8d8d8d;
            text-transform: uppercase;
        }
        .single-post-content{
            padding-bottom: 15px;
            word-break: break-word;
        }
        .single-post-content p {
            color: black;
        }
        .single-post-content a{
            color: #47c9e5;
        }
        .single-post-item{
            left: 0px;
            top: 0px;
            width: 100%;
            float: left;
        }
        .showmore{
            margin-top: 10px;
            width: 100%;
            height: 100px;
            display: var(--read-more, grid);
            box-shadow: 0px 15px 45px 0px rgba(0,0,0,.2);
        }
        @media screen and (max-width: 1000px) {
            .post-images {
                --iron-image-height: 350px;
                --iron-image-width: 100%;
                padding-left: 20px;
                padding-right: 20px;
            }
        }
      </style>

        <article class="single-content single-post-item">
            <div class="post-container">
                <div class="single-meta">
                    <iron-image alt="polymer-3.0" class="post-images" src="[[singleImages]]"></iron-image>
                    <a class="post-title">
                        <h2>[[singleTitle]]</h2>
                    </a>
                    <div class="post-meta-data">
                        <div class="single-post-meta">
                            <span class="post-meta-author">
                                by
                                <a class="bypostauthor">[[singleAuthor]]</a>
                                <a class="post-meta-date">[[singleDate]]</a>
                            </span>
                        </div>
                        <div class="single-post-meta-two">
                            <div class="post-meta-comments">
                                <span class="post-meta-categories">
                                    <a>[[singleCategories]]</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="single-post-content textcontent" inner-h-t-m-l="[[singleContent]]" >
                    </div>
                </div>
                <paper-button class="showmore" on-click="readMore">
                    Read More
                </paper-button>
            </div>
        </article>
    `}readMore(){this.updateStyles({"--posts-length-limit":"visible"});this.updateStyles({"--read-more":"none"})}}window.customElements.define("single-content",SingleContent);class SinglePost extends PolymerElement{constructor(){super()}ready(){super.ready()}static get properties(){return{routeData:Object,subroute:Object}}static get template(){return html$1`
    <style include="shared-styles app-grid-style">
      :host {
        display: block;
        --app-grid-columns: 2;
        --app-grid-item-height: 650px;
        margin-top: 30px;
        font-family: 'Nunito Sans', sans-serif;
        animation: fadein 1s;
        -moz-animation: fadein 1s; /* Firefox */
        -webkit-animation: fadein 1s; /* Safari and Chrome */
        -o-animation: fadein 1s;
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
/*MENU*/
      .single-title{
        position: relative;
        padding: 0;
        background-color: #fbfbfb;
        background-repeat: no-repeat;
        background-position: 50% 0;
        background-size: cover;
        margin-top: 100px;
        margin-bottom: 50px;
      }
      .single-title .container{
        padding: 0 15px;
      }
      .single-title .single-table{
        min-height: 60px;
        z-index: 100;
        position: relative;
        padding: 25px 0;
        display: table;
        width: 100%;
      }
      .title-bar{
        display: table-cell;
        vertical-align: middle;
        float: none!important;
      }
      .title-bar h2{
        font-size: 24px;
        margin-bottom: 0;
        font-weight: 700;
      }
      datetime-input{
        display: none;
      }
/*MENU END*/

/*SINGLE POST CONTENT*/
      .single-post{
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
      #content.content-with-sidebar-right{
        width: 73%;
        padding-right: 2%;
        float: left;
      }
      @media screen and (max-width: 1000px) {
        :host {
          --app-grid-columns: 1;
          --app-grid-item-height: 625px;
        }
        #content.content-with-sidebar-right{
          float: none;
          width: 100%;
          padding-right: 0;
        }
        :host #sidebar.sidebar-right{
          margin-top: 60px;
          float: none;
          width: 50%;
          margin: auto;
          display: none;
        }
      }
      @media screen and (max-width: 500px){
        :host {
          --app-grid-item-height: 730px;
        }
      }
      .entry-content{
        padding-left: 50px;
        padding-right: 50px;
      }
/*SINGLE POST CONTENT END*/
      

    </style>
   
    <div>
      <app-location id="location"
      route="{{route}}"
      url-space-regex="^[[rootPath]]"
      >
      </app-location>
      <div class="single-title">
        <div class="container">
          <div class="single-table">
            <div class="title-bar">
              <h2>Bài Viết</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="entry-content">
        <div id ="content" class="content-with-sidebar-right">
          <div class="single-post">

            <template is="dom-repeat" items="{{singleposts}}">
              <datetime-input value-as-date="{{item.post_date}}" datetime="{{datetime}}" date="{{date}}" time="{{time}}" with-timezone="{{withTimezone}}" timezone="{{timezone}}"></datetime-input>  
              <single-content
                single-title="{{item.post_title}}"
                single-images="https://api.mypolymerblog.com/images/{{item.post_images}}"
                single-author="{{item.post_author}}"
                single-date="[[date]]"
                single-categories="{{item.post_categories}}"
                single-content="{{item.post_content}}"
              >/
              </single-content>
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
    `}getQueryParameters(str){return(str||document.location.search).replace(/(^\?)/,"").split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this}.bind({}))[0]}gotoSingle(e){const permalinks=e.model.item.permalinks;location.href=`/single-post/?post=${permalinks}`}connectedCallback(){super.connectedCallback();var queryParams=this.getQueryParameters(),params;params=queryParams.post;fetch(`https://api.mypolymerblog.com/post/${params}`).then(res=>res.json()).then(singleposts=>{this.singleposts=singleposts});fetch(`https://api.mypolymerblog.com/latest/posts`).then(res=>res.json()).then(latestposts=>this.latestposts=latestposts)}}window.customElements.define("single-post",SinglePost);export{disableUpgradeMixin as $disableUpgradeMixin,vaadinDatePicker as $vaadinDatePicker,vaadinDatePickerHelper as $vaadinDatePickerHelper,vaadinDatePickerMixin as $vaadinDatePickerMixin,vaadinFocusablesHelper as $vaadinFocusablesHelper,vaadinOverlay as $vaadinOverlay,vaadinTextField as $vaadinTextField,vaadinTextFieldMixin as $vaadinTextFieldMixin,DatePickerElement,DatePickerHelper,DatePickerMixin,DisableUpgradeMixin,FocusablesHelper,OverlayElement,TextFieldElement,TextFieldMixin};