(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3acd4b64"],{"1a41":function(t,a,e){},4601:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",{staticClass:"navbar navbar-expand-lg navbar-light bg-white"},[e("router-link",{staticClass:"navbar-brand nav-item nav-link",attrs:{to:"/"}},[e("a",[t._v("User")])])],1),e("hr",{staticClass:"m-0"}),e("div",{attrs:{id:"wrap"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-7"},[e("div",{staticClass:"my-3 mx-2 tracker border border-success"}),e("ul",{staticClass:"py-0 list-group list-group-flush"},t._l(10,function(a){return e("li",{staticClass:"list-group-item"},[t._m(0,!0)])}),0)]),e("div",{staticClass:"px-0 my-3 col-4"},[e("div",{staticClass:"px-0 btn-group col-12",staticStyle:{color:"#767676"},attrs:{role:"group","aria-label":"Basic example"}},[e("router-link",{staticClass:"py-3 btn btn-success col-6",staticStyle:{backgroundColor:"rgba(0,0,0,.05)",color:"rgba(0,0,0,.95)"},attrs:{to:"/",tag:"button","active-class":"active"}},[t._v("\n              儲存庫\n            ")]),e("router-link",{staticClass:"py-3 btn btn-success col-6",staticStyle:{backgroundColor:"#fff",color:"rgba(0,0,0,.95)"},attrs:{to:"/",tag:"button","active-class":"active"}},[t._v("\n              組織\n            ")])],1),e("div",{staticClass:"my-3"},[e("ul",{staticClass:"list-group"},[e("li",{staticClass:"list-group-item"},[e("div",{staticClass:"row"},[e("p",{staticClass:"ml-3 mb-0"},[t._v("儲存庫"),e("span",{staticClass:"ml-2 badge badge-secondary"},[t._v(t._s(t.projects.length))])]),e("i",{staticClass:"d-flex align-items-center ml-auto mr-3 fa fa-plus",attrs:{"aria-hidden":"true"}})])]),e("li",{staticClass:"list-group-item"},[t._m(1),e("ul",{staticClass:"nav nav-tabs d-flex justify-content-center"},[e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link active",attrs:{href:"#"}},[t._v("所有"),e("span",{staticClass:"ml-2 badge badge-secondary"},[t._v(t._s(t.projects.length))])])]),t._m(2),t._m(3),t._m(4),t._m(5)])]),t._l(t.projects,function(a){return e("router-link",{staticClass:"d-flex align-items-center list-group-item",attrs:{to:{name:"project",params:{orgId:a.orgId,proId:a.proId}},tag:"button"}},[e("i",{staticClass:"mr-3 fa fa-lock",staticStyle:{"font-size":"25px"},attrs:{"aria-hidden":"true"}}),t._v("\n\n                "+t._s(a.orgName)+" / "+t._s(a.name)+"\n\n                "),e("p",{staticClass:"ml-auto mb-0 d-flex align-items-center"},[t._v("\n                  0\n                  "),e("i",{staticClass:"ml-1 fa fa-star",staticStyle:{"font-size":"20px"},attrs:{"aria-hidden":"true"}})])])}),e("router-link",{staticClass:"d-flex align-items-center list-group-item",attrs:{to:"/",tag:"button"}},[t._v("\n\n                顯示更多儲存庫...\n                \n              ")])],2)])])])])])},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"avatar border border-success"}),e("div",{staticClass:"ml-3 text-left"},[e("p",{staticClass:"infoTitle"},[t._v("wake pushed to master at Tangency/wingbra")]),e("div",[e("p",{staticClass:"mb-0"},[t._v("Lorem ipsum dolor sit amet.")]),e("p",{staticClass:"mb-0"},[t._v("Lorem, ipsum dolor.")])])]),e("i",{staticClass:"ml-auto mr-4 fa fa-exclamation-circle",staticStyle:{"font-size":"40px",color:"#767676"},attrs:{"aria-hidden":"true"}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"input-group mb-3"},[e("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"搜尋儲存庫..."}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("來源")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("複製列表")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("鏡像")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("協同者")])])}],r=(e("7514"),e("bf48")),i=e.n(r),o={name:"dashboard",components:{},data:function(){return{orgName:"",orgs:[],projects:[],issues:[],assigneeList:[],userData:"",token:"",payload:""}},created:function(){},computed:{user:function(){return{authed:this.$store.state.user.authed,userId:this.$store.state.user.userId}}},mounted:function(){this.showOrg(),this.showUsername(),this.showProject(),this.showIssue(),this.showAssignee()},methods:{showUsername:function(){},showOrg:function(){var t=this,a=i.a.Object.extend("Organization"),e=new i.a.Query(a),s=[];e.equalTo("memberId",t.user.userId),e.find().then(function(e){for(var n=function(t){var n={},r=e[t],o=new i.a.Query(a);n.orgId=r.id,o.get(r.id).then(function(t){n.name=t.get("name"),s.push(n)})},r=0;r<e.length;r++)n(r);t.orgs=s})},addOrganization:function(){var t=this;if(""!==t.orgName){var a=i.a.Object.extend("Organization"),e=new a;e.set("name",t.orgName),e.set("memberId",t.payload),e.save().then(function(a){t.orgName="",t.showOrg()},function(t){})}else alert("組織名稱不可空白")},showProject:function(){var t=this,a=[],e=i.a.Object.extend("Organization"),s=new i.a.Query(e);s.equalTo("memberId",t.user.userId),s.find().then(function(e){for(var s=0;s<e.length;s++){var n=e[s],r=i.a.Object.extend("Project"),o=new i.a.Query(r);o.equalTo("orgId",n.id),o.find().then(function(e){for(var s=0;s<e.length;s++){var n={},r=e[s];n.orgName=r.get("orgName"),n.name=r.get("name"),n.orgId=r.get("orgId"),n.proId=r.id,a.push(n)}t.projects=a})}})},showIssue:function(){var t=this,a=i.a.Object.extend("Organization"),e=new i.a.Query(a),s=[];e.equalTo("memberId",t.user.userId),e.find().then(function(t){for(var a=0;a<t.length;a++){var e=t[a];s.push(e.id)}return s}).then(function(a){var e=[],s=i.a.Object.extend("Project"),n=new i.a.Query(s);n.containedIn("orgId",a),n.find().then(function(t){for(var a=0;a<t.length;a++){var s=t[a];e.push(s.id)}return e}).then(function(a){var e=[],s={},n=i.a.Object.extend("Issue"),r=new i.a.Query(n);r.containedIn("proId",a),r.find().then(function(a){for(var n=0;n<a.length;n++){var r=a[n];s.issueId=r.id,s.orgId=r.get("orgId"),s.proId=r.get("proId"),s.proName=r.get("proName"),s.orgName=r.get("orgName"),s.issueName=r.get("name"),e.push(s),s={}}t.issues=e})})})},showAssignee:function(){var t=this,a=[],e=i.a.Object.extend("Issue"),s=new i.a.Query(e);s.equalTo("assigneeId",t.user.id),s.find().then(function(t){for(var e=0;e<t.length;e++){var s={},n=t[e];s.assignIssue=n.get("name"),s.issueId=n.id,s.orgId=n.get("orgId"),s.proId=n.get("proId"),s.orgName=n.get("orgName"),s.proName=n.get("proName"),a.push(s)}},function(t){}),t.assigneeList=a}},watch:{}},c=o,l=(e("e8b4"),e("2877")),u=Object(l["a"])(c,s,n,!1,null,"2792ae34",null);a["default"]=u.exports},e8b4:function(t,a,e){"use strict";var s=e("1a41"),n=e.n(s);n.a}}]);
//# sourceMappingURL=chunk-3acd4b64.03a8986f.js.map