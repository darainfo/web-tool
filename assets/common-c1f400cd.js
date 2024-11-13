function u(e){navigator.clipboard.writeText(e)}function l(e){return e.split(`
`).map(t=>t.trim().toLowerCase().split(/[\s-_]+/).map((n,r)=>r===0?n.toLowerCase():n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()).join("")).join(`
`)}function f(e){return e.split(`
`).map(t=>t.toLowerCase().split(/\s+/).map(n=>n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()).join("")).join(`
`)}function C(e){return e.split(`
`).map(t=>t.toLowerCase().split(/\s+/gm).map(n=>n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()).join(" ")).join(`
`)}function m(e){return e&&e.split(/([.!?])/).map((n,r)=>r%2===0?n.toLowerCase().replace(/(\s*)(\w)/,(a,i,s)=>i+s.toUpperCase()):n).join("").trim()}function g(e){if(!e)return e;const t=["a","an","and","are","as","at","but","by","for","if","in","nor","of","on","or","so","the","to","up","yet"];return e.split(/([.!?])/).map((r,a)=>a%2===0?r.split(" ").map((i,s)=>s===0?i.replace(/(\s*)(\w)/,(p,o,c)=>o+c.toUpperCase()):t.includes(i.toLowerCase())?i.toLowerCase():i.charAt(0).toUpperCase()+i.slice(1).toLowerCase()).join(" "):r).join("").trim()}function h(e){return e&&e.split(`
`).map(t=>t.trim().toLowerCase().replace(/\s+/g,"_").replace(/[^\w_]/g,"")).join(`
`)}function j(e){if(!e)return{byte:0,length:0};let t=0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<=127?t+=1:r<=2047?t+=2:r<=65535?t+=3:r<=1114111&&(t+=4)}return{byte:t,length:e.length}}function L(e){return/(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp|\.svg)$/i.test(e)}function w(e,t){const n=t*1024*1024;return e.size<=n}export{C as a,m as b,g as c,h as d,f as e,w as f,j as g,u as h,L as i,l as t};
