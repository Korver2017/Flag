(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22a127"],{dfc2:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"my-3",attrs:{id:"wrap"}},[a("div",{staticClass:"row my-4"},[a("div",{staticClass:"mb-0 d-flex align-items-center"},[a("h4",{staticClass:"text-left"},[a("router-link",{attrs:{to:{name:"organization"},tag:"a","active-class":"active"}},[a("a",[t._v(t._s(t.orgName))])]),t._v("\n        / "),a("router-link",{attrs:{to:{name:"project"},tag:"a","active-class":"active"}},[a("a",[t._v(t._s(t.proName))])])],1)]),t._m(0)]),a("ul",{staticClass:"nav nav-tabs"},[t._m(1),a("router-link",{staticClass:"nav-item",attrs:{to:{name:"project",params:{orgId:t.orgId,proId:t.proId}},tag:"li","active-class":"active"}},[a("a",{staticClass:"nav-link active"},[t._v("問題 "),a("span",{staticClass:"ml-2 badge badge-secondary"},[t._v("123")])])]),t._m(2),t._m(3),t._m(4),t._m(5),t._m(6)],1),a("div",{staticClass:"row my-4 d-flex justify-content-between"},[a("div",{staticClass:"btn-group",attrs:{role:"group","aria-label":"Basic example"}},[a("router-link",{staticClass:"btn btn-outline-secondary",attrs:{to:{name:"label-list",params:{proId:t.proId}},tag:"button","active-class":"active"}},[t._v("\n        標籤\n      ")]),a("router-link",{staticClass:"btn btn-outline-secondary",attrs:{to:{name:"milestone",params:{proId:t.proId}},tag:"button","active-class":"active"}},[t._v("\n        里程碑\n      ")])],1)]),a("hr"),t._m(7),a("hr"),a("div",{staticClass:"row"},[a("div",{staticClass:"col-8"},[a("form",{staticClass:"text-left"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"mileTitle"}},[t._v("標題")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.mileTitle,expression:"mileTitle"}],staticClass:"form-control",attrs:{type:"text",id:"mileTitle",placeholder:"標題"},domProps:{value:t.mileTitle},on:{input:function(e){e.target.composing||(t.mileTitle=e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"desc"}},[t._v("描述")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.mileDesc,expression:"mileDesc"}],staticClass:"form-control",attrs:{id:"desc",rows:"10"},domProps:{value:t.mileDesc},on:{input:function(e){e.target.composing||(t.mileDesc=e.target.value)}}})])])]),a("div",{staticClass:"col-4"},[a("form",{staticClass:"text-left"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"expireDate"}},[t._v("截止日期（可選）")]),a("button",{staticClass:"mb-2 btn btn-warning",on:{click:function(e){e.preventDefault(),t.date=null}}},[t._v("清除")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.date,expression:"date"}],staticClass:"col-6 form-control",attrs:{type:"text",id:"expireDate"},domProps:{value:t.date},on:{input:function(e){e.target.composing||(t.date=e.target.value)}}})]),a("date-picker",{staticClass:"col-8 p-2 border border-secondary",attrs:{name:"date",config:t.options},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)])]),a("hr",{staticClass:"my-4"}),a("div",{staticClass:"text-right"},[a("button",{staticClass:"btn btn-success",on:{click:t.addMilestone}},[t._v("建立里程碑")])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ml-auto"},[a("div",{staticClass:"pr-3 btn-group btn-group-toggle",attrs:{"data-toggle":"buttons"}},[a("label",{staticClass:"border border-dark btn"},[a("input",{attrs:{type:"radio",name:"options",id:"option1",autocomplete:"off",checked:""}}),t._v(" 取消關注\n        ")]),a("label",{staticClass:"border border-dark btn"},[a("input",{attrs:{type:"radio",name:"options",id:"option2",autocomplete:"off"}}),t._v(" 8\n        ")])]),a("div",{staticClass:"pr-3 btn-group btn-group-toggle",attrs:{"data-toggle":"buttons"}},[a("label",{staticClass:"border border-dark btn"},[a("input",{attrs:{type:"radio",name:"options",id:"option1",autocomplete:"off",checked:""}}),t._v(" 收藏\n        ")]),a("label",{staticClass:"border border-dark btn"},[a("input",{attrs:{type:"radio",name:"options",id:"option2",autocomplete:"off"}}),t._v(" 0\n        ")])]),a("div",{staticClass:"pr-3 btn-group btn-group-toggle",attrs:{"data-toggle":"buttons"}},[a("label",{staticClass:"border border-dark btn"},[a("input",{attrs:{type:"radio",name:"options",id:"option1",autocomplete:"off",checked:""}}),t._v(" 複製\n        ")]),a("label",{staticClass:"border border-dark btn"},[a("input",{attrs:{type:"radio",name:"options",id:"option2",autocomplete:"off"}}),t._v(" 0\n        ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("程式碼")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("合併請求"),a("span",{staticClass:"ml-2 badge badge-secondary"},[t._v("0")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("版本發佈"),a("span",{staticClass:"ml-2 badge badge-secondary"},[t._v("0")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("Wiki")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("活動")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"ml-auto nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("儲存庫設定")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-left"},[a("h3",[t._v("新的里程碑")]),a("h5",[t._v("Milestones organize issues and track progress.")])])}],r=a("bf48"),o=a.n(r),n=a("133f"),l=a.n(n),c=(a("ca56"),{name:"new-milestone",components:{datePicker:l.a},data:function(){return{date:null,options:{format:"YYYY-MM-DD",inline:!0},mileDesc:"",mileTitle:"",orgName:"",proName:""}},computed:{orgId:function(){return this.$route.params.orgId},proId:function(){return this.$route.params.proId}},mounted:function(){},methods:{addMilestone:function(){var t=this,e=o.a.Object.extend("Milestone"),a=new e;a.set("title",t.mileTitle),a.set("proId",t.proId),a.set("orgId",t.orgId),a.set("proName",t.proName),a.set("orgName",t.orgName),a.set("mileOpened",!0),a.set("dueDate",t.date),a.set("mileDesc",t.mileDesc),a.save().then(function(e){t.mileTitle="",t.$router.push({name:"milestone"})},function(t){alert("Failed to create new object, with error code: "+t.message)})}}}),d=c,m=a("2877"),u=Object(m["a"])(d,s,i,!1,null,"99576a9e",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d22a127.8375c18d.js.map