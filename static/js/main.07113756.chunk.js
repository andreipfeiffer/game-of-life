(this["webpackJsonpgame-of-life"]=this["webpackJsonpgame-of-life"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(6),l=n.n(i),c=n(4),o=n(1);n(12);function u(e,t,n){for(var a=[],r=0;r<n;r+=1){a[r]=[];for(var i=0;i<t;i+=1){var l;a[r][i]=!!(null===e||void 0===e||null===(l=e[r])||void 0===l?void 0:l[i])}}return a}function s(e,t,n){var a=e.length,r=e[0].length,i=n>0?n-1:r-1,l=n<r-1?n+1:0,c=t>0?t-1:a-1,o=t<a-1?t+1:0;return[e[c][i],e[c][n],e[c][l],e[t][i],e[t][l],e[o][i],e[o][n],e[o][l]]}n(13);var d=r.a.memo((function(e){var t=e.y,n=e.size,a=e.row,i=e.onToggle;return r.a.createElement("div",{key:t,className:"row"},a.map((function(e,a){return r.a.createElement("span",{key:"".concat(t).concat(a),className:"cell ".concat(e?"cell-alive":""," ").concat(n<15?"no-border":""),onClick:function(){return i(a,t)},style:{width:n,height:n}})})))}));var m=function(e){var t=e.population,n=e.size,a=e.onToggle;return r.a.createElement("div",{className:"life ".concat(n<15?"life-border":"")},t.map((function(e,t){return r.a.createElement(d,{key:t,row:e,y:t,size:n,onToggle:a})})))};var g=function(e){var t=e.presets,n=r.a.useState(!0),a=Object(o.a)(n,2),i=a[0],l=a[1],d=r.a.useState(500),g=Object(o.a)(d,2),f=g[0],v=g[1],h=r.a.useState(t[0].grid[0].length),p=Object(o.a)(h,2),b=p[0],E=p[1],y=r.a.useState(t[0].grid.length),O=Object(o.a)(y,2),S=O[0],k=O[1],w=r.a.useState(30),j=Object(o.a)(w,2),C=j[0],N=j[1],x=r.a.useState(0),M=Object(o.a)(x,2),T=M[0],z=M[1],L=r.a.useState(t[0].id),B=Object(o.a)(L,2),I=B[0],J=B[1],P=r.a.useState(u(t[0].grid,b,S)),R=Object(o.a)(P,2),G=R[0],H=R[1];!function(e,t){var n=r.a.useRef();r.a.useEffect((function(){n.current=e}),[e,n]),r.a.useEffect((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t,n])}((function(){H(function(e){for(var t=[],n=0;n<e.length;n+=1){t[n]=[];for(var a=!1,r=0;r<e[n].length;r+=1){var i=!!e[n][r],l=s(e,n,r).filter((function(e){return!!e}));3===l.length||2===l.length&&i?t[n][r]=!0:t[n][r]=!1,t[n][r]!==e[n][r]&&(a=!0)}a||(t[n]=e[n])}return t}(G))}),i?f:null);var W=r.a.useCallback((function(e,t){var n=Object(c.a)(G[t]);n[e]=!n[e];var a=[].concat(Object(c.a)(G.slice(0,t)),[n],Object(c.a)(G.slice(t+1)));H(a),J(""),z(T+1)}),[b,S,T]);return r.a.createElement("div",null,"Preset:"," ",r.a.createElement("select",{value:I,onChange:function(e){return function(e){var n,a,r=t.find((function(t){return t.id===e})),i=Math.max(null!==(n=null===r||void 0===r?void 0:r.width)&&void 0!==n?n:0,b),l=Math.max(null!==(a=null===r||void 0===r?void 0:r.height)&&void 0!==a?a:0,S);k(l),E(i),J(e),H(u((null===r||void 0===r?void 0:r.grid)||G,i,l))}(e.target.value)}},r.a.createElement("option",{value:""},"Select a preset"),t.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.description)}))),r.a.createElement("br",null),r.a.createElement("br",null),"Cycle :"," ",r.a.createElement("input",{type:"number",value:f,onChange:function(e){return v(+e.target.value)},maxLength:4,className:"input"})," ","Width:"," ",r.a.createElement("input",{type:"number",value:b,onChange:function(e){return function(e){var t=Math.max(e,4);E(t),J(""),H(u(G,t,S))}(+e.target.value)},maxLength:3,className:"input"})," ","Height:"," ",r.a.createElement("input",{type:"number",value:S,onChange:function(e){return function(e){var t=Math.max(e,4);k(t),J(""),H(u(G,b,t))}(+e.target.value)},maxLength:3,className:"input"})," ","Size:"," ",r.a.createElement("input",{type:"number",value:C,onChange:function(e){return N(+e.target.value)},maxLength:3,className:"input"})," ",r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("button",{onClick:function(){return l(!i)}},i?"Stop":"Play")," ",!1===i&&r.a.createElement("button",{onClick:function(){console.log(JSON.stringify(G))},className:"secondary"},"Output")," ",r.a.createElement("hr",null),r.a.createElement("div",{className:"".concat(i?"playing":"")},r.a.createElement(m,{population:G,onToggle:W,size:C})))};var f=[{id:"block",description:"Block (Still life)",width:4,height:4,grid:[[!1,!1,!1,!1],[!1,!0,!0,!1],[!1,!0,!0,!1],[!1,!1,!1,!1]]},{id:"blinker",description:"Blinker (period 2 Oscillator)",width:5,height:5,grid:[[!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1],[!1,!0,!0,!0,!1],[!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1]]},{id:"toad",description:"Toad (period 2 Oscillator)",width:6,height:6,grid:[[!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1],[!1,!1,!0,!0,!0,!1],[!1,!0,!0,!0,!1,!1],[!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1]]},{id:"glider",description:"Glider (Spaceship)",width:5,height:5,grid:[[!1,!1,!1,!1,!1],[!1,!1,!0,!1,!1],[!1,!1,!1,!0,!1],[!1,!0,!0,!0,!1],[!1,!1,!1,!1,!1]]},{id:"r_pentomino",description:"The R-pentomino (Methuselahs)",width:200,height:100,grid:[[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!0,!0],[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!0,!0,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!0,!1]]}];l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,{presets:f})),document.getElementById("root"))},7:function(e,t,n){e.exports=n(14)}},[[7,1,2]]]);
//# sourceMappingURL=main.07113756.chunk.js.map