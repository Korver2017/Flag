(function(e){function n(n){for(var a,r,i=n[0],s=n[1],c=n[2],d=0,l=[];d<i.length;d++)r=i[d],u[r]&&l.push(u[r][0]),u[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);f&&f(n);while(l.length)l.shift()();return o.push.apply(o,c||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],a=!0,r=1;r<t.length;r++){var i=t[r];0!==u[i]&&(a=!1)}a&&(o.splice(n--,1),e=s(s.s=t[0]))}return e}var a={},r={app:0},u={app:0},o=[];function i(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-215235e9":"eefe1ab6","chunk-2d0c5af8":"fc0ce8cf","chunk-2d0cc947":"31c39cb6","chunk-2d22c301":"f7c461e8","chunk-335fe83b":"4a575a39","chunk-3fff1551":"07715040","chunk-547950f4":"6bb3f29a","chunk-6a0a33d1":"defee0f5","chunk-cb559048":"be06df5e"}[e]+".js"}function s(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.e=function(e){var n=[],t={"chunk-215235e9":1,"chunk-335fe83b":1,"chunk-547950f4":1,"chunk-6a0a33d1":1,"chunk-cb559048":1};r[e]?n.push(r[e]):0!==r[e]&&t[e]&&n.push(r[e]=new Promise(function(n,t){for(var a="css/"+({}[e]||e)+"."+{"chunk-215235e9":"5f342640","chunk-2d0c5af8":"31d6cfe0","chunk-2d0cc947":"31d6cfe0","chunk-2d22c301":"31d6cfe0","chunk-335fe83b":"7c386746","chunk-3fff1551":"31d6cfe0","chunk-547950f4":"625d89ca","chunk-6a0a33d1":"c4624211","chunk-cb559048":"3e4bbb60"}[e]+".css",u=s.p+a,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var c=o[i],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===a||d===u))return n()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){c=l[i],d=c.getAttribute("data-href");if(d===a||d===u)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var a=n&&n.target&&n.target.src||u,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.request=a,delete r[e],f.parentNode.removeChild(f),t(o)},f.href=u;var h=document.getElementsByTagName("head")[0];h.appendChild(f)}).then(function(){r[e]=0}));var a=u[e];if(0!==a)if(a)n.push(a[2]);else{var o=new Promise(function(n,t){a=u[e]=[n,t]});n.push(a[2]=o);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,s.nc&&d.setAttribute("nonce",s.nc),d.src=i(e),c=function(n){d.onerror=d.onload=null,clearTimeout(l);var t=u[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src,o=new Error("Loading chunk "+e+" failed.\n("+a+": "+r+")");o.type=a,o.request=r,t[1](o)}u[e]=void 0}};var l=setTimeout(function(){c({type:"timeout",target:d})},12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(n)},s.m=e,s.c=a,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)s.d(t,a,function(n){return e[n]}.bind(null,a));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=n,c=c.slice();for(var l=0;l<c.length;l++)n(c[l]);var f=d;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var a=t("2b0e"),r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("nav",{staticClass:"navbar navbar-expand-lg navbar-light bg-white"},[t("router-link",{staticClass:"navbar-brand nav-item nav-link",attrs:{to:"/dashboard"}},[t("a",[e._v("Flag")])]),t("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarNavAltMarkup"}},[t("div",{staticClass:"navbar-nav"},[t("router-link",{staticClass:"mx-2 rounded nav-item nav-link",attrs:{to:"/dashboard",tag:"a","active-class":"active",exact:""}},[e._v("\n          Dashboard\n        ")]),t("router-link",{staticClass:"mx-2 rounded nav-item nav-link",attrs:{to:"/issue",tag:"a"}},[e._v("\n          Issues\n        ")]),t("router-link",{staticClass:"mx-2 rounded nav-item nav-link",attrs:{to:"/",tag:"a"}},[e._v("\n          Pull Requests\n        ")]),t("router-link",{staticClass:"mx-2 rounded nav-item nav-link",attrs:{to:"/",tag:"a"}},[e._v("\n          Explore\n        ")])],1),t("div",{staticClass:"navbar-nav ml-auto mr-3"},[t("router-link",{staticClass:"mx-2 rounded nav-item nav-link",attrs:{to:"/",tag:"a"}},[e._v("\n          訊息\n        ")]),t("router-link",{staticClass:"mx-2 rounded nav-item nav-link",attrs:{to:"/",tag:"a"}},[e._v("\n          建立\n        ")]),t("router-link",{staticClass:"mx-2 rounded nav-item nav-link",attrs:{to:"/",tag:"a"}},[e._v("\n          設定檔和設置\n        ")])],1)])],1),t("hr",{staticClass:"my-0"}),t("router-view")],1)},u=[],o={name:"Home",components:{},data:function(){return{}},created:function(){!1===this.$store.state.user.authed&&this.$router.push({path:"/signin"})},computed:{user:function(){return{authed:this.$store.state.user.authed}}},methods:{logOut:function(){this.$store.dispatch("user/logOut"),this.$router.push({path:"/signin"})}}},i=o,s=(t("6294"),t("e2f9"),t("2877")),c=Object(s["a"])(i,r,u,!1,null,"4868024a",null),d=c.exports,l=t("8c4f");a["a"].use(l["a"]);var f=new l["a"]({mode:"history",base:"/",routes:[{path:"/signin",name:"signin",component:function(){return t.e("chunk-3fff1551").then(t.bind(null,"ac9e"))}},{path:"/dashboard",name:"dashboard",component:function(){return t.e("chunk-6a0a33d1").then(t.bind(null,"4601"))}},{path:"/:orgId",name:"organization",component:function(){return t.e("chunk-2d0cc947").then(t.bind(null,"4f10"))}},{path:"/:orgId/:proId",name:"project",component:function(){return t.e("chunk-215235e9").then(t.bind(null,"616c"))}},{path:"/:orgId/:proId/issues/new",name:"addIssue",component:function(){return t.e("chunk-335fe83b").then(t.bind(null,"715c"))}},{path:"/:orgId/:proId/:issueId",name:"issue",component:function(){return t.e("chunk-2d22c301").then(t.bind(null,"f1bb"))}},{path:"/:orgId/:proId/milestone",name:"milestone",component:function(){return t.e("chunk-547950f4").then(t.bind(null,"9200"))}},{path:"/:orgId/:proId/milestone/:mileId",name:"milestone-detail",component:function(){return t.e("chunk-cb559048").then(t.bind(null,"bc84"))}},{path:"/:orgId/:proId/label",name:"label",component:function(){return t.e("chunk-2d0c5af8").then(t.bind(null,"3fc2"))}}]}),h=(t("4989"),t("ab8b"),t("bf48")),p=t.n(h),m=t("2f62"),v=(t("7514"),{namespaced:!0,state:{authed:!1,username:"",input:{email:"",password:"",userId:""}},mutations:{authed:function(e,n){!0===e.authed?(e.authed=!1,e.username="",e.input.email="",e.input.password="",e.input.userId=""):(e.authed=n.authed,e.username=n.username,f.push("/dashboard"))},input:function(e,n){e.input.email=n.email||e.input.email||"",e.input.password=n.password||e.input.password||""}},actions:{signin:function(e){var n=e.state,t=e.commit,a=p.a.Object.extend("Account"),r=new p.a.Query(a);r.equalTo("email",n.input.email),r.find().then(function(e){e.length<1?alert("Email 錯誤"):(r.equalTo("password",n.input.password),r.find().then(function(e){if(e.length<1)alert("密碼錯誤");else{n.input.userId=e[0].id;var r=new p.a.Query(a);r.get(n.input.userId).then(function(e){var n={};n.username=e.get("username"),n.authed=!0,t("authed",n)})}}))})},logOut:function(e){var n=e.commit;n("authed")}}});a["a"].use(m["a"]);var b=new m["a"].Store({modules:{user:v}}),g=t("9ce6"),k=t.n(g),y=t("8237"),w=t.n(y);t("7f10");p.a.initialize("Ox33tQSpiscXrVvf4HKXsduw2ProZNCysXXGY5zT"),p.a.serverURL="https://parse.protype.tw/parse",a["a"].config.productionTip=!1,a["a"].prototype.$md5=w.a,a["a"].use(k.a),new a["a"]({router:f,store:b,render:function(e){return e(d)}}).$mount("#app")},6294:function(e,n,t){"use strict";var a=t("7fba"),r=t.n(a);r.a},"7fba":function(e,n,t){},"85bc":function(e,n,t){},e2f9:function(e,n,t){"use strict";var a=t("85bc"),r=t.n(a);r.a}});
//# sourceMappingURL=app.4bc15782.js.map