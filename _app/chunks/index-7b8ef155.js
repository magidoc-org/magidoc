function G(){}function rt(t,e){for(const n in e)t[n]=e[n];return t}function Q(t){return t()}function R(){return Object.create(null)}function $(t){t.forEach(Q)}function lt(t){return typeof t=="function"}function At(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let A;function Tt(t,e){return A||(A=document.createElement("a")),A.href=e,t===A.href}function ot(t){return Object.keys(t).length===0}function at(t,...e){if(t==null)return G;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Nt(t,e,n){t.$$.on_destroy.push(at(e,n))}function St(t,e,n,i){if(t){const s=U(t,e,n,i);return t[0](s)}}function U(t,e,n,i){return t[1]&&i?rt(n.ctx.slice(),t[1](i(e))):n.ctx}function Mt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const o=[],c=Math.max(e.dirty.length,s.length);for(let l=0;l<c;l+=1)o[l]=e.dirty[l]|s[l];return o}return e.dirty|s}return e.dirty}function jt(t,e,n,i,s,o){if(s){const c=U(e,n,i,o);t.p(c,s)}}function Ct(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Ht(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Lt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function Pt(t){const e={};for(const n in t)e[n]=!0;return e}function qt(t){return t==null?"":t}let j=!1;function ut(){j=!0}function ft(){j=!1}function _t(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function dt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let a=0;a<e.length;a++){const f=e[a];f.claim_order!==void 0&&r.push(f)}e=r}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let r=0;r<e.length;r++){const a=e[r].claim_order,f=(s>0&&e[n[s]].claim_order<=a?s+1:_t(1,s,_=>e[n[_]].claim_order,a))-1;i[r]=n[f]+1;const d=f+1;n[d]=r,s=Math.max(d,s)}const o=[],c=[];let l=e.length-1;for(let r=n[s]+1;r!=0;r=i[r-1]){for(o.push(e[r-1]);l>=r;l--)c.push(e[l]);l--}for(;l>=0;l--)c.push(e[l]);o.reverse(),c.sort((r,a)=>r.claim_order-a.claim_order);for(let r=0,a=0;r<c.length;r++){for(;a<o.length&&c[r].claim_order>=o[a].claim_order;)a++;const f=a<o.length?o[a]:null;t.insertBefore(c[r],f)}}function ht(t,e){if(j){for(dt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function mt(t,e,n){t.insertBefore(e,n||null)}function pt(t,e,n){j&&!n?ht(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function M(t){t.parentNode.removeChild(t)}function Ot(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function V(t){return document.createElement(t)}function X(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function z(t){return document.createTextNode(t)}function Bt(){return z(" ")}function Dt(){return z("")}function Gt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function zt(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function Y(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ft(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:Y(t,i,e[i])}function It(t,e){for(const n in e)Y(t,n,e[n])}function yt(t){return Array.from(t.childNodes)}function Z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function tt(t,e,n,i,s=!1){Z(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const l=t[c];if(e(l)){const r=n(l);return r===void 0?t.splice(c,1):t[c]=r,s||(t.claim_info.last_index=c),l}}for(let c=t.claim_info.last_index-1;c>=0;c--){const l=t[c];if(e(l)){const r=n(l);return r===void 0?t.splice(c,1):t[c]=r,s?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function et(t,e,n,i){return tt(t,s=>s.nodeName===e,s=>{const o=[];for(let c=0;c<s.attributes.length;c++){const l=s.attributes[c];n[l.name]||o.push(l.name)}o.forEach(c=>s.removeAttribute(c))},()=>i(e))}function Rt(t,e,n){return et(t,e,n,V)}function Wt(t,e,n){return et(t,e,n,X)}function gt(t,e){return tt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>z(e),!0)}function Jt(t){return gt(t," ")}function W(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return t.length}function Kt(t,e){const n=W(t,"HTML_TAG_START",0),i=W(t,"HTML_TAG_END",n);if(n===i)return new J(void 0,e);Z(t);const s=t.splice(n,i-n+1);M(s[0]),M(s[s.length-1]);const o=s.slice(1,s.length-1);for(const c of o)c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new J(o,e)}function Qt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Ut(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Vt(t,e,n){t.classList[n?"add":"remove"](e)}function xt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function Xt(t,e=document.body){return Array.from(e.querySelectorAll(t))}class bt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=X(n.nodeName):this.e=V(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)mt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(M)}}class J extends bt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)pt(this.t,this.n[n],e)}}let w;function b(t){w=t}function v(){if(!w)throw new Error("Function called outside component initialization");return w}function Yt(t){v().$$.on_mount.push(t)}function Zt(t){v().$$.after_update.push(t)}function te(){const t=v();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const o=xt(e,n,{cancelable:i});return s.slice().forEach(c=>{c.call(t,o)}),!o.defaultPrevented}return!0}}function ee(t,e){return v().$$.context.set(t,e),e}function ne(t){return v().$$.context.get(t)}function ie(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const x=[],K=[],N=[],O=[],nt=Promise.resolve();let B=!1;function it(){B||(B=!0,nt.then(st))}function se(){return it(),nt}function D(t){N.push(t)}function ce(t){O.push(t)}const q=new Set;let T=0;function st(){const t=w;do{for(;T<x.length;){const e=x[T];T++,b(e),wt(e.$$)}for(b(null),x.length=0,T=0;K.length;)K.pop()();for(let e=0;e<N.length;e+=1){const n=N[e];q.has(n)||(q.add(n),n())}N.length=0}while(x.length);for(;O.length;)O.pop()();B=!1,q.clear(),b(t)}function wt(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(D)}}const S=new Set;let g;function re(){g={r:0,c:[],p:g}}function le(){g.r||$(g.c),g=g.p}function ct(t,e){t&&t.i&&(S.delete(t),t.i(e))}function $t(t,e,n,i){if(t&&t.o){if(S.has(t))return;S.add(t),g.c.push(()=>{S.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}}function oe(t,e){$t(t,1,1,()=>{e.delete(t.key)})}function ae(t,e,n,i,s,o,c,l,r,a,f,d){let _=t.length,m=o.length,h=_;const C={};for(;h--;)C[t[h].key]=h;const k=[],H=new Map,L=new Map;for(h=m;h--;){const u=d(s,o,h),p=n(u);let y=c.get(p);y?i&&y.p(u,e):(y=a(p,u),y.c()),H.set(p,k[h]=y),p in C&&L.set(p,Math.abs(h-C[p]))}const F=new Set,I=new Set;function P(u){ct(u,1),u.m(l,f),c.set(u.key,u),f=u.first,m--}for(;_&&m;){const u=k[m-1],p=t[_-1],y=u.key,E=p.key;u===p?(f=u.first,_--,m--):H.has(E)?!c.has(y)||F.has(y)?P(u):I.has(E)?_--:L.get(y)>L.get(E)?(I.add(y),P(u)):(F.add(E),_--):(r(p,c),_--)}for(;_--;){const u=t[_];H.has(u.key)||r(u,c)}for(;m;)P(k[m-1]);return k}function ue(t,e){const n={},i={},s={$$scope:1};let o=t.length;for(;o--;){const c=t[o],l=e[o];if(l){for(const r in c)r in l||(i[r]=1);for(const r in l)s[r]||(n[r]=l[r],s[r]=1);t[o]=l}else for(const r in c)s[r]=1}for(const c in i)c in n||(n[c]=void 0);return n}function fe(t){return typeof t=="object"&&t!==null?t:{}}function _e(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function de(t){t&&t.c()}function he(t,e){t&&t.l(e)}function vt(t,e,n,i){const{fragment:s,on_mount:o,on_destroy:c,after_update:l}=t.$$;s&&s.m(e,n),i||D(()=>{const r=o.map(Q).filter(lt);c?c.push(...r):$(r),t.$$.on_mount=[]}),l.forEach(D)}function kt(t,e){const n=t.$$;n.fragment!==null&&($(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Et(t,e){t.$$.dirty[0]===-1&&(x.push(t),it(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function me(t,e,n,i,s,o,c,l=[-1]){const r=w;b(t);const a=t.$$={fragment:null,ctx:null,props:o,update:G,not_equal:s,bound:R(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(r?r.$$.context:[])),callbacks:R(),dirty:l,skip_bound:!1,root:e.target||r.$$.root};c&&c(a.root);let f=!1;if(a.ctx=n?n(t,e.props||{},(d,_,...m)=>{const h=m.length?m[0]:_;return a.ctx&&s(a.ctx[d],a.ctx[d]=h)&&(!a.skip_bound&&a.bound[d]&&a.bound[d](h),f&&Et(t,d)),_}):[],a.update(),f=!0,$(a.before_update),a.fragment=i?i(a.ctx):!1,e.target){if(e.hydrate){ut();const d=yt(e.target);a.fragment&&a.fragment.l(d),d.forEach(M)}else a.fragment&&a.fragment.c();e.intro&&ct(t.$$.fragment),vt(t,e.target,e.anchor,e.customElement),ft(),st()}b(r)}class pe{$destroy(){kt(this,1),this.$destroy=G}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!ot(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{ne as $,fe as A,kt as B,rt as C,se as D,G as E,St as F,Ft as G,Vt as H,jt as I,Ct as J,Mt as K,Lt as L,Ht as M,X as N,Wt as O,ht as P,It as Q,Gt as R,pe as S,$ as T,ie as U,K as V,D as W,ce as X,Nt as Y,_e as Z,te as _,yt as a,ae as a0,oe as a1,Tt as a2,Pt as a3,Ot as a4,J as a5,Kt as a6,zt as a7,Xt as a8,qt as a9,Y as b,Rt as c,M as d,V as e,Ut as f,pt as g,gt as h,me as i,Qt as j,Bt as k,Dt as l,Jt as m,re as n,$t as o,le as p,ct as q,ee as r,At as s,z as t,Zt as u,Yt as v,de as w,he as x,vt as y,ue as z};
