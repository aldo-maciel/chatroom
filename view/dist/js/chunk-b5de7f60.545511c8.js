(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b5de7f60"],{"2e1e":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"layout users"},[a("div",{staticClass:"title"},[a("h2",{staticClass:"grow-1 text-center"},[t._v(t._s(t.$t("users.title")))]),a("al-button",{staticClass:"text-center",attrs:{variation:"link"},on:{click:t.addNew}},[a("em",{staticClass:"gg-add mx-1"}),a("span",[t._v(t._s(t.$t("general.new")))])])],1),a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",{staticClass:"created-at"},[t._v(t._s(t.$t("users.createdAt")))]),a("th",[t._v(t._s(t.$t("users.username")))]),a("th",[t._v(t._s(t.$t("users.admin")))]),a("th",[t._v(t._s(t.$t("users.readonly")))])])]),0===t.rows.length?a("tbody",[a("tr",[a("td",{staticClass:"text-center",attrs:{colspan:"4"}},[t._v(" "+t._s(t.$t("general.noResults"))+" ")])])]):t._e(),t.rows.length>0?a("tbody",t._l(t.rows,(function(e){return a("tr",{key:e._id},[a("td",{staticClass:"created-at"},[t._v(t._s(t.$d(new Date,"long")))]),a("td",[t._v(" "+t._s(e.username)+" ")]),a("td",[t._v(" "+t._s(e.admin)+" ")]),a("td",[t._v(" "+t._s(e.readonly)+" ")])])})),0):t._e(),a("tfoot",[a("tr",[a("td",{attrs:{colspan:"4"}},[a("paginate",{attrs:{totalRecords:t.counter},on:{onChange:t.callServer}})],1)])])]),a("vue-js-modal",{attrs:{name:"addNew"}},[a("div",{staticClass:"column flex-center p-2"},[a("form",{on:{submit:function(e){return e.preventDefault(),t.saveUser.apply(null,arguments)}}},[a("div",{staticClass:"row m-2"},[a("al-input",{attrs:{label:t.$t("users.username"),required:""},model:{value:t.currentUser.username,callback:function(e){t.$set(t.currentUser,"username",e)},expression:"currentUser.username"}})],1),a("div",{staticClass:"row m-2"},[a("al-input",{attrs:{label:t.$t("users.password"),type:"password",required:""},model:{value:t.currentUser.password,callback:function(e){t.$set(t.currentUser,"password",e)},expression:"currentUser.password"}})],1),a("div",{staticClass:"row m-2"},[a("label",{staticClass:"text-center"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.currentUser.readonly,expression:"currentUser.readonly"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.currentUser.readonly)?t._i(t.currentUser.readonly,null)>-1:t.currentUser.readonly},on:{change:function(e){var a=t.currentUser.readonly,s=e.target,n=!!s.checked;if(Array.isArray(a)){var r=null,i=t._i(a,r);s.checked?i<0&&t.$set(t.currentUser,"readonly",a.concat([r])):i>-1&&t.$set(t.currentUser,"readonly",a.slice(0,i).concat(a.slice(i+1)))}else t.$set(t.currentUser,"readonly",n)}}}),t._v(" "+t._s(t.$t("users.readonly"))+" ")])]),a("div",{staticClass:"flex m-2 flex-end"},[a("al-button",{attrs:{type:"button",variation:"link"},on:{click:t.onCloseModal}},[t._v(t._s(t.$t("general.cancel")))]),a("al-button",{attrs:{type:"submit",variation:"primary"}},[t._v(t._s(t.$t("general.save")))])],1)])])])],1)},n=[],r=a("1da1"),i=a("d4ec"),c=a("bee2"),o=a("262e"),l=a("2caf"),u=(a("96cf"),a("9ab4")),d=a("1b40"),p=a("55db"),h=a("78bc"),v=a("458c"),b=a("a826"),g=a("1d1c"),f=function(t){Object(o["a"])(a,t);var e=Object(l["a"])(a);function a(){var t;return Object(i["a"])(this,a),t=e.apply(this,arguments),t.service=new b["a"],t.pagination={start:0},t.rows=[],t.counter=0,t.currentUser={},t}return Object(c["a"])(a,[{key:"callServer",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var a,s,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.pagination=e,t.next=3,this.service.findAll(e);case 3:a=t.sent,s=a.data,n=a.count,this.rows=s,this.counter=n;case 8:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"addNew",value:function(){this.$modal.show("addNew")}},{key:"saveUser",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.service.create(this.currentUser);case 3:Object(g["b"])(),this.onCloseModal(),this.callServer(this.pagination),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),Object(g["a"])(t.t0);case 11:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"onCloseModal",value:function(){this.$modal.hide("addNew")}}]),a}(d["d"]);f=Object(u["a"])([Object(d["a"])({components:{Paginate:p["a"],AlButton:h["a"],AlInput:v["a"]}})],f);var m=f,_=m,y=(a("880b"),a("2877")),w=Object(y["a"])(_,s,n,!1,null,null,null);e["default"]=w.exports},"55db":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination"},[a("div",{staticClass:"pagination-info"},[t._v(" "+t._s(t.$t("pagination.showing"))+" "+t._s(t.from)+" "+t._s(t.$t("pagination.until"))+" "+t._s(t.of)+" "+t._s(t.$t("pagination.from"))+" "+t._s(t.totalRecords)+" ")]),a("div",{staticClass:"pagination-actions"},[a("Button",{attrs:{variation:t.EVariation.LINK,disabled:t.pagination.start<t.step,title:t.$t("pagination.first")},on:{click:function(e){return t.paginate(0)}}},[a("em",{staticClass:"gg-chevron-double-left"})]),a("Button",{staticClass:"btn btn-link",attrs:{variation:t.EVariation.LINK,disabled:t.pagination.start<t.step,title:t.$t("pagination.previous")},on:{click:function(e){return t.paginate(2)}}},[a("em",{staticClass:"gg-chevron-left"})]),a("Button",{staticClass:"btn btn-link",attrs:{variation:t.EVariation.LINK,disabled:t.totalRecords<=t.step+t.pagination.start,title:t.$t("pagination.next")},on:{click:function(e){return t.paginate(1)}}},[a("em",{staticClass:"gg-chevron-right"})]),a("Button",{staticClass:"btn btn-link",attrs:{variation:t.EVariation.LINK,disabled:t.totalRecords<=t.step+t.pagination.start,title:t.$t("pagination.last")},on:{click:function(e){return t.paginate(3)}}},[a("em",{staticClass:"gg-chevron-double-right"})])],1)])},n=[],r=a("d4ec"),i=a("bee2"),c=a("262e"),o=a("2caf"),l=a("9ab4"),u=a("1b40"),d=a("78bc"),p=a("1563"),h=function(t){Object(c["a"])(a,t);var e=Object(o["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.pagination={start:0,step:t.step,sort:{}},t.EVariation=p["a"],t}return Object(i["a"])(a,[{key:"created",value:function(){this.pagination.step=this.step,this.callSearch()}},{key:"from",get:function(){return this.totalRecords>0?(this.pagination.start||0)+1:0}},{key:"of",get:function(){return this.pagination.start+this.step>this.totalRecords?this.totalRecords:this.pagination.start+this.step}},{key:"callSearch",value:function(){return this.pagination}},{key:"paginate",value:function(t){switch(t){case 1:if(this.pagination.start+this.step>this.totalRecords)return;this.pagination.start+=this.step;break;case 2:if(this.pagination.start<=0)return;this.pagination.start-=this.step;break;case 3:this.pagination.start=Math.ceil(this.totalRecords/this.step)*this.step,this.pagination.start>=this.totalRecords&&(this.pagination.start-=this.step);break;default:this.pagination.start=0}this.callSearch()}}]),a}(u["d"]);Object(l["a"])([Object(u["c"])({default:10})],h.prototype,"step",void 0),Object(l["a"])([Object(u["c"])({default:0,required:!0})],h.prototype,"totalRecords",void 0),Object(l["a"])([Object(u["b"])("onChange")],h.prototype,"callSearch",null),h=Object(l["a"])([Object(u["a"])({components:{Button:d["a"]}})],h);var v=h,b=v,g=(a("d622"),a("2877")),f=Object(g["a"])(b,s,n,!1,null,"13a43c00",null);e["a"]=f.exports},"880b":function(t,e,a){"use strict";a("9ec5")},"9c59":function(t,e,a){},"9ec5":function(t,e,a){},d622:function(t,e,a){"use strict";a("9c59")}}]);
//# sourceMappingURL=chunk-b5de7f60.545511c8.js.map