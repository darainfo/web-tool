import{T as L}from"./TextCopyButton-d2662be1.js";import{_ as j,c as U,b as u,t as S,e as T,m as q,F as H,r as K,v as C,d as O,a as W,o as v}from"./index-98e75738.js";import"./common-c1f400cd.js";const X=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;function J(n){return typeof n=="string"&&X.test(n)}function D(n){if(!J(n))throw TypeError("Invalid UUID");let e;return Uint8Array.of((e=parseInt(n.slice(0,8),16))>>>24,e>>>16&255,e>>>8&255,e&255,(e=parseInt(n.slice(9,13),16))>>>8,e&255,(e=parseInt(n.slice(14,18),16))>>>8,e&255,(e=parseInt(n.slice(19,23),16))>>>8,e&255,(e=parseInt(n.slice(24,36),16))/1099511627776&255,e/4294967296&255,e>>>24&255,e>>>16&255,e>>>8&255,e&255)}const a=[];for(let n=0;n<256;++n)a.push((n+256).toString(16).slice(1));function s(n,e=0){return(a[n[e+0]]+a[n[e+1]]+a[n[e+2]]+a[n[e+3]]+"-"+a[n[e+4]]+a[n[e+5]]+"-"+a[n[e+6]]+a[n[e+7]]+"-"+a[n[e+8]]+a[n[e+9]]+"-"+a[n[e+10]]+a[n[e+11]]+a[n[e+12]]+a[n[e+13]]+a[n[e+14]]+a[n[e+15]]).toLowerCase()}let w;const P=new Uint8Array(16);function h(){if(!w){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");w=crypto.getRandomValues.bind(crypto)}return w(P)}const m={};function F(n,e,r){var o;let t;const c=(n==null?void 0:n._v6)??!1;if(n){const i=Object.keys(n);i.length===1&&i[0]==="_v6"&&(n=void 0)}if(n)t=k(n.random??((o=n.rng)==null?void 0:o.call(n))??h(),n.msecs,n.nsecs,n.clockseq,n.node,e,r);else{const i=Date.now(),l=h();Q(m,i,l),t=k(l,m.msecs,m.nsecs,c?void 0:m.clockseq,c?void 0:m.node,e,r)}return e?t:s(t)}function Q(n,e,r){return n.msecs??(n.msecs=-1/0),n.nsecs??(n.nsecs=0),e===n.msecs?(n.nsecs++,n.nsecs>=1e4&&(n.node=void 0,n.nsecs=0)):e>n.msecs?n.nsecs=0:e<n.msecs&&(n.node=void 0),n.node||(n.node=r.slice(10,16),n.node[0]|=1,n.clockseq=(r[8]<<8|r[9])&16383),n.msecs=e,n}function k(n,e,r,t,c,o,i=0){o||(o=new Uint8Array(16),i=0),e??(e=Date.now()),r??(r=0),t??(t=(n[8]<<8|n[9])&16383),c??(c=n.slice(10,16)),e+=122192928e5;const l=((e&268435455)*1e4+r)%4294967296;o[i++]=l>>>24&255,o[i++]=l>>>16&255,o[i++]=l>>>8&255,o[i++]=l&255;const f=e/4294967296*1e4&268435455;o[i++]=f>>>8&255,o[i++]=f&255,o[i++]=f>>>24&15|16,o[i++]=f>>>16&255,o[i++]=t>>>8|128,o[i++]=t&255;for(let d=0;d<6;++d)o[i++]=c[d];return o}function Y(n){const e=typeof n=="string"?D(n):n,r=Z(e);return typeof n=="string"?s(r):r}function Z(n){return Uint8Array.of((n[6]&15)<<4|n[7]>>4&15,(n[7]&15)<<4|(n[4]&240)>>4,(n[4]&15)<<4|(n[5]&240)>>4,(n[5]&15)<<4|(n[0]&240)>>4,(n[0]&15)<<4|(n[1]&240)>>4,(n[1]&15)<<4|(n[2]&240)>>4,96|n[2]&15,n[3],n[8],n[9],n[10],n[11],n[12],n[13],n[14],n[15])}function $(n){n=unescape(encodeURIComponent(n));const e=new Uint8Array(n.length);for(let r=0;r<n.length;++r)e[r]=n.charCodeAt(r);return e}const z="6ba7b810-9dad-11d1-80b4-00c04fd430c8",B="6ba7b811-9dad-11d1-80b4-00c04fd430c8";function b(n,e,r,t,c,o){const i=typeof r=="string"?$(r):r,l=typeof t=="string"?D(t):t;if(typeof t=="string"&&(t=D(t)),(t==null?void 0:t.length)!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let f=new Uint8Array(16+i.length);if(f.set(l),f.set(i,l.length),f=e(f),f[6]=f[6]&15|n,f[8]=f[8]&63|128,c){o=o||0;for(let d=0;d<16;++d)c[o+d]=f[d];return c}return s(f)}const n0=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),E={randomUUID:n0};function e0(n,e,r){if(E.randomUUID&&!e&&!n)return E.randomUUID();n=n||{};const t=n.random||(n.rng||h)();if(t[6]=t[6]&15|64,t[8]=t[8]&63|128,e){r=r||0;for(let c=0;c<16;++c)e[r+c]=t[c];return e}return s(t)}function r0(n,e,r,t){switch(n){case 0:return e&r^~e&t;case 1:return e^r^t;case 2:return e&r^e&t^r&t;case 3:return e^r^t}}function I(n,e){return n<<e|n>>>32-e}function t0(n){const e=[1518500249,1859775393,2400959708,3395469782],r=[1732584193,4023233417,2562383102,271733878,3285377520],t=new Uint8Array(n.length+1);t.set(n),t[n.length]=128,n=t;const c=n.length/4+2,o=Math.ceil(c/16),i=new Array(o);for(let l=0;l<o;++l){const f=new Uint32Array(16);for(let d=0;d<16;++d)f[d]=n[l*64+d*4]<<24|n[l*64+d*4+1]<<16|n[l*64+d*4+2]<<8|n[l*64+d*4+3];i[l]=f}i[o-1][14]=(n.length-1)*8/Math.pow(2,32),i[o-1][14]=Math.floor(i[o-1][14]),i[o-1][15]=(n.length-1)*8&4294967295;for(let l=0;l<o;++l){const f=new Uint32Array(80);for(let x=0;x<16;++x)f[x]=i[l][x];for(let x=16;x<80;++x)f[x]=I(f[x-3]^f[x-8]^f[x-14]^f[x-16],1);let d=r[0],p=r[1],y=r[2],g=r[3],_=r[4];for(let x=0;x<80;++x){const R=Math.floor(x/20),G=I(d,5)+r0(R,p,y,g)+_+e[R]+f[x]>>>0;_=g,g=y,y=I(p,30)>>>0,p=d,d=G}r[0]=r[0]+d>>>0,r[1]=r[1]+p>>>0,r[2]=r[2]+y>>>0,r[3]=r[3]+g>>>0,r[4]=r[4]+_>>>0}return Uint8Array.of(r[0]>>24,r[0]>>16,r[0]>>8,r[0],r[1]>>24,r[1]>>16,r[1]>>8,r[1],r[2]>>24,r[2]>>16,r[2]>>8,r[2],r[3]>>24,r[3]>>16,r[3]>>8,r[3],r[4]>>24,r[4]>>16,r[4]>>8,r[4])}function V(n,e,r,t){return b(80,t0,n,e,r,t)}V.DNS=z;V.URL=B;function c0(n,e,r){n??(n={}),r??(r=0);let t=F({...n,_v6:!0},new Uint8Array(16));if(t=Y(t),e){for(let c=0;c<16;c++)e[r+c]=t[c];return e}return s(t)}const A={};function o0(n,e,r){var c;let t;if(n)t=M(n.random??((c=n.rng)==null?void 0:c.call(n))??h(),n.msecs,n.seq,e,r);else{const o=Date.now(),i=h();i0(A,o,i),t=M(i,A.msecs,A.seq,e,r)}return e?t:s(t)}function i0(n,e,r){return n.msecs??(n.msecs=-1/0),n.seq??(n.seq=0),e>n.msecs?(n.seq=r[6]<<23|r[7]<<16|r[8]<<8|r[9],n.msecs=e):(n.seq=n.seq+1|0,n.seq===0&&n.msecs++),n}function M(n,e,r,t,c=0){return t||(t=new Uint8Array(16),c=0),e??(e=Date.now()),r??(r=n[6]*127<<24|n[7]<<16|n[8]<<8|n[9]),t[c++]=e/1099511627776&255,t[c++]=e/4294967296&255,t[c++]=e/16777216&255,t[c++]=e/65536&255,t[c++]=e/256&255,t[c++]=e&255,t[c++]=112|r>>>28&15,t[c++]=r>>>20&255,t[c++]=128|r>>>14&63,t[c++]=r>>>6&255,t[c++]=r<<2&255|n[10]&3,t[c++]=n[11],t[c++]=n[12],t[c++]=n[13],t[c++]=n[14],t[c++]=n[15],t}const N=[{type:"v1",fn:F,name:"Timestamp"},{type:"v4",fn:e0,name:"Random"},{type:"v5",fn:V,name:"SHA-1"},{type:"v6",fn:c0,name:"Timestamp, reordered"},{type:"v7",fn:o0,name:"Unix Epoch time-based"}],l0={components:{TextCopyButton:L},data(){return{uuidType:"v4",count:1,resultText:"",allUuidItems:N}},methods:{uuidGen(){const n=this.uuidType,e=this.count,r=N.find(c=>c.type===n),t=[];for(let c=0;c<e;c++)t.push(r.fn());this.resultText=t.join(`
`)}}},f0={class:"page-heading"},d0={class:"page-title"},x0={class:"row"},u0={class:"col-12 col-md-6 order-md-1 order-last"},a0={class:"section"},s0={class:"card"},m0={class:"card-body"},h0={id:"mainForm"},p0={class:"row"},y0={class:"col-12"},g0=["value"],_0={class:"col-12 float-end mb-3",style:{"text-align":"center"}},U0={class:"mb-3"},T0={class:"float-end"};function v0(n,e,r,t,c,o){const i=W("TextCopyButton");return v(),U("div",f0,[u("div",d0,[u("div",x0,[u("div",u0,[u("h3",null,S(n.$t("menu.uuid_generate")),1)])])]),u("section",a0,[u("div",s0,[u("div",m0,[u("form",h0,[u("div",p0,[u("div",y0,[T(u("select",{"onUpdate:modelValue":e[0]||(e[0]=l=>c.uuidType=l),class:"form-control mb-3"},[(v(!0),U(H,null,K(c.allUuidItems,(l,f)=>(v(),U("option",{value:l.type,key:f},S(l.name),9,g0))),128))],512),[[q,c.uuidType]]),T(u("input",{class:"form-control mb-3","onUpdate:modelValue":e[1]||(e[1]=l=>c.count=l),type:"number"},null,512),[[C,c.count]]),u("div",_0,[u("button",{type:"button",class:"btn btn-light-secondary btn-sm",onClick:e[2]||(e[2]=l=>o.uuidGen())},"Generate")]),u("div",U0,[T(u("textarea",{class:"form-control",rows:"9","onUpdate:modelValue":e[3]||(e[3]=l=>c.resultText=l)},null,512),[[C,c.resultText]])]),u("div",T0,[O(i,{copyField:c.resultText},null,8,["copyField"])])])])])])])])])}const D0=j(l0,[["render",v0]]);export{D0 as default};