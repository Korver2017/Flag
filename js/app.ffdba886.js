(function(t){function e(e){for(var s,o,u=e[0],r=e[1],l=e[2],d=0,p=[];d<u.length;d++)o=u[d],i[o]&&p.push(i[o][0]),i[o]=0;for(s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s]);c&&c(e);while(p.length)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],s=!0,u=1;u<n.length;u++){var r=n[u];0!==i[r]&&(s=!1)}s&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var s={},i={app:0},a=[];function o(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=s,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(n,s,function(e){return t[e]}.bind(null,s));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],r=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var c=r;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var s=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mt-5",attrs:{id:"app"}},[n("h1",[t._v("Flag Project")]),n("IssueList")],1)},a=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container my-4"},[n("h3",[t._v("Issue-List")]),n("div",{staticClass:"input-group my-3 col-6 mx-auto"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.newIssue,expression:"newIssue"}],staticClass:"form-control",attrs:{type:"text",placeholder:"","aria-label":"Recipient's username","aria-describedby":"button-addon2"},domProps:{value:t.newIssue},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addIssue(e)},input:function(e){e.target.composing||(t.newIssue=e.target.value)}}}),n("div",{staticClass:"input-group-append"},[n("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button",id:"button-addon2"},on:{click:t.addIssue}},[t._v("Add issue")])])]),t._l(t.issuesData,function(e,s){return n("div",[n("div",{staticClass:"list-group text-white"},[n("button",{staticClass:"mt-3 list-group-item list-group-item-action text-left bg-dark text-white",attrs:{disabled:!1===e.issueOpened},on:{click:function(e){return t.changeStatus(s)}}},[t._v("\n          "+t._s(e.title)+"\n\n          "),t._l(e.labels,function(e,s){return[!0===e?n("span",{staticClass:"mx-1 badge badge-light"},[t._v(t._s(s))]):t._e()]}),!1===e.issueOpened?n("span",[t._v(" (Closed)")]):t._e()],2),e.showContent?n("li",{staticClass:"list-group-item list-group-item-action bg-secondary",class:{disabled:!1===e.issueOpened}},[n("div",[n("p",{staticClass:"text-left text-white"},[t._v(t._s(e.content))]),!0===e.contentEditing?n("div",{staticClass:"col-6 mx-auto input-group mb-3"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.stashContent,expression:"issueData.stashContent"}],staticClass:"form-control",attrs:{type:"text",placeholder:"New content","aria-describedby":"button-addon2"},domProps:{value:e.stashContent},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.updateContent(s)},input:function(n){n.target.composing||t.$set(e,"stashContent",n.target.value)}}}),n("div",{staticClass:"input-group-append"},[n("button",{staticClass:"btn btn-warning",attrs:{type:"button",id:"button-addon2"},on:{click:function(e){return t.updateContent(s)}}},[t._v("Update content")])])]):t._e(),!0===e.titleEditing?n("div",{staticClass:"col-6 mx-auto input-group mb-3"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.stashTitle,expression:"issueData.stashTitle"}],staticClass:"form-control",attrs:{type:"text",placeholder:"New title","aria-describedby":"button-addon2"},domProps:{value:e.stashTitle},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.updateTitle(s)},input:function(n){n.target.composing||t.$set(e,"stashTitle",n.target.value)}}}),n("div",{staticClass:"input-group-append"},[n("button",{staticClass:"btn btn-warning",attrs:{type:"button",id:"button-addon2"},on:{click:function(e){return t.updateTitle(s)}}},[t._v("Update title")])])]):t._e(),[n("button",{staticClass:"mx-2 btn btn-warning",on:{click:function(t){e.contentEditing=!e.contentEditing}}},[t._v("Edit content")]),n("button",{staticClass:"mx-2 btn btn-warning",on:{click:function(t){e.titleEditing=!e.titleEditing}}},[t._v("Edit title")])]],2)]):t._e()]),n("div",{staticClass:"mt-3"},[!0===e.issueOpened?n("button",{staticClass:"btn btn-danger",on:{click:function(t){e.issueOpened=!e.issueOpened}}},[t._v("Close issue")]):n("button",{staticClass:"btn btn-success",on:{click:function(t){e.issueOpened=!e.issueOpened}}},[t._v("Open issue")]),t._l(e.labels,function(e,i,a){return n("button",{staticClass:"btn btn-outline-primary",on:{click:function(n){return t.checkLabel(e,i,a,s)}}},[t._v("\n          "+t._s(i)+"\n        ")])})],2)])})],2)},u=[],r={name:"issue-list",data:function(){return{issuesData:[{title:"#1",titleEditing:!1,showContent:!1,content:"#1 - Lorem...",issueLabels:{},labels:{feature:!1,bug:!1,hotfix:!1},issueOpened:!0,stashTitle:"",stashContent:"",contentEditing:!1},{title:"#2",titleEditing:!1,showContent:!1,content:"#2 - Lorem...",issueLabels:{},labels:{feature:!1,bug:!1,hotfix:!1},issueOpened:!0,stashContent:"",contentEditing:!1}],newIssue:""}},methods:{changeStatus:function(t){this.issuesData[t].showContent=!this.issuesData[t].showContent},addIssue:function(){this.issuesData.push({title:this.newIssue,titleEditing:!1,showContent:!1,content:"尚無資訊",labels:{feature:!1,bug:!1,hotfix:!1},issueOpened:!0,stashContent:"",contentEditing:!1}),this.newIssue=""},changeLabelState:function(t,e){this.labels[e]=!this.labels[e]},updateContent:function(t){this.issuesData[t].content=this.issuesData[t].stashContent,this.issuesData[t].stashContent="",this.issuesData[t].contentEditing=!1},updateTitle:function(t){this.issuesData[t].title=this.issuesData[t].stashTitle,this.issuesData[t].stashTitle="",this.issuesData[t].titleEditing=!1},checkLabel:function(t,e,n,s){console.log(t,e,n,s),console.log(this.issuesData[s].labels[e]),this.issuesData[s].labels[e]=!this.issuesData[s].labels[e]}}},l=r,c=n("2877"),d=Object(c["a"])(l,o,u,!1,null,"e6bb8db2",null),p=d.exports,b={name:"Home",components:{IssueList:p},data:function(){return{}}},f=b,h=(n("6294"),Object(c["a"])(f,i,a,!1,null,null,null)),g=h.exports,v=n("8c4f");s["a"].use(v["a"]);var m=new v["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:g}]}),C=n("2f62");s["a"].use(C["a"]);var y=new C["a"].Store({state:{},mutations:{},actions:{}});n("4989"),n("ab8b");n.d(e,"eventBus",function(){return _}),s["a"].config.productionTip=!1;var _=new s["a"];new s["a"]({router:m,store:y,render:function(t){return t(g)}}).$mount("#app")},6294:function(t,e,n){"use strict";var s=n("7fba"),i=n.n(s);i.a},"7fba":function(t,e,n){}});
//# sourceMappingURL=app.ffdba886.js.map