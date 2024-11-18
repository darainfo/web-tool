import{t as b,a as C,b as u,c as m,d as i,e as g}from"./common-88d4cd8a.js";import{T as p}from"./TextCopyButton-f78313c7.js";import{_ as v,c as f,b as t,t as h,e as c,v as r,d as x,a as _,o as k}from"./index-ad63b318.js";const T={components:{TextCopyButton:p},data(){return{orginText:"",resultText:""}},methods:{caseChange(n){let e=this.orginText;e==""&&(e=this.$refs.orginText.placeholder);let o="";n=="lower"?o=e.toLowerCase():n=="upper"?o=e.toUpperCase():n=="camel"?o=b(e):n=="capitalize"?o=C(e):n=="sentence"?o=u(e):n=="title"?o=m(e):n=="snack"?o=i(e):n=="pascal"?o=g(e):n=="screaming_snake"?o=i(e).toUpperCase():n=="kebab"&&(o=i(e).replaceAll(/_/g,"-")),this.resultText=o}}},y={class:"page-heading"},w={class:"page-title"},S={class:"row"},B={class:"col-12 col-md-6 order-md-1 order-last"},E={class:"section"},A={class:"card"},P={class:"card-body"},U={id:"mainForm"},z={class:"row"},N={class:"col-sm mb-3"},V={class:"mb-3"},F={class:"btn-example"},D={class:"col-sm"},M={class:"mb-3",style:{padding:"15px",border:"1px solid #dddddd"}},R={class:"float-end"};function G(n,e,o,I,l,a){const d=_("TextCopyButton");return k(),f("div",y,[t("div",w,[t("div",S,[t("div",B,[t("h3",null,h(n.$t("menu.case_change")),1)])])]),t("section",E,[t("div",A,[t("div",P,[t("form",U,[t("div",z,[t("div",N,[t("div",V,[t("div",F,[t("button",{type:"button",class:"btn btn-light-secondary btn-sm",onClick:e[0]||(e[0]=s=>a.caseChange("lower"))},"lower case"),t("button",{type:"button",class:"btn btn-light-secondary btn-sm",onClick:e[1]||(e[1]=s=>a.caseChange("upper"))},"UPPER CASE"),t("button",{type:"button",class:"btn btn-light-secondary btn-sm",onClick:e[2]||(e[2]=s=>a.caseChange("camel"))},"camelCase"),t("button",{type:"button",class:"btn btn-light-secondary btn-sm",onClick:e[3]||(e[3]=s=>a.caseChange("pascal"))},"PascalCase"),t("button",{type:"button",class:"btn btn-light-secondary btn-sm",onClick:e[4]||(e[4]=s=>a.caseChange("screaming_snake"))},"SCREAMING_SNAKE_CASE"),t("button",{type:"button",class:"btn btn-light-secondary btn-sm",onClick:e[5]||(e[5]=s=>a.caseChange("snack"))},"snack_case"),t("button",{type:"button",class:"btn btn-light-secondary btn-sm",onClick:e[6]||(e[6]=s=>a.caseChange("kebab"))},"kebab-case"),t("button",{type:"button",class:"btn btn-light-secondary btn-sm",onClick:e[7]||(e[7]=s=>a.caseChange("capitalize"))},"Capitalize Case"),t("button",{type:"button",class:"btn btn-light-secondary btn-sm",onClick:e[8]||(e[8]=s=>a.caseChange("sentence"))},"Sentence case"),t("button",{type:"button",class:"btn btn-light-secondary btn-sm",onClick:e[9]||(e[9]=s=>a.caseChange("title"))},"Title Case")])]),c(t("textarea",{class:"form-control",rows:"9","onUpdate:modelValue":e[10]||(e[10]=s=>l.orginText=s),ref:"orginText",placeholder:"Text Case Convert"},null,512),[[r,l.orginText]])]),t("div",D,[t("div",M,[c(t("textarea",{class:"form-control",rows:"9","onUpdate:modelValue":e[11]||(e[11]=s=>l.resultText=s)},null,512),[[r,l.resultText]])]),t("div",R,[x(d,{copyField:l.resultText},null,8,["copyField"])])])])])])])])])}const $=v(T,[["render",G]]);export{$ as default};