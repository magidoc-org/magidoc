import{S as M,i as p,s as E,Q as h,t as R,R as f,a as _,h as A,d as u,g as z,T as C,j as B,C as g,b as k,U as m,z as x,E as c,O as v,P as b}from"./index-6be2ca5a.js";function w(a){let e,s;return{c(){e=h("title"),s=R(a[1])},l(t){e=f(t,"title",{});var r=_(e);s=A(r,a[1]),r.forEach(u)},m(t,r){z(t,e,r),C(e,s)},p(t,r){r&2&&B(s,t[1])},d(t){t&&u(e)}}}function D(a){let e,s,t=a[1]&&w(a),r=[{xmlns:"http://www.w3.org/2000/svg"},{viewBox:"0 0 32 32"},{fill:"currentColor"},{preserveAspectRatio:"xMidYMid meet"},{width:a[0]},{height:a[0]},a[2],a[3]],n={};for(let i=0;i<r.length;i+=1)n=g(n,r[i]);return{c(){e=h("svg"),t&&t.c(),s=h("path"),this.h()},l(i){e=f(i,"svg",{xmlns:!0,viewBox:!0,fill:!0,preserveAspectRatio:!0,width:!0,height:!0});var l=_(e);t&&t.l(l),s=f(l,"path",{d:!0}),_(s).forEach(u),l.forEach(u),this.h()},h(){k(s,"d","M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"),m(e,n)},m(i,l){z(i,e,l),t&&t.m(e,null),C(e,s)},p(i,[l]){i[1]?t?t.p(i,l):(t=w(i),t.c(),t.m(e,s)):t&&(t.d(1),t=null),m(e,n=x(r,[{xmlns:"http://www.w3.org/2000/svg"},{viewBox:"0 0 32 32"},{fill:"currentColor"},{preserveAspectRatio:"xMidYMid meet"},l&1&&{width:i[0]},l&1&&{height:i[0]},l&4&&i[2],l&8&&i[3]]))},i:c,o:c,d(i){i&&u(e),t&&t.d()}}}function P(a,e,s){let t,r;const n=["size","title"];let i=v(e,n),{size:l=16}=e,{title:d=void 0}=e;return a.$$set=o=>{s(5,e=g(g({},e),b(o))),s(3,i=v(e,n)),"size"in o&&s(0,l=o.size),"title"in o&&s(1,d=o.title)},a.$$.update=()=>{s(4,t=e["aria-label"]||e["aria-labelledby"]||d),s(2,r={"aria-hidden":t?void 0:!0,role:t?"img":void 0,focusable:Number(e.tabindex)===0?!0:void 0})},e=b(e),[l,d,r,i,t]}class S extends M{constructor(e){super(),p(this,e,P,D,E,{size:0,title:1})}}var j=S;export{j as C};
