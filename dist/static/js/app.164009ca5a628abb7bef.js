webpackJsonp([1],{"3Qoz":function(t,e,s){"use strict";var n=s("kQz6"),a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"edu_exp"},[s("h3",{staticClass:"hr"},[t._v("教育经历")]),t._v(" "),s("div",{staticClass:"school"},[t.schoolName?s("span",{on:{click:function(e){t.schoolName=""}}},[t._v(t._s(t.schoolName))]):s("input",{staticClass:"list_box",attrs:{type:"text",placeholder:"毕业院校..."},on:{blur:function(e){t.schoolName=e.target.value}}}),t._v(" "),t.courseInfo?s("span",{on:{click:function(e){t.courseInfo=""}}},[t._v(t._s(t.courseInfo))]):s("input",{staticClass:"list_box",attrs:{type:"text",placeholder:"专业名称--本科/专科..."},on:{blur:function(e){t.courseInfo=e.target.value}}}),t._v(" "),t.studyTime?s("span",{on:{click:function(e){t.studyTime=""}}},[t._v(t._s(t.studyTime))]):s("input",{staticClass:"list_box",attrs:{type:"text",placeholder:"起始年月-毕业年月..."},on:{blur:function(e){t.studyTime=e.target.value}}})])])},staticRenderFns:[]};var i=function(t){s("fuzw")},o=s("VU/8")(n.a,a,!1,i,"data-v-9e613188",null);e.a=o.exports},"3mZL":function(t,e,s){"use strict";var n=s("Lbfe"),a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"skills"},[s("h3",{staticClass:"hr"},[t._v("专业技能")]),t._v(" "),s("ul",{staticClass:"skills_lists"},[t._l(t.skillInfo,function(e,n){return s("li",{key:n},[s("h4",{staticClass:"name"},[t._v(t._s(e.skillName)+":")]),t._v(" "),s("p",{staticClass:"describe"},[t._v(t._s(e.content)+" "),s("input",{attrs:{id:n,type:"button",value:"删除"},on:{click:function(e){return t.deleteOne(e)}}})])])}),t._v(" "),t.newAdd?s("li",{class:[t.hiddenAll?t.hiddenClass:""]},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.skillName,expression:"skillName"}],staticClass:"title-style",attrs:{placeholder:"技能名称..."},domProps:{value:t.skillName},on:{input:function(e){e.target.composing||(t.skillName=e.target.value)}}}),t._v(":\n            "),s("div",{staticClass:"content-style",attrs:{contenteditable:"plaintext-only",autocomplete:"off"}}),t._v(" "),s("button",{staticClass:"submit-content",on:{click:function(e){return t.contentDetection()}}},[t._v("提交")])]):t._e()],2),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.newAdd,expression:"!newAdd"}],staticClass:"add",class:[t.hiddenAll?t.hiddenClass:""]},[s("div",{on:{click:t.addOne}},[t._v("添加新技能")])])])},staticRenderFns:[]};var i=function(t){s("USN+")},o=s("VU/8")(n.a,a,!1,i,"data-v-b370bdde",null);e.a=o.exports},"53Pa":function(t,e){},"9nEO":function(t,e,s){"use strict";var n=s("r34j"),a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"self_evaluation"},[s("h3",{staticClass:"hr"},[t._v("自我评价")]),t._v(" "),s("section",{directives:[{name:"show",rawName:"v-show",value:t.selfEvaluation,expression:"selfEvaluation"}],staticClass:"content",on:{click:t.updataText}},[t._v("\n        "+t._s(t.selfEvaluation)+"\n    ")]),t._v(" "),t.selfEvaluation?t._e():s("div",[s("div",{staticClass:"edit-box",attrs:{contenteditable:"true"}}),t._v(" "),s("button",{staticClass:"submit-text",on:{click:function(e){return t.submitText()}}},[t._v("提交")])])])},staticRenderFns:[]};var i=function(t){s("Kqv0")},o=s("VU/8")(n.a,a,!1,i,null,null);e.a=o.exports},JKNk:function(t,e,s){"use strict";(function(t){var n=s("woOf"),a=s.n(n);e.a={data:function(){return{company:"",workYear:"",job:"",address:"",lists:[{list:""}],workContent:[],workInfo:[],isAdd:!0,hiddenAll:!1,hiddenClass:"hidden",subscribe:null}},methods:{addOneList:function(){this.lists[this.lists.length-1].list&&this.lists.push({list:""})},addOneExp:function(){this.isAdd=!0},submitOne:function(){var t={company:this.company,workYear:this.workYear,job:this.job,address:this.address,workContent:a()(this.workContent,this.lists)};this.workInfo.push(a()({},t)),this.clearData(),this.isAdd=!1},clearData:function(){this.company="",this.workYear="",this.job="",this.address="",this.lists=[{list:""}],this.workContent=[]}},created:function(){var t=window.localStorage.getItem("resume");t&&(this.workInfo=JSON.parse(t).work,this.isAdd=!1)},mounted:function(){var e=this;this.subscribe=t.subscribe("save",function(s,n){t.publish("submitData",{work:a()([],e.workInfo)})}),t.subscribe("hidden",function(){e.hiddenAll=!0})},beforeDestroy:function(){t.unsubscribe(this.subscribe)}}}).call(e,s("x9pK"))},Kqv0:function(t,e){},Lbfe:function(t,e,s){"use strict";(function(t){var n=s("woOf"),a=s.n(n);e.a={data:function(){return{hiddenAll:!1,hiddenClass:"hidden",newAdd:!0,skillName:"",content:"",skillInfo:[],subscribe:null}},methods:{addOne:function(){this.newAdd?alert("已存在未编辑的输入框，不能添加！"):this.newAdd=!0},contentDetection:function(t){var e=document.querySelector(".content-style").textContent;this.content=e,""!==this.skillName&&""!==this.content?(this.skillInfo.push({skillName:this.skillName,content:this.content}),this.newAdd=!1):alert("请输入完整的技能名称和内容后再提交！")},deleteOne:function(t){this.skillInfo.splice(t.target.id,1)}},created:function(){var t=window.localStorage.getItem("resume");t&&(this.skillInfo=JSON.parse(t).skills,this.newAdd=!1)},mounted:function(){var e=this;this.subscribe=t.subscribe("save",function(s,n){t.publish("submitData",{skills:a()([],e.skillInfo)})}),t.subscribe("hidden",function(t,s){e.hiddenAll=!0})},beforeDestroy:function(){t.unsubscribe(this.subscribe)}}}).call(e,s("x9pK"))},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),a=s("xJD8"),i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("header",{staticClass:"personal_info clearfix"},[s("div",{staticClass:"info"},[s("h1",{directives:[{name:"show",rawName:"v-show",value:t.name,expression:"name"}],on:{click:function(e){t.name=""}}},[t._v(t._s(t.name))]),t._v(" "),s("input",{directives:[{name:"show",rawName:"v-show",value:!t.name,expression:"!name"}],staticClass:"list_box",attrs:{type:"text",placeholder:"姓名..."},on:{blur:function(e){t.name=e.target.value}}}),t._v(" "),s("div",[s("span",{directives:[{name:"show",rawName:"v-show",value:t.age,expression:"age"}],on:{click:function(e){t.age=null}}},[t._v(t._s(t.age))]),t._v(" "),s("input",{directives:[{name:"show",rawName:"v-show",value:!t.age,expression:"!age"}],staticClass:"list_box",staticStyle:{width:"5vw"},attrs:{type:"text",placeholder:"年龄..."},on:{blur:function(e){t.age=e.target.value}}}),t._v("岁\n              "),s("span",[t._v("|")]),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.workYear,expression:"workYear"}],on:{click:function(e){t.workYear=NaN}}},[t._v("工作年限："+t._s(t.workYear))]),t._v(" "),s("input",{directives:[{name:"show",rawName:"v-show",value:!t.workYear,expression:"!workYear"}],staticClass:"list_box",staticStyle:{width:"10vw"},attrs:{type:"text",placeholder:"工作年限..."},on:{blur:function(e){t.workYear=e.target.value}}}),t._v("年\n              "),s("span",[t._v("|")]),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.myHome,expression:"myHome"}],on:{click:function(e){t.myHome=""}}},[t._v("现居："+t._s(t.myHome))]),t._v(" "),s("input",{directives:[{name:"show",rawName:"v-show",value:!t.myHome,expression:"!myHome"}],staticClass:"list_box",staticStyle:{width:"10vw"},attrs:{type:"text",placeholder:"现居地..."},on:{blur:function(e){t.myHome=e.target.value}}}),t._v(" "),s("br"),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.jobPost,expression:"jobPost"}],on:{click:function(e){t.jobPost=""}}},[t._v("求职岗位:"+t._s(t.jobPost))]),t._v(" "),s("input",{directives:[{name:"show",rawName:"v-show",value:!t.jobPost,expression:"!jobPost"}],staticClass:"list_box",attrs:{type:"text",placeholder:" 应聘职位..."},on:{blur:function(e){t.jobPost=e.target.value}}})]),t._v(" "),s("div",[s("span",{directives:[{name:"show",rawName:"v-show",value:t.phoneNum,expression:"phoneNum"}],on:{click:function(e){t.phoneNum=NaN}}},[t._v("联系电话："+t._s(t.phoneNum))]),t._v(" "),s("input",{directives:[{name:"show",rawName:"v-show",value:!t.phoneNum,expression:"!phoneNum"}],staticClass:"list_box",attrs:{type:"text",placeholder:"联系电话..."},on:{blur:function(e){t.phoneNum=e.target.value}}}),t._v(" "),s("br"),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.email,expression:"email"}],on:{click:function(e){t.email=""}}},[t._v("邮箱："+t._s(t.email))]),t._v(" "),s("input",{directives:[{name:"show",rawName:"v-show",value:!t.email,expression:"!email"}],staticClass:"list_box",attrs:{type:"text",placeholder:"邮箱..."},on:{blur:function(e){t.email=e.target.value}}})])]),t._v(" "),s("div",{class:[t.imgSrc?"":"dashed_border","head_pic"],on:{click:function(e){t.imgSrc=""}}},[s("img",{directives:[{name:"show",rawName:"v-show",value:t.imgSrc,expression:"imgSrc"}],attrs:{src:t.imgSrc,alt:"头像"}}),t._v(" "),s("input",{attrs:{type:"file"},on:{change:t.headPic}})])]),t._v(" "),s("main",[t._l(t.componentArr,function(t,e){return s(t.component,{key:e,tag:"div"})}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.isComplete,expression:"!isComplete"}],class:t.border1px,staticStyle:{"margin-bottom":"20px"}},[s("select",{attrs:{id:"theme"},on:{change:function(e){t.getOptionValue(e)}}},[s("option",{attrs:{value:"",selected:""}},[t._v("未选择")]),t._v(" "),s("option",{attrs:{value:"edu_exp"}},[t._v("教育经历")]),t._v(" "),s("option",{attrs:{value:"skills"}},[t._v("专业技能")]),t._v(" "),s("option",{attrs:{value:"work_exp"}},[t._v("工作经验")]),t._v(" "),s("option",{attrs:{value:"project_exp"}},[t._v("项目经验")]),t._v(" "),s("option",{attrs:{value:"self_evaluation"}},[t._v("自我评价")])]),t._v(" "),s("button",{on:{click:t.addOne}},[t._v("添加")]),t._v(" "),s("button",{on:{click:t.addAll}},[t._v("添加全部")]),t._v(" "),s("button",{on:{click:t.deleteOne}},[t._v("删除")]),t._v(" "),s("button",{on:{click:t.deleteAll}},[t._v("删除全部")]),t._v(" "),s("button",{on:{click:t.hiddenAll}},[t._v("隐藏全部按钮")]),t._v(" "),s("button",{on:{click:t.saveData}},[t._v("保存页面数据")]),t._v(" "),s("button",{on:{click:t.clearStorage}},[t._v("清除已存数据")])])],2)])},staticRenderFns:[]};var o=function(t){s("dmUo")},r=s("VU/8")(a.a,i,!1,o,null,null).exports,l=s("/ocq"),c=s("3Qoz"),u=s("ZYV8"),d=s("dfVD"),v=s("3mZL"),p=s("9nEO");n.a.use(l.a);var m=new l.a({routes:[{path:"/edu_exp",component:c.a},{path:"/work_exp",component:u.a},{path:"/project_exp",component:d.a},{path:"/skills",component:v.a},{path:"/self_evaluation",component:p.a}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:m,components:{App:r},template:"<App/>"})},"USN+":function(t,e){},ZYV8:function(t,e,s){"use strict";var n=s("JKNk"),a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"work_exp"},[s("h3",{staticClass:"hr"},[t._v("工作经历")]),t._v(" "),t.workInfo?s("div",t._l(t.workInfo,function(e,n){return s("div",{key:n,staticClass:"work"},[s("div",{staticClass:"company_info clearfix"},[s("h4",[t._v(t._s(e.company))]),t._v(" "),s("span",[t._v(t._s(e.workYear))])]),t._v(" "),s("div",{staticClass:"company_info clearfix"},[s("span",[t._v("岗位："+t._s(e.job))]),t._v(" "),s("span",[t._v("地点："+t._s(e.address))])]),t._v(" "),s("ul",{staticClass:"work_content"},t._l(e.workContent,function(e,n){return s("li",{key:n},[s("p",[t._v(t._s(e.list))])])}),0)])}),0):t._e(),t._v(" "),t.isAdd?s("div",{class:[t.hiddenAll?t.hiddenClass:"","dashed_border"]},[s("div",{staticClass:"work"},[s("div",{staticClass:"company_info clearfix"},[s("h4",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.company,expression:"company"}],staticClass:"list_box",attrs:{type:"text",placeholder:"公司名称..."},domProps:{value:t.company},on:{input:function(e){e.target.composing||(t.company=e.target.value)}}})]),t._v(" "),s("span",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.workYear,expression:"workYear"}],staticClass:"list_box",attrs:{type:"text",placeholder:"入职时间-离职时间..."},domProps:{value:t.workYear},on:{input:function(e){e.target.composing||(t.workYear=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"company_info clearfix"},[s("span",[t._v("岗位："),s("input",{directives:[{name:"model",rawName:"v-model",value:t.job,expression:"job"}],staticClass:"list_box",attrs:{type:"text"},domProps:{value:t.job},on:{input:function(e){e.target.composing||(t.job=e.target.value)}}})]),t._v(" "),s("span",[t._v("地点："),s("input",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],staticClass:"list_box",attrs:{type:"text"},domProps:{value:t.address},on:{input:function(e){e.target.composing||(t.address=e.target.value)}}})])]),t._v(" "),s("ul",{staticClass:"work_content"},[t._l(t.lists,function(e,n){return s("li",{key:n},[s("p",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.list,expression:"obj.list"}],staticClass:"content_box",attrs:{type:"text",placeholder:"职责..."},domProps:{value:e.list},on:{input:function(s){s.target.composing||t.$set(e,"list",s.target.value)}}})])])}),t._v(" "),s("button",{staticClass:"add_items",on:{click:function(e){return t.addOneList()}}},[t._v("添加一条职责")]),t._v(" "),s("button",{staticStyle:{"margin-left":"72%"},on:{click:function(e){return t.submitOne()}}},[t._v("提交本条经历")])],2)])]):t._e(),t._v(" "),s("button",{directives:[{name:"show",rawName:"v-show",value:!t.isAdd,expression:"!isAdd"}],class:[t.hiddenAll?t.hiddenClass:"","add_exp"],on:{click:function(e){return t.addOneExp()}}},[t._v("添加一条经历")])])},staticRenderFns:[]};var i=function(t){s("53Pa")},o=s("VU/8")(n.a,a,!1,i,null,null);e.a=o.exports},c1Ll:function(t,e){},cdHo:function(t,e,s){"use strict";(function(t){var n=s("woOf"),a=s.n(n);e.a={data:function(){return{isAdd:!0,proName:"",proDescribe:"",myDuty:"",inputOther:[],projectInfo:[],hiddenAll:!1,hiddenClass:"hidden",subscribe:null}},methods:{addDescribe:function(){this.inputOther.push({title:null,content:null})},submitProject:function(){var t={proName:this.proName,proDescribe:this.proDescribe,myDuty:this.myDuty,other:a()([],this.inputOther)};this.projectInfo.push(a()({},t)),this.clearData(),this.isAdd=!1},clearData:function(){this.proName="",this.proDescribe="",this.myDuty="",this.inputOther=[]},addProject:function(){this.isAdd=!0}},created:function(){var t=window.localStorage.getItem("resume");t&&(this.projectInfo=JSON.parse(t).project,this.isAdd=!1)},mounted:function(){var e=this;this.subscribe=t.subscribe("save",function(s,n){t.publish("submitData",{project:a()([],e.projectInfo)})}),t.subscribe("hidden",function(){e.hiddenAll=!0})},beforeDestroy:function(){t.unsubscribe(this.subscribe)}}}).call(e,s("x9pK"))},dfVD:function(t,e,s){"use strict";var n=s("cdHo"),a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"project_exp"},[s("h3",{staticClass:"hr"},[t._v("项目经验")]),t._v(" "),t.projectInfo?s("div",t._l(t.projectInfo,function(e,n){return s("ul",{key:n,staticClass:"row"},[s("h4",[t._v(t._s(e.proName))]),s("button",[t._v("修改")]),t._v(" "),s("li",[s("span",[t._v("项目描述：")]),s("br"),t._v(" "),s("section",{staticStyle:{"white-space":"pre"}},[t._v(t._s(e.proDescribe))])]),t._v(" "),s("li",[s("span",[t._v("主要负责：")]),s("br"),t._v(" "),s("section",{staticStyle:{"white-space":"pre"}},[t._v(t._s(e.myDuty))])]),t._v(" "),t._l(e.other,function(e,n){return s("li",{key:n},[s("span",[t._v(t._s(e.title))]),s("br"),t._v(" "),s("section",{staticStyle:{"white-space":"pre"}},[t._v(t._s(e.content))])])})],2)}),0):t._e(),t._v(" "),t.isAdd?s("ul",{class:[t.hiddenAll?t.hiddenClass:"","row","dashed_border","edit_box"]},[s("h4",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.proName,expression:"proName"}],staticClass:"list_box",attrs:{type:"text",placeholder:"项目名称..."},domProps:{value:t.proName},on:{input:function(e){e.target.composing||(t.proName=e.target.value)}}})]),t._v(" "),s("li",[s("span",[t._v("项目描述：")]),t._v(" "),s("section",[s("textarea",{staticClass:"content-style style_supply",on:{input:function(e){t.proDescribe=e.target.value}}})])]),t._v(" "),s("li",[s("span",[t._v("主要负责：")]),t._v(" "),s("section",[s("textarea",{staticClass:"content-style style_supply",on:{input:function(e){t.myDuty=e.target.value}}})])]),t._v(" "),t._l(t.inputOther,function(e,n){return s("li",{key:n},[s("span",{staticClass:"other_item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.title,expression:"item.title"}],staticClass:"list_box",attrs:{type:"text"},domProps:{value:e.title},on:{input:function(s){s.target.composing||t.$set(e,"title",s.target.value)}}}),t._v(":\n            ")]),t._v(" "),s("section",[s("textarea",{staticClass:"content-style style_supply",on:{input:function(t){e.content=t.target.value}}})])])}),t._v(" "),s("button",{staticClass:"add_item",on:{click:function(e){return t.addDescribe()}}},[t._v("添加其他项")]),t._v(" "),s("button",{staticClass:"add_project",on:{click:function(e){return t.submitProject()}}},[t._v("提交本条经验")])],2):t._e(),t._v(" "),s("button",{directives:[{name:"show",rawName:"v-show",value:!t.isAdd,expression:"!isAdd"}],class:[t.hiddenAll?t.hiddenClass:""],on:{click:function(e){return t.addProject()}}},[t._v("添加项目经验")])])},staticRenderFns:[]};var i=function(t){s("c1Ll")},o=s("VU/8")(n.a,a,!1,i,null,null);e.a=o.exports},dmUo:function(t,e){},fuzw:function(t,e){},kQz6:function(t,e,s){"use strict";(function(t){var n=s("woOf"),a=s.n(n);e.a={data:function(){return{schoolName:"",courseInfo:"",studyTime:"",subscribe:null}},created:function(){var t=this,e=window.localStorage.getItem("resume");if(e){var s=JSON.parse(e).edu;["schoolName","courseInfo","studyTime"].map(function(e){t[e]=s[e]})}},mounted:function(){var e=this;this.subscribe=t.subscribe("save",function(s,n){var i={schoolName:e.schoolName,courseInfo:e.courseInfo,studyTime:e.studyTime};t.publish("submitData",{edu:a()({},i)})})},beforeDestroy:function(){t.unsubscribe(this.subscribe)}}}).call(e,s("x9pK"))},r34j:function(t,e,s){"use strict";(function(t){var n=s("woOf"),a=s.n(n);e.a={data:function(){return{selfEvaluation:"",subscribe:null}},methods:{submitText:function(){var t=document.querySelector(".edit-box").textContent;this.selfEvaluation=t},updataText:function(){this.selfEvaluation=""}},created:function(){var t=this,e=window.localStorage.getItem("resume");if(e){var s=JSON.parse(e).self;["selfEvaluation"].map(function(e){t[e]=s[e]})}},mounted:function(){var e=this;this.subscribe=t.subscribe("save",function(s,n){var i={selfEvaluation:e.selfEvaluation};t.publish("submitData",{self:a()({},i)})})},beforeDestroy:function(){t.unsubscribe(this.subscribe)}}}).call(e,s("x9pK"))},xJD8:function(t,e,s){"use strict";(function(t){var n=s("BO1k"),a=s.n(n),i=s("mvHQ"),o=s.n(i),r=s("woOf"),l=s.n(r),c=s("3Qoz"),u=s("ZYV8"),d=s("dfVD"),v=s("3mZL"),p=s("9nEO");e.a={data:function(){return{name:"",age:null,workYear:NaN,jobPost:"",phoneNum:NaN,email:"",myHome:"",imgSrc:"",hasIt:!1,componentName:null,componentIndex:null,componentArr:[],isComplete:!1,border1px:"border1px",resume:{}}},methods:{headPic:function(t){var e=this;if(!(!t.target.files.length>0))if(/\.(jpg|png|jpeg)$/.test(t.target.files[0].name)){var s=new FileReader;s.readAsDataURL(t.target.files[0]),s.onload=function(){e.imgSrc=s.result}}else alert("请选择图片文件")},hiddenAll:function(){t.publish("hidden"),this.isComplete=!0},clearStorage:function(){window.localStorage.getItem("resume")?(window.localStorage.removeItem("resume"),alert("数据已清除")):alert("没有找到要清除的数据")},saveData:function(){var e={name:this.name,age:this.age,workYear:this.workYear,jobPost:this.jobPost,phoneNum:this.phoneNum,email:this.email,myHome:this.myHome,imgSrc:this.imgSrc};this.resume={},this.resume={base:l()({},e)},this.setLocal(),t.publish("save"),console.log(this.resume)},setLocal:function(){window.localStorage.setItem("resume",o()(l()({},this.resume)))},getOptionValue:function(t){var e=t.target,s=t.target.selectedIndex,n=e[s].value;this.componentName=n,this.componentIndex=s},addAll:function(){var t=[c.a,v.a,u.a,d.a,p.a],e=[];this.componentArr.length>0&&this.componentArr.map(function(t){e.push(t.id)});for(var s=1;s<=t.length;s++)e.indexOf(s)>=0||this.componentArr.push({id:s,component:t[s-1]})},addOne:function(){if(this.componentName){var t=!0,e=!1,s=void 0;try{for(var n,i=a()(this.componentArr);!(t=(n=i.next()).done);t=!0){if(n.value.id===this.componentIndex){this.hasIt=!0;break}this.hasIt=!1}}catch(t){e=!0,s=t}finally{try{!t&&i.return&&i.return()}finally{if(e)throw s}}this.hasIt?alert("已有该标题！不能再添加"):this.chooseComponent(this.componentName,this.componentIndex)}else alert("没有选择标题！")},deleteAll:function(){this.componentArr=[]},deleteOne:function(){var t=this,e=this.componentArr.filter(function(e){return e.id!==t.componentIndex});this.componentArr=e},chooseComponent:function(t,e){var s=e,n=null;switch(t){case"edu_exp":n=c.a;break;case"skills":n=v.a;break;case"work_exp":n=u.a;break;case"project_exp":n=d.a;break;case"self_evaluation":n=p.a}this.componentArr.push({id:s,component:n})}},components:{edu:c.a,skills:v.a,work:u.a,project:d.a,self_evaluation:p.a},created:function(){var t=this,e=window.localStorage.getItem("resume");if(e){var s=JSON.parse(e).base;["name","age","workYear","jobPost","phoneNum","email","myHome","imgSrc"].map(function(e){t[e]=s[e]})}},mounted:function(){var e=this;t.subscribe("submitData",function(t,s){l()(e.resume,s),e.setLocal()})}}}).call(e,s("x9pK"))}},["NHnr"]);
//# sourceMappingURL=app.164009ca5a628abb7bef.js.map