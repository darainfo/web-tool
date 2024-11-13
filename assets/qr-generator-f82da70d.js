import{_ as r,l as c,c as m,b as e,t as i,m as v,o as u}from"./index-5d082404.js";const p={created(){},data(){return{qrTextSize:0,scriptLoaded:!1}},methods:{textSize(s){this.qrTextSize=s.target.value.length},convert(){this.scriptLoaded?this.createQRCode():c("/assets/static/js/plugins/qrcode.min.js").then(()=>{this.scriptLoaded=!0,this.createQRCode()}).catch(s=>{console.error("스크립트 로드 실패:",s)})},createQRCode(){let s=document.getElementById("qrText").value,t={errorCorrectionLevel:"M"};document.getElementById("size").value>0&&(t.width=document.getElementById("size").value),QRCode.toCanvas(document.getElementById("qrImageViewer"),s,t,function(o){o?console.error(o):console.log("QR code generated!")})},qrImgDownload(){const s=document.getElementById("qrImageViewer"),t=document.createElement("a");t.href=s.toDataURL("image/png"),t.download="canvas-image.png",t.click()}}},g={class:"page-heading"},_={class:"page-title"},h={class:"row"},b={class:"col-12 col-md-6 order-md-1 order-last"},f={class:"section"},x={class:"card"},q={class:"card-body"},w={id:"mainForm"},y={class:"row"},z={class:"col-sm mb-3"},C={class:"mb-3 col-sm-12"},I={class:"float-end"},S={class:"mb-1"},B={class:"col-sm"},E={class:"float-end"};function k(s,t,a,o,l,d){return u(),m("div",g,[e("div",_,[e("div",h,[e("div",b,[e("h3",null,i(s.$t("menu.qr_qenerator")),1),t[3]||(t[3]=e("p",{class:"text-subtitle text-muted"},"Qr Code",-1))])])]),e("section",f,[e("div",x,[e("div",q,[e("form",w,[e("div",y,[e("div",z,[t[4]||(t[4]=v('<div class="mb-3"><div class="col-sm row"><label for="staticEmail" class="col-sm-4 col-form-label">Size</label><div class="col-sm-8"><input type="number" id="size" class="form-control" value="0" step="128" max="1024"></div></div></div>',1)),e("textarea",{onInput:t[0]||(t[0]=n=>d.textSize(n)),class:"form-control",rows:"9",id:"qrText"},null,32),e("div",C,[e("div",I,[e("div",S,"Char length : "+i(l.qrTextSize),1),e("button",{onClick:t[1]||(t[1]=n=>d.convert()),type:"button",class:"btn btn-light-secondary float-end"},"Convert")])])]),e("div",B,[t[5]||(t[5]=e("div",{class:"mb-3",style:{padding:"15px",width:"100%","min-height":"203px",overflow:"auto",border:"1px solid #dddddd"}},[e("canvas",{id:"qrImageViewer"})],-1)),e("div",E,[e("button",{onClick:t[2]||(t[2]=n=>d.qrImgDownload()),type:"button",class:"btn btn btn-primary"},"download")])])])])])])])])}const R=r(p,[["render",k]]);export{R as default};
