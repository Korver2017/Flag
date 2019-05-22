(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22c301"],{f1bb:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container my-4"},[n("h3",{staticClass:"my-5 text-left"},[n("router-link",{attrs:{to:{name:"organization"},tag:"a","active-class":"active"}},[n("a",[t._v(t._s(t.orgData.orgName))])]),t._v(" / \n\n    "),n("router-link",{attrs:{to:{name:"project"},tag:"a","active-class":"active"}},[n("a",[t._v(t._s(t.proData.proName))])])],1),!1===t.editTitle?n("div",{staticClass:"row"},[n("h3",{staticClass:"text-left"},[t._v(t._s(t.title)+" - Created by "+t._s(t.creator))]),n("button",{staticClass:"btn btn-warning ml-5",on:{click:function(e){t.editTitle=!0}}},[t._v("Edit Title")])]):n("div",{staticClass:"row"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.stashTitle,expression:"stashTitle"}],staticClass:"col-6 form-control",attrs:{type:"text",placeholder:"New Title","aria-label":"New Title","aria-describedby":"button-addon2"},domProps:{value:t.stashTitle},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.changeTitle(e)},input:function(e){e.target.composing||(t.stashTitle=e.target.value)}}}),n("button",{staticClass:"ml-3 btn btn-success",attrs:{type:"button",id:"button-addon2"},on:{click:t.changeTitle}},[t._v("Submit")]),n("button",{staticClass:"ml-3 btn btn-danger",attrs:{type:"button",id:"button-addon2"},on:{click:t.cancelChange}},[t._v("Cancel")])]),n("div",{staticClass:"row"},t._l(t.labels,function(e){return!0===e.added?n("span",{staticClass:"py-2 px-3 mx-1 badge badge-primary"},[t._v(t._s(e.title))]):t._e()}),0),n("hr"),n("div",{staticClass:"row"},[n("div",{staticClass:"col-9"},[n("div",{staticClass:"row mb-3"},[n("p",{staticClass:"text-left mb-0"},[t._v("\n          Commented by "),n("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.creator))])]),!1===t.editing&&t.creatorId===t.userId?n("button",{staticClass:"ml-auto mr-5 btn btn-warning",on:{click:t.editIssueContent}},[t._v("Edit")]):t._e()]),!0===t.editing?n("form",{staticClass:"mx-auto my-5"},[n("div",{staticClass:"form-group text-left"},[n("label",{attrs:{for:"stashIssueContent"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.newContent(e)}}},[t._v("Comment")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.stashIssueContent,expression:"stashIssueContent"}],staticClass:"form-control",attrs:{placeholder:"Comment Here",id:"stashIssueContent",rows:"10"},domProps:{value:t.stashIssueContent},on:{input:function(e){e.target.composing||(t.stashIssueContent=e.target.value)}}})]),n("button",{staticClass:"mx-3 btn btn-success",on:{click:function(e){return e.preventDefault(),t.newContent(e)}}},[t._v("Submit")]),n("button",{staticClass:"mx-3 btn btn-danger",on:{click:function(e){return e.preventDefault(),t.cancelEdit(e)}}},[t._v("Cancel")])]):t._e(),t.content.length>0?n("vue-markdown",{staticClass:"p-4 border border-success text-left",attrs:{source:t.content}}):n("p",{staticClass:"p-4 border border-success text-left font-italic"},[t._v("No description provided.")]),t._l(t.comments,function(e,s){return n("div",{staticClass:"mt-5"},[n("div",{staticClass:"row mb-3"},[n("p",{staticClass:"text-left mb-0"},[t._v("\n            Commented by "),n("span",{staticClass:"font-weight-bold"},[t._v(t._s(e.commentor))])]),e.userId===t.userId?n("div",{staticClass:"row ml-auto mr-5"},[n("button",{staticClass:"btn mr-3 btn-warning",on:{click:function(n){t.editComment(e.commentId,s)}}},[t._v("Edit")]),n("button",{staticClass:"btn btn-danger",on:{click:function(n){t.deleteComment(e.commentId,s)}}},[t._v("Delete")])]):t._e()]),!1===e.commentEditing?n("vue-markdown",{staticClass:"p-4 border border-success text-left",attrs:{source:e.content}}):n("form",{staticClass:"mx-auto my-5"},[n("div",{staticClass:"form-group text-left"},[n("label",{attrs:{for:"commentContent"}},[t._v("Edit Comment")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.stashComment,expression:"stashComment"}],staticClass:"form-control",attrs:{placeholder:"Comment Here",id:"commentContent",rows:"10"},domProps:{value:t.stashComment},on:{input:function(e){e.target.composing||(t.stashComment=e.target.value)}}})]),n("button",{staticClass:"mx-3 btn btn-success",on:{click:function(n){n.preventDefault(),t.editedComment(e.commentId,s)}}},[t._v("Submit")]),n("button",{staticClass:"mx-3 btn btn-danger",on:{click:function(e){e.preventDefault(),t.cancelEditComment(s)}}},[t._v("Cancel")])])],1)}),n("form",{staticClass:"mx-auto my-5"},[n("div",{staticClass:"form-group text-left"},[n("label",{attrs:{for:"content"}},[t._v("New Comment")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.commentText,expression:"commentText"}],staticClass:"form-control",attrs:{placeholder:"Comment Here",id:"content",rows:"10"},domProps:{value:t.commentText},on:{input:function(e){e.target.composing||(t.commentText=e.target.value)}}})]),n("button",{staticClass:"mx-3 btn btn-success",on:{click:function(e){return e.preventDefault(),t.addComment(e)}}},[t._v("Add Comment")])])],2),n("div",{staticClass:"col-3"},t._l(t.labels,function(e,s){return n("button",{staticClass:"my-3 d-block btn btn-primary",on:{click:function(n){t.toggleLabel(e.added,e.labelId,s)}}},[t._v(t._s(e.title))])}),0)])])},a=[],o=(n("7514"),n("bf48")),i=n.n(o),r=n("9ce6"),c=n.n(r),l={name:"issue",components:{VueMarkdown:c.a},data:function(){return{content:"",title:"",editTitle:!1,stashTitle:"",creatorId:"",creator:"",commentor:"",comments:[],commentText:"",labels:[],label:[],newLabel:"",updateLabelTitle:"",editing:!1,stashIssueContent:"",orgData:"",proData:""}},created:function(){},computed:{userId:function(){return this.$store.state.user.input.userId},proId:function(){return this.$route.params.proId},issueId:function(){return this.$route.params.issueId}},mounted:function(){var t=this;t.showIssueInfo(),t.allLabel(),t.showComment()},methods:{showIssueInfo:function(){var t=this,e={},n={},s=i.a.Object.extend("Issue"),a=new i.a.Query(s);a.get(t.issueId).then(function(s){t.title=s.get("name"),t.creatorId=s.get("creatorId"),t.creator=s.get("creator"),t.content=s.get("content"),e.orgId=s.get("orgId"),e.orgName=s.get("orgName"),t.orgData=e,n.proId=s.get("proId"),n.proName=s.get("proName"),t.proData=n})},addComment:function(){var t=this,e=i.a.Object.extend("Comment"),n=new e;n.set("content",t.commentText),n.set("issueId",t.issueId),n.set("commentor",t.$store.state.user.username),n.set("userId",t.$store.state.user.input.userId),n.save().then(function(e){t.commentText="",t.showComment()},function(t){alert("Failed to create new object, with error code: "+t.message)})},allLabel:function(){var t=this,e=i.a.Object.extend("Label"),n=new i.a.Query(e),s=[];n.equalTo("proId",t.proId),n.find().then(function(n){for(var a=function(a){var o={},r=n[a];o.labelId=r.id,o.title=r.get("title"),o.added=!1,o.editMode=!1,s.push(o);var c=[],l=new i.a.Query(e);l.equalTo("issueId",t.issueId),l.find().then(function(e){for(var n=0;n<e.length;n++)for(var s=e[n],a=0;a<t.labels.length;a++)t.labels[a].labelId===s.id&&(t.labels[a].added=!0,c.push(t.labels[a]))}),t.label=c},o=0;o<n.length;o++)a(o)}),t.labels=s},showComment:function(){var t=this,e=[],n=i.a.Object.extend("Comment"),s=new i.a.Query(n);s.equalTo("issueId",t.issueId),s.find().then(function(t){for(var n=0;n<t.length;n++){var s={},a=t[n];s.commentId=a.id,s.content=a.get("content"),s.userId=a.get("userId"),s.commentor=a.get("commentor"),s.commentEditing=!1,s.stashComment="",e.push(s)}}),t.comments=e},toggleLabel:function(t,e,n){var s=this;if(s.labels[n].added=!s.labels[n].added,!0===s.labels[n].added){var a=i.a.Object.extend("Label"),o=new i.a.Query(a);o.get(e).then(function(t){t.addUnique("issueId",s.issueId),t.save()})}else{var r=i.a.Object.extend("Label"),c=new i.a.Query(r);c.get(e).then(function(t){t.remove("issueId",s.issueId),t.save()})}},changeTitle:function(){var t=this;t.title=t.stashTitle,t.editTitle=!1;var e=i.a.Object.extend("Issue"),n=new i.a.Query(e);n.get(t.issueId).then(function(e){return e.set("name",t.title),e.save()},function(t){})},cancelChange:function(){var t=this;t.stashTitle="",t.editTitle=!1},editIssueContent:function(){var t=this;t.editing=!0,t.stashIssueContent=t.content},newContent:function(){var t=this;t.content=t.stashIssueContent;var e=i.a.Object.extend("Issue"),n=new i.a.Query(e);n.get(t.issueId).then(function(e){return e.set("content",t.content),e.save()}),t.editing=!1},cancelEdit:function(){var t=this;t.stashIssueContent=t.content,t.editing=!1},editComment:function(t,e){var n=this;n.comments[e].commentEditing=!0,n.stashComment=n.comments[e].content},editedComment:function(t,e){var n=this;n.comments[e].content=n.stashComment,n.comments[e].commentEditing=!1;var s=i.a.Object.extend("Comment"),a=new i.a.Query(s);a.get(t).then(function(t){return t.set("content",n.stashComment),t.save()},function(t){})},cancelEditComment:function(t){var e=this;e.comments[t].commentEditing=!1},deleteComment:function(t,e){var n=this,s=i.a.Object.extend("Comment"),a=new i.a.Query(s);a.get(t).then(function(t){confirm("確定刪除此評論？")&&t.destroy().then(function(){n.showComment()})},function(t){})}},watch:{}},m=l,u=n("2877"),d=Object(u["a"])(m,s,a,!1,null,"91bc66a0",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d22c301.f7c461e8.js.map