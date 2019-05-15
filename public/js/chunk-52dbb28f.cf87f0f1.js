(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52dbb28f"],{"1b61":function(e,t,s){"use strict";var n=s("5b12"),a=s.n(n);a.a},"5b12":function(e,t,s){},"616c":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container my-4"},[s("h3",{staticClass:"my-5 text-left"},[s("router-link",{attrs:{to:{name:"organization"},tag:"a","active-class":"active"}},[s("a",[e._v(e._s(e.orgName))])]),e._v("\n     / "+e._s(e.proName)+"\n\n  ")],1),e.adding?s("div",[s("form",{staticClass:"col-8 mx-auto my-5"},[s("div",{staticClass:"form-group text-left"},[s("label",{attrs:{for:"title"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitIssue(t)}}},[e._v("Issue Title")]),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.title,expression:"title",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{placeholder:"Issue Title",id:"title"},domProps:{value:e.title},on:{input:function(t){t.target.composing||(e.title=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),s("div",{staticClass:"form-group text-left"},[s("label",{attrs:{for:"content"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitIssue(t)}}},[e._v("Issue Content")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.content,expression:"content"}],staticClass:"form-control",attrs:{placeholder:"Issue Content",id:"content",rows:"10"},domProps:{value:e.content},on:{input:function(t){t.target.composing||(e.content=t.target.value)}}})]),s("button",{staticClass:"mx-3 btn btn-success",on:{click:function(t){return t.preventDefault(),e.submitIssue(t)}}},[e._v("Submit")]),s("button",{staticClass:"mx-3 btn btn-danger",on:{click:function(t){return t.preventDefault(),e.cancel(t)}}},[e._v("Cancel")])])]):e._e(),s("button",{staticClass:"my-3 btn btn-success",on:{click:e.addIssue}},[e._v("Add Issue")]),s("router-link",{staticClass:"ml-3 btn btn-info",attrs:{to:{name:"milestone",params:{proId:e.proId}},tag:"button","active-class":"active"}},[e._v("\n    Milestone "),s("span",{staticClass:"badge badge-light"},[e._v(e._s(e.milestones.length))])]),s("form",{staticClass:"col-6 ml-auto"},[s("div",{staticClass:"form-group text-left"},[s("label",{attrs:{for:"name"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addMilestone(t)}}},[e._v("Add Milestone")]),s("div",{staticClass:"row"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.mileTitle,expression:"mileTitle",modifiers:{trim:!0}}],staticClass:"form-control col-8",attrs:{placeholder:"Milestone Name",id:"name"},domProps:{value:e.mileTitle},on:{input:function(t){t.target.composing||(e.mileTitle=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),s("button",{staticClass:"btn btn-success",on:{click:function(t){return t.preventDefault(),e.addMilestone(t)}}},[e._v("Submit")])])])]),s("div",{staticClass:"rwo text-left"},[s("button",{staticClass:"ml-3 btn btn-info",attrs:{type:"button"},on:{click:function(t){e.showOpened=!0}}},[e._v("\n      Opened "),s("span",{staticClass:"badge badge-light"},[e._v(e._s(e.opened.length))])]),s("button",{staticClass:"ml-3 btn btn-secondary",attrs:{type:"button"},on:{click:function(t){e.showOpened=!1}}},[e._v("\n      Closed "),s("span",{staticClass:"badge badge-light"},[e._v(e._s(e.closed.length))])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"dropdown ml-auto mr-3 mb-3"},[s("button",{staticClass:"btn btn-secondary dropdown-toggle",attrs:{disabled:!1===e.checking,type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[e._v("\n        Mark as\n      ")]),s("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},[s("button",{staticClass:"dropdown-item",on:{click:e.reopenIssue}},[e._v("Open")]),s("button",{staticClass:"dropdown-item",on:{click:e.closeIssue}},[e._v("Closed")])])]),s("div",{staticClass:"dropdown mr-3"},[s("button",{staticClass:"btn btn-secondary dropdown-toggle",attrs:{disabled:!1===e.checking,type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[e._v("\n        加入到 Milestone\n      ")]),s("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},e._l(e.milestones,function(t,n){return s("button",{staticClass:"dropdown-item",on:{click:function(s){e.addIssueTo(t.mileId)}}},[e._v(e._s(t.title))])}),0)]),s("div",{staticClass:"dropdown mr-3"},[s("button",{staticClass:"btn btn-secondary dropdown-toggle",attrs:{disabled:!1===e.checking,type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[e._v("\n        Assign to\n      ")]),s("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},e._l(e.users,function(t){return s("button",{staticClass:"dropdown-item",on:{click:function(s){e.assignTo(t.assigneeId,t.avatarHash)}}},[e._v(e._s(t.name))])}),0)])]),e.issues.length>=1?s("div",{staticClass:"mt-5 list-group"},[e._l(e.issues,function(t){return[!1===t.issueOpened&&!1===e.showOpened?s("router-link",{staticClass:"clearfix text-left list-group-item list-group-item-action",staticStyle:{"line-height":"50px"},attrs:{to:{name:"issue",params:{issueId:t.issueId}},tag:"li",type:"li","active-class":"active"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],staticClass:"mr-3",attrs:{type:"checkbox"},domProps:{value:t.issueId,checked:Array.isArray(e.checked)?e._i(e.checked,t.issueId)>-1:e.checked},on:{change:function(s){var n=e.checked,a=s.target,o=!!a.checked;if(Array.isArray(n)){var i=t.issueId,r=e._i(n,i);a.checked?r<0&&(e.checked=n.concat([i])):r>-1&&(e.checked=n.slice(0,r).concat(n.slice(r+1)))}else e.checked=o}}}),s("a",[e._v(e._s(t.name))]),e._l(t.labels,function(t){return s("span",{staticClass:"py-2 px-3 ml-3 badge badge-primary"},[e._v(e._s(t))])}),e._l(t.avatarHash,function(n){return t.avatarHash.length>0?[s("img",{staticClass:"ml-3 float-right rounded",staticStyle:{width:"50px"},attrs:{src:"https://www.gravatar.com/avatar/"+n,alt:""}})]:e._e()})],2):!0===t.issueOpened&&!0===e.showOpened?s("router-link",{staticClass:"clearfix text-left list-group-item list-group-item-action",staticStyle:{"line-height":"50px"},attrs:{to:{name:"issue",params:{issueId:t.issueId}},tag:"li",type:"li","active-class":"active"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],staticClass:"mr-3",attrs:{type:"checkbox"},domProps:{value:t.issueId,checked:Array.isArray(e.checked)?e._i(e.checked,t.issueId)>-1:e.checked},on:{change:function(s){var n=e.checked,a=s.target,o=!!a.checked;if(Array.isArray(n)){var i=t.issueId,r=e._i(n,i);a.checked?r<0&&(e.checked=n.concat([i])):r>-1&&(e.checked=n.slice(0,r).concat(n.slice(r+1)))}else e.checked=o}}}),s("a",[e._v(e._s(t.name))]),e._l(t.labels,function(t){return s("span",{staticClass:"py-2 px-3 ml-3 badge badge-primary"},[e._v(e._s(t))])}),e._l(t.avatarHash,function(n){return t.avatarHash.length>0?[s("img",{staticClass:"ml-3 float-right rounded",staticStyle:{width:"50px"},attrs:{src:"https://www.gravatar.com/avatar/"+n,alt:""}})]:e._e()})],2):e._e()]})],2):s("div",{staticClass:"card text-left"},[s("h4",{staticClass:"card-body py-5 font-italic font-weight-lighter"},[e._v("\n      There aren’t any open issues.\n      No description provided.\n    ")])])],1)},a=[],o=(s("7514"),s("bf48")),i=s.n(o),r={name:"project",components:{},data:function(){return{proName:"",issues:[],adding:!1,title:"",content:"",username:this.$store.state.user.username,labels:[],checked:[],opened:[],closed:[],showOpened:!0,milestones:[],users:[],orgName:"",orgId:"",mileTitle:""}},computed:{proId:function(){return this.$route.params.proId},userId:function(){return this.$store.state.user.input.userId},checking:function(){var e=this;if(0===e.checked.length)return!1}},created:function(){},mounted:function(){var e=this;e.showUser(),e.showProName(),e.showIssue(),e.showMilestone()},methods:{showUser:function(){var e=this,t=i.a.Object.extend("Project"),s=new i.a.Query(t),n=[];s.get(e.proId).then(function(t){var s=t.get("orgId"),a=i.a.Object.extend("Organization"),o=new i.a.Query(a);e.orgId=s,o.get(s).then(function(e){for(var t=e.get("memberId"),s=function(e){var s={},a=t[e],o=i.a.Object.extend("Account"),r=new i.a.Query(o);r.get(a).then(function(e){s.name=e.get("username"),s.assigneeId=a,s.avatarHash=e.get("avatarHash"),s.email=e.get("email"),n.push(s)})},a=0;a<t.length;a++)s(a)}),e.users=n},function(e){})},showProName:function(){var e=this,t=e.$route.params.proId,s=i.a.Object.extend("Project"),n=new i.a.Query(s);n.get(t).then(function(t){e.proName=t.get("name"),e.orgName=t.get("orgName")})},showIssue:function(){var e=this,t=i.a.Object.extend("Issue"),s=new i.a.Query(t);s.equalTo("proId",e.proId);var n=[],a=[],o=[];s.find().then(function(e){for(var t=function(t){var s={},r=e[t];s.name=r.get("name"),s.issueId=r.id,s.creator=r.get("creator"),s.issueOpened=r.get("issueOpened"),s.avatarHash=r.get("avatarHash"),s.assigneeId=r.get("assigneeId");var c=[],d=i.a.Object.extend("Label"),u=new i.a.Query(d);u.equalTo("issueId",r.id),u.find().then(function(e){for(var t=0;t<e.length;t++){var s=e[t];c.push(s.get("title"))}}),s.labels=c,n.push(s),!0===s.issueOpened?a.push(s):!1===s.issueOpened&&o.push(s)},s=0;s<e.length;s++)t(s)}),e.issues=n,e.opened=a,e.closed=o},showLabel:function(){},addIssue:function(){this.adding=!0},submitIssue:function(){var e=this,t=i.a.Object.extend("Issue"),s=new t;new i.a.Query(t);s.set("name",e.title),s.set("content",e.content),s.set("creator",e.$store.state.user.username),s.set("creatorId",e.$store.state.user.input.userId),s.set("issueOpened",!0),s.set("milestone",[]),s.set("avatarHash",[]),s.set("orgId",e.orgId),s.set("proId",e.proId),s.set("orgName",e.orgName),s.set("proName",e.proName),s.save().then(function(t){e.title="",e.content="",e.showIssue(),e.adding=!1},function(e){alert("Failed to create new object, with error code: "+e.message)})},cancel:function(){this.adding=!1,this.title="",this.content=""},closeIssue:function(){for(var e=this,t=i.a.Object.extend("Issue"),s=0;s<e.checked.length;s++){var n=new i.a.Query(t);n.get(e.checked[s]).then(function(t){t.set("issueOpened",!1),t.save().then(function(){e.showIssue()})},function(e){})}e.checked=[]},reopenIssue:function(){for(var e=this,t=i.a.Object.extend("Issue"),s=0;s<e.checked.length;s++){var n=new i.a.Query(t);n.get(e.checked[s]).then(function(t){t.set("issueOpened",!0),t.save().then(function(){return e.showIssue()})},function(e){})}e.checked=[]},showMilestone:function(){var e=this,t=i.a.Object.extend("Milestone"),s=new i.a.Query(t),n=[];s.equalTo("proId",e.proId),s.find().then(function(e){for(var t=0;t<e.length;t++){var s={},a=e[t];s.mileId=a.id,s.title=a.get("title"),n.push(s)}}),e.milestones=n},addIssueTo:function(e){for(var t=this,s=i.a.Object.extend("Issue"),n=0;n<t.checked.length;n++){var a=new i.a.Query(s);a.get(t.checked[n]).then(function(s){s.addUnique("milestone",e),s.save().then(function(e){t.checked=[]});var n=i.a.Object.extend("Milestone"),a=new i.a.Query(n);a.get(e).then(function(e){return e.set("proId",t.proId),e.save()},function(e){})},function(e){})}},assignTo:function(e,t){var s=this,n=i.a.Object.extend("Issue"),a=new i.a.Query(n);a.containedIn("objectId",s.checked),a.find().then(function(a){for(var o=0;o<a.length;o++){var r=a[o],c=new i.a.Query(n);c.get(r.id).then(function(n){n.addUnique("avatarHash",t),n.addUnique("assigneeId",e),n.save().then(function(){s.showIssue(),s.checked=[]})})}})},addMilestone:function(){var e=this,t=i.a.Object.extend("Milestone"),s=new t;s.set("title",e.mileTitle),s.set("proId",e.proId),s.set("orgId",e.orgId),s.set("mileOpened",!0),s.save().then(function(t){e.mileTitle="",e.showMilestone()},function(e){alert("Failed to create new object, with error code: "+e.message)})}},watch:{}},c=r,d=(s("1b61"),s("2877")),u=Object(d["a"])(c,n,a,!1,null,"d9662b1a",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-52dbb28f.cf87f0f1.js.map