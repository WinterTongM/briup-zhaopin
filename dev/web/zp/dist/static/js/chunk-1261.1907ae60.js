(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1261"],{"3CXi":function(t,e,a){"use strict";var n=a("MuEG");a.n(n).a},MuEG:function(t,e,a){},euOj:function(t,e,a){"use strict";a.r(e);var n=a("cLjf"),i=a.n(n),r=a("hDQ3"),c=a.n(r),s=a("xZEO"),l={name:"cityManage",data:function(){return{cityData:[]}},created:function(){this.findCityData()},methods:{findCityData:function(t){var e=this;return c()(i.a.mark(function t(){var a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(s.a)();case 3:a=t.sent,e.cityData=a.data,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.$notify.error({title:"错误",message:"查找失败"});case 10:case"end":return t.stop()}},t,e,[[0,7]])}))()}}},o=(a("3CXi"),a("ZrdR")),u=Object(o.a)(l,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"cityManage"}},[e("div",{staticClass:"totalTitle"},[this._v("测试页面")]),this._v(" "),e("div",{staticClass:"cityManage-table"},[e("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",size:"mini",data:this.cityData,"tooltip-effect":"dark"}},[e("el-table-column",{attrs:{align:"center",prop:"id",label:"编号"}}),this._v(" "),e("el-table-column",{attrs:{align:"center",prop:"name",label:"名称"}}),this._v(" "),e("el-table-column",{attrs:{align:"center",prop:"provinceId",label:"省份ID"}})],1)],1)])},[],!1,null,"5ee8f9ed",null);u.options.__file="index.vue";e.default=u.exports}}]);