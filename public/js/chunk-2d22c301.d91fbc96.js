(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22c301"],{f1bb:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"my-3",attrs:{id:"wrap"}},[a("div",{staticClass:"row my-4"},[a("div",{staticClass:"mb-0 d-flex align-items-center"},[a("h4",{staticClass:"text-left"},[a("router-link",{attrs:{to:{name:"organization"},tag:"a","active-class":"active"}},[a("a",[t._v(t._s(t.orgName))])]),t._v("\n        / "),a("router-link",{attrs:{to:{name:"project"},tag:"a","active-class":"active"}},[a("a",[t._v(t._s(t.proName))])])],1)]),t._m(0)]),a("ul",{staticClass:"nav nav-tabs"},[t._m(1),a("router-link",{staticClass:"nav-item",attrs:{to:{name:"project",params:{orgId:t.orgId,proId:t.proId}},tag:"li","active-class":"active"}},[a("a",{staticClass:"nav-link active"},[t._v("問題 "),a("span",{staticClass:"ml-2 badge badge-secondary"},[t._v("123")])])]),t._m(2),t._m(3),t._m(4),t._m(5),t._m(6)],1),a("div",{staticClass:"row my-4 d-flex justify-content-between"},[a("div",{staticClass:"btn-group",attrs:{role:"group","aria-label":"Basic example"}},[a("router-link",{staticClass:"btn btn-outline-secondary",attrs:{to:{name:"label-list",params:{proId:t.proId}},tag:"button","active-class":"active"}},[t._v("\n        標籤\n      ")]),a("router-link",{staticClass:"btn btn-outline-secondary",attrs:{to:{name:"milestone",params:{proId:t.proId}},tag:"button","active-class":"active"}},[t._v("\n        里程碑\n      ")])],1),a("div",[a("router-link",{staticClass:"btn btn-success",attrs:{to:{name:"new-milestone",params:{orgId:t.orgId,proId:t.proId}},tag:"button","active-class":"active"}},[t._v("\n        新的里程碑\n      ")])],1)]),a("hr"),a("div",{staticClass:"row text-left"},[a("div",{staticClass:"col-8"},[!1===t.titleEditing?a("h3",[t._v(t._s(t.title))]):a("h3",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.title},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.changeTitle(e)},input:function(e){e.target.composing||(t.title=e.target.value)}}})]),a("div",{staticClass:"ml-1 row d-flex align-items-center"},[!0===t.issueOpened?a("div",[a("span",{staticClass:"p-2 badge badge-success",staticStyle:{"font-size":"20px"}},[t._v("開啟中")])]):a("div",[a("span",{staticClass:"badge badge-danger"},[t._v("已關閉")])]),a("h5",{staticClass:"mx-2 mb-0"},[t._v("由 "+t._s(t.creator)+" 建立")]),a("h5",{staticClass:"mb-0"},[t._v(t._s(t.comments.length)+" 條評論")])])]),!1===t.titleEditing?a("div",{staticClass:"ml-auto mt-3"},[a("button",{staticClass:"btn btn-outline-success ml-5",on:{click:function(e){t.titleEditing=!0}}},[t._v("編輯")])]):a("div",{staticClass:"ml-auto mt-3"},[a("button",{staticClass:"ml-3 btn btn-outline-primary",attrs:{type:"button",id:"button-addon2"},on:{click:t.cancelChange}},[t._v("取消")]),a("button",{staticClass:"ml-3 btn btn-success",attrs:{type:"button",id:"button-addon2"},on:{click:t.changeTitle}},[t._v("儲存")])])]),a("hr"),a("div",{staticClass:"row mx-auto"},[a("div",[t.avatarHash.length>0?a("img",{staticClass:"rounded",staticStyle:{width:"50px",height:"50px"},attrs:{src:"https://www.gravatar.com/avatar/"+t.avatarHash,alt:""}}):t._e()]),a("div",{staticClass:"col-9"},[a("div",[a("div",{staticClass:"py-2 pl-3 d-flex align-items-center bg-light-theme  border-light-theme border-bottom-0"},[a("div",{staticClass:"font-weight-bold"},[t._v(t._s(t.creator)+" 評論")]),!1===t.editing&&t.creatorId===t.userId?a("button",{staticClass:"ml-auto mr-3 btn btn-warning",on:{click:t.editIssueContent}},[t._v("編輯")]):t._e()]),!0===t.editing?a("div",{staticClass:"col-12 border-light-theme"},[a("form",{staticClass:"col-12 mt-3 mx-auto"},[t._m(7),a("div",{staticClass:"form-group text-left"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticClass:"form-control",attrs:{id:"content",rows:"10"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}})]),a("div",{staticClass:"py-5 d-flex justify-content-center border border-primary"},[t._v("拖放檔案或是點擊此處上傳")]),a("div",{staticClass:"text-right my-4"},[a("button",{staticClass:"btn btn-outline-primary",on:{click:function(e){return e.preventDefault(),t.cancelEdit(e)}}},[t._v("取消")]),a("button",{staticClass:"mx-3 btn btn-success",on:{click:function(e){return e.preventDefault(),t.newContent(e)}}},[t._v("儲存")])])])]):a("div",[t.content.length>0?a("vue-markdown",{staticClass:"p-4 border text-left",attrs:{source:t.content}}):a("div",{staticClass:"p-4 border text-left font-italic"},[t._v("尚未有任何內容")])],1),t._l(t.comments,function(e,s){return a("div",{staticClass:"mt-5"},[a("div",{staticClass:"row mb-3"},[a("p",{staticClass:"text-left mb-0"},[t._v("\n              Commented by "),a("span",{staticClass:"font-weight-bold"},[t._v(t._s(e.commentor))])]),e.userId===t.userId?a("div",{staticClass:"row ml-auto mr-5"},[a("button",{staticClass:"btn mr-3 btn-warning",on:{click:function(a){t.editComment(e.commentId,s)}}},[t._v("Edit")]),a("button",{staticClass:"btn btn-danger",on:{click:function(a){t.deleteComment(e.commentId,s)}}},[t._v("Delete")])]):t._e()]),!1===e.commentEditing?a("vue-markdown",{staticClass:"p-4 border border-success text-left",attrs:{source:e.content}}):a("form",{staticClass:"mx-auto my-5"},[a("div",{staticClass:"form-group text-left"},[a("label",{attrs:{for:"commentContent"}},[t._v("Edit Comment")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.stashComment,expression:"stashComment"}],staticClass:"form-control",attrs:{placeholder:"Comment Here",id:"commentContent",rows:"10"},domProps:{value:t.stashComment},on:{input:function(e){e.target.composing||(t.stashComment=e.target.value)}}})]),a("button",{staticClass:"mx-3 btn btn-success",on:{click:function(a){a.preventDefault(),t.editedComment(e.commentId,s)}}},[t._v("Submit")]),a("button",{staticClass:"mx-3 btn btn-danger",on:{click:function(e){e.preventDefault(),t.cancelEditComment(s)}}},[t._v("Cancel")])])],1)})],2)]),a("div",[a("ul",{staticClass:"text-left list-group list-group-flush",staticStyle:{border:"1px solid rgba(34,36,38,.15)"}},[t._m(8),a("li",{staticClass:"list-group-item"},[a("div",{staticClass:"dropdown"},[a("a",{staticClass:"btn btn-secondary dropdown-toggle",attrs:{href:"#",role:"button",id:"dropdownMenuLink","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[t._v("\n                標籤\n              ")]),a("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuLink"}},t._l(t.labels,function(e,s){return a("a",{staticClass:"dropdown-item",attrs:{href:"#"},on:{click:function(a){t.toggleLabel(e.added,e.labelId,s)}}},[t._v(t._s(e.title))])}),0),t._l(t.labels,function(e,s){return[!0===t.labels[s].added?a("h5",[a("span",{staticClass:"badge badge-secondary"},[t._v(t._s(t.labels[s].title))])]):t._e()]})],2)]),a("li",{staticClass:"pb-3 list-group-item"},[t._v("里程碑")]),a("li",{staticClass:"pb-3 list-group-item"},[t._v("指派成員")])])])])])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ml-auto"},[a("div",{staticClass:"pr-3 btn-group btn-group-toggle",attrs:{"data-toggle":"buttons"}},[a("label",{staticClass:"border border-dark btn"},[a("input",{attrs:{type:"radio",name:"options",id:"option1",autocomplete:"off",checked:""}}),t._v(" 取消關注\n        ")]),a("label",{staticClass:"border border-dark btn"},[a("input",{attrs:{type:"radio",name:"options",id:"option2",autocomplete:"off"}}),t._v(" 8\n        ")])]),a("div",{staticClass:"pr-3 btn-group btn-group-toggle",attrs:{"data-toggle":"buttons"}},[a("label",{staticClass:"border border-dark btn"},[a("input",{attrs:{type:"radio",name:"options",id:"option1",autocomplete:"off",checked:""}}),t._v(" 收藏\n        ")]),a("label",{staticClass:"border border-dark btn"},[a("input",{attrs:{type:"radio",name:"options",id:"option2",autocomplete:"off"}}),t._v(" 0\n        ")])]),a("div",{staticClass:"pr-3 btn-group btn-group-toggle",attrs:{"data-toggle":"buttons"}},[a("label",{staticClass:"border border-dark btn"},[a("input",{attrs:{type:"radio",name:"options",id:"option1",autocomplete:"off",checked:""}}),t._v(" 複製\n        ")]),a("label",{staticClass:"border border-dark btn"},[a("input",{attrs:{type:"radio",name:"options",id:"option2",autocomplete:"off"}}),t._v(" 0\n        ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("程式碼")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("合併請求"),a("span",{staticClass:"ml-2 badge badge-secondary"},[t._v("0")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("版本發佈"),a("span",{staticClass:"ml-2 badge badge-secondary"},[t._v("0")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("Wiki")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("活動")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"ml-auto nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("儲存庫設定")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"mb-2 nav nav-tabs"},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link active",attrs:{href:"#"}},[t._v("Write")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("Preview")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"list-group-item"},[a("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"未指定分支或標籤"}})])}],i=(a("7514"),a("bf48")),o=a.n(i),r=a("9ce6"),l=a.n(r),c={name:"issue",components:{VueMarkdown:l.a},data:function(){return{content:"",title:"",editTitle:!1,stashTitle:"",creatorId:"",creator:"",commentor:"",comments:[],commentText:"",labels:[],label:[],newLabel:"",updateLabelTitle:"",editing:!1,stashIssueContent:"",orgName:"",proName:"",issueOpened:"",titleEditing:!1}},created:function(){},computed:{avatarHash:function(){return this.$store.state.user.avatarHash},userId:function(){return this.$store.state.user.input.userId},orgId:function(){return this.$route.params.orgId},proId:function(){return this.$route.params.proId},issueId:function(){return this.$route.params.issueId}},mounted:function(){var t=this;t.showIssueInfo(),t.allLabel(),t.showComment()},methods:{showIssueInfo:function(){var t=this,e={},a={},s=o.a.Object.extend("Issue"),n=new o.a.Query(s);n.get(t.issueId).then(function(s){t.title=s.get("name"),t.creatorId=s.get("creatorId"),t.creator=s.get("creator"),t.content=s.get("content"),e.orgId=s.get("orgId"),e.orgName=s.get("orgName"),t.orgData=e,a.proId=s.get("proId"),a.proName=s.get("proName"),t.proData=a,t.orgName=s.get("orgName"),t.proName=s.get("proName"),t.issueOpened=s.get("issueOpened")})},addComment:function(){var t=this,e=o.a.Object.extend("Comment"),a=new e;a.set("content",t.commentText),a.set("issueId",t.issueId),a.set("commentor",t.$store.state.user.username),a.set("userId",t.$store.state.user.input.userId),a.save().then(function(e){t.commentText="",t.showComment()},function(t){alert("Failed to create new object, with error code: "+t.message)})},allLabel:function(){var t=this,e=o.a.Object.extend("Label"),a=new o.a.Query(e),s=[];a.equalTo("proId",t.proId),a.find().then(function(a){for(var n=function(n){var i={},r=a[n];i.labelId=r.id,i.title=r.get("title"),i.added=!1,i.editMode=!1,s.push(i);var l=[],c=new o.a.Query(e);c.equalTo("issueId",t.issueId),c.find().then(function(e){for(var a=0;a<e.length;a++)for(var s=e[a],n=0;n<t.labels.length;n++)t.labels[n].labelId===s.id&&(t.labels[n].added=!0,l.push(t.labels[n]))}),t.label=l},i=0;i<a.length;i++)n(i)}),t.labels=s},showComment:function(){var t=this,e=[],a=o.a.Object.extend("Comment"),s=new o.a.Query(a);s.equalTo("issueId",t.issueId),s.find().then(function(t){for(var a=0;a<t.length;a++){var s={},n=t[a];s.commentId=n.id,s.content=n.get("content"),s.userId=n.get("userId"),s.commentor=n.get("commentor"),s.commentEditing=!1,s.stashComment="",e.push(s)}}),t.comments=e},toggleLabel:function(t,e,a){var s=this;if(s.labels[a].added=!s.labels[a].added,!0===s.labels[a].added){var n=o.a.Object.extend("Label"),i=new o.a.Query(n);i.get(e).then(function(t){t.addUnique("issueId",s.issueId),t.save()})}else{var r=o.a.Object.extend("Label"),l=new o.a.Query(r);l.get(e).then(function(t){t.remove("issueId",s.issueId),t.save()})}},changeTitle:function(){var t=this;t.titleEditing=!1;var e=o.a.Object.extend("Issue"),a=new o.a.Query(e);a.get(t.issueId).then(function(e){return e.set("name",t.title),e.save()},function(t){})},cancelChange:function(){var t=this,e=o.a.Object.extend("Issue"),a=new o.a.Query(e);a.get(t.issueId).then(function(e){t.title=e.get("name"),t.titleEditing=!1})},editIssueContent:function(){var t=this;t.editing=!0,t.stashIssueContent=t.content},newContent:function(){var t=this,e=o.a.Object.extend("Issue"),a=new o.a.Query(e);a.get(t.issueId).then(function(e){return e.set("content",t.content),t.showIssueInfo(),e.save()}),t.editing=!1},cancelEdit:function(){var t=this,e=o.a.Object.extend("Issue"),a=new o.a.Query(e);a.get(t.issueId).then(function(e){t.content=e.get("content"),t.editing=!1})},editComment:function(t,e){var a=this;a.comments[e].commentEditing=!0,a.stashComment=a.comments[e].content},editedComment:function(t,e){var a=this;a.comments[e].content=a.stashComment,a.comments[e].commentEditing=!1;var s=o.a.Object.extend("Comment"),n=new o.a.Query(s);n.get(t).then(function(t){return t.set("content",a.stashComment),t.save()},function(t){})},cancelEditComment:function(t){var e=this;e.comments[t].commentEditing=!1},deleteComment:function(t,e){var a=this,s=o.a.Object.extend("Comment"),n=new o.a.Query(s);n.get(t).then(function(t){confirm("確定刪除此評論？")&&t.destroy().then(function(){a.showComment()})},function(t){})}},watch:{}},d=c,u=a("2877"),m=Object(u["a"])(d,s,n,!1,null,"8faa5456",null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-2d22c301.d91fbc96.js.map