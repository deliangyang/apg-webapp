webpackJsonp([11],{"/sfY":function(t,n,e){"use strict";n.a={created:function(){},methods:{login:function(){var t=this;this.$axios.post("/api/wx/h5/login").then(function(n){t.$localStorage.set("Authorization",n.data.accessToken)})}},mounted:function(){var t=this;this.$nextTick(function(n){t.login()})}}},"46Kr":function(t,n,e){var i=e("WWsQ");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("rjj0").default;o("c0ae3eb6",i,!0,{})},"4UI3":function(t,n,e){"use strict";function i(t){e("46Kr")}Object.defineProperty(n,"__esModule",{value:!0});var o=e("/sfY"),s=e("RKii"),c=e("XyMi"),r=i,u=Object(c.a)(o.a,s.a,s.b,!1,r,null,null);n.default=u.exports},RKii:function(t,n,e){"use strict";e.d(n,"a",function(){return i}),e.d(n,"b",function(){return o});var i=function(){var t=this,n=t.$createElement;return(t._self._c||n)("div")},o=[]},WWsQ:function(t,n,e){n=t.exports=e("FZ+f")(!0),n.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"login.vue",sourceRoot:""}])}});
//# sourceMappingURL=11.2e069ac3e227e53b7c9d.js.map