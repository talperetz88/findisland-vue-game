(function(t){function i(i){for(var s,r,l=i[0],d=i[1],o=i[2],c=0,h=[];c<l.length;c++)r=l[c],Object.prototype.hasOwnProperty.call(e,r)&&e[r]&&h.push(e[r][0]),e[r]=0;for(s in d)Object.prototype.hasOwnProperty.call(d,s)&&(t[s]=d[s]);u&&u(i);while(h.length)h.shift()();return a.push.apply(a,o||[]),n()}function n(){for(var t,i=0;i<a.length;i++){for(var n=a[i],s=!0,l=1;l<n.length;l++){var d=n[l];0!==e[d]&&(s=!1)}s&&(a.splice(i--,1),t=r(r.s=n[0]))}return t}var s={},e={app:0},a=[];function r(i){if(s[i])return s[i].exports;var n=s[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=s,r.d=function(t,i,n){r.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,i){if(1&i&&(t=r(t)),8&i)return t;if(4&i&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)r.d(n,s,function(i){return t[i]}.bind(null,s));return n},r.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(i,"a",i),i},r.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},r.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=i,l=l.slice();for(var o=0;o<l.length;o++)i(l[o]);var u=d;a.push([0,"chunk-vendors"]),n()})({0:function(t,i,n){t.exports=n("56d7")},"034f":function(t,i,n){"use strict";n("85ec")},"56d7":function(t,i,n){"use strict";n.r(i);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{attrs:{id:"app"}},[n("island")],1)},a=[],r=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",[n("div",{staticClass:"island-welcome"},[0==t.startMap?n("div",{staticClass:"island-welcome-container"},[n("span",[t._v("Please enter bitmap size")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.bitmapinput,expression:"bitmapinput"}],attrs:{placeholder:"Bitmap size: n,m"},domProps:{value:t.bitmapinput},on:{input:function(i){i.target.composing||(t.bitmapinput=i.target.value)}}}),n("div",{staticClass:"btn-wrap"},[n("button",{staticClass:"solve-btn",on:{click:function(i){return t.start()}}},[t._v("RANDOMIZE")]),n("button",{staticClass:"solve-btn",on:{click:function(i){return t.drow()}}},[t._v("BONUS: DRAW")])])]):t._e()]),""!==t.bitmapinput&&1==t.startMap?n("div",{staticClass:"island-map-container"},t._l(t.islandMatrix,(function(i,s){return n("div",{key:""+s,staticClass:"island-map-box-row"},t._l(i,(function(i,s){return n("div",{key:""+s,staticClass:"island-map-box-col",class:{active:1==i.isIland},style:{"background-color":i.color},on:{click:function(n){return t.markBit(i.index)}}})})),0)})),0):t._e(),""!==t.bitmapinput&&1==t.startMap?n("div",{staticClass:"solve-map"},[t.amountOfIslands>0?n("h1",[t._v("FOUND "+t._s(t.amountOfIslands)+" ISLAND!")]):t._e(),t.amountOfIslands>0?n("button",{staticClass:"solve-btn",on:{click:function(i){return t.restart()}}},[t._v("RESTART")]):t._e(),0==t.amountOfIslands?n("button",{staticClass:"solve-btn",on:{click:function(i){return t.solveMap()}}},[t._v("SOLVE")]):t._e()]):t._e()])},l=[],d=n("1da1"),o=n("3835"),u=(n("96cf"),n("1276"),n("ac1f"),n("99af"),n("4de4"),n("d81d"),n("caad"),n("2532"),{name:"Island",data:function(){return{rows:50,colums:50,bitmapinput:"",startMap:!1,amountOfIslands:0,islandMatrix:[],visitedIndex:[],colorUsed:[],fillMap:!0}},created:function(){this.initializeIsland()},methods:{start:function(){var t=this.bitmapinput.split(",");this.rows=t[0],this.colums=t[1],this.startMap=!0,this.initializeIsland()},drow:function(){var t=this.bitmapinput.split(",");this.rows=t[0],this.colums=t[1],this.startMap=!0,this.fillMap=!1,this.initializeIsland()},initializeIsland:function(){for(var t=[],i=0;i<this.rows;++i){for(var n=[],s=0;s<this.colums;++s)n.push({isIland:!!(Math.random()>=.5&&this.fillMap),index:"".concat(i,",").concat(s),color:"#fffff"});t.push(n)}this.islandMatrix=t},restart:function(){this.rows=50,this.colums=50,this.amountOfIslands=0,this.islandMatrix=[],this.visitedIndex=[],this.colorUsed=[],this.bitmapinput="",this.startMap=!1,this.fillMap=!0},markBit:function(t){var i=t.split(","),n=i[0],s=i[1];this.islandMatrix[n][s].isIland=!this.islandMatrix[n][s].isIland},resetMap:function(t){for(var i=[[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]],n=t,s=[],e=0;e<t.length;e++)for(var a=0;a<t[e].length;a++){var r=i.filter((function(t){var i=Object(o["a"])(t,2),s=i[0],r=i[1];return s+e>=0&&s+e<n.length&&r+a>=0&&r+a<n.length})).map((function(t){var i=Object(o["a"])(t,2),s=i[0],r=i[1];return n[s+e][r+a]})).filter((function(t){return void 0!=t}));if(e+1<t.length)for(var l=t[e+1],d=0;d<l.length;d++)if(r.includes(l[d])&&(s.push(e+1),t[e]=t[e].concat(l),e+2<t.length)){e+=2;break}}for(var u=0;u<t.length;++u){var c=this.getRandomColor();while(!this.colorUsed.includes(c))c=this.getRandomColor(),this.colorUsed.push(c);for(var h=0;h<t[u].length;++h){var p=t[u][h].split(","),f=p[0],x=p[1];this.islandMatrix[f][x].color=c}}},getRandomColor:function(){for(var t="0123456789ABCDEF",i="#",n=0;n<6;n++)i+=t[Math.floor(16*Math.random())];return i},solveMap:function(){this.numIslands().then((function(t){console.log("number of",t)}))},bfs:function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(i,n,s){var e,a,r,l,d;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e=[[i,n]];while(e.length)a=e.shift(),r=Object(o["a"])(a,2),l=r[0],d=r[1],this.isIsland(l+1,d)&&!this.visitedIndex.includes(this.islandMatrix[l][d].index)&&(e.push([l+1,d]),this.visitedIndex.includes(this.islandMatrix[l+1][d].index)||s.push(this.islandMatrix[l+1][d].index)),this.isIsland(l,d+1)&&!this.visitedIndex.includes(this.islandMatrix[l][d].index)&&(e.push([l,d+1]),this.visitedIndex.includes(this.islandMatrix[l][d+1].index)||s.push(this.islandMatrix[l][d+1].index)),this.isIsland(l-1,d)&&!this.visitedIndex.includes(this.islandMatrix[l][d].index)&&(e.push([l-1,d]),this.visitedIndex.includes(this.islandMatrix[l-1][d].index)||s.push(this.islandMatrix[l-1][d].index)),this.isIsland(l,d-1)&&!this.visitedIndex.includes(this.islandMatrix[l][d].index)&&(e.push([l,d-1]),this.visitedIndex.includes(this.islandMatrix[l][d-1].index)||s.push(this.islandMatrix[l][d-1].index)),this.isIsland(l+1,d+1)&&!this.visitedIndex.includes(this.islandMatrix[l][d].index)&&(e.push([l+1,d+1]),this.visitedIndex.includes(this.islandMatrix[l+1][d+1].index)||s.push(this.islandMatrix[l+1][d+1].index)),this.isIsland(l-1,d+1)&&!this.visitedIndex.includes(this.islandMatrix[l][d].index)&&(e.push([l-1,d+1]),this.visitedIndex.includes(this.islandMatrix[l-1][d+1].index)||s.push(this.islandMatrix[l-1][d+1].index)),this.isIsland(l-1,d-1)&&!this.visitedIndex.includes(this.islandMatrix[l][d].index)&&(e.push([l-1,d-1]),this.visitedIndex.includes(this.islandMatrix[l-1][d-1].index)||s.push(this.islandMatrix[l-1][d-1].index)),this.isIsland(l+1,d-1)&&!this.visitedIndex.includes(this.islandMatrix[l][d].index)&&(e.push([l+1,d-1]),this.visitedIndex.includes(this.islandMatrix[l+1][d-1].index)||s.push(this.islandMatrix[l+1][d-1].index)),this.visitedIndex.push("".concat(l,",").concat(d));case 2:case"end":return t.stop()}}),t,this)})));function i(i,n,s){return t.apply(this,arguments)}return i}(),isIsland:function(t,i){return t>=0&&t<this.islandMatrix.length&&i>=0&&i<this.islandMatrix[t].length&&1==this.islandMatrix[t][i].isIland},numIslands:function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(){var i,n,s,e,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:i=0,n=[],s=[],e=0;case 4:if(!(e<this.islandMatrix.length)){t.next=19;break}a=0;case 6:if(!(a<this.islandMatrix[e].length)){t.next=16;break}if(1!=this.islandMatrix[e][a].isIland||this.visitedIndex.includes(this.islandMatrix[e][a].index)){t.next=12;break}return i+=1,s.push(this.islandMatrix[e][a].index),t.next=12,this.bfs(e,a,s).then((function(){n.push(s),s=[]}));case 12:this.visitedIndex.push("".concat(e,",").concat(a));case 13:a+=1,t.next=6;break;case 16:e+=1,t.next=4;break;case 19:return this.resetMap(n),this.amountOfIslands=i,t.abrupt("return",i);case 22:case"end":return t.stop()}}),t,this)})));function i(){return t.apply(this,arguments)}return i}()},computed:{getSizeMap:function(){return this.rows*this.colums}}}),c=u,h=(n("ca09"),n("2877")),p=Object(h["a"])(c,r,l,!1,null,"15f4ceaa",null),f=p.exports,x={name:"App",components:{island:f}},v=x,m=(n("034f"),Object(h["a"])(v,e,a,!1,null,null,null)),M=m.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(M)}}).$mount("#app")},"6f9d":function(t,i,n){},"85ec":function(t,i,n){},ca09:function(t,i,n){"use strict";n("6f9d")}});
//# sourceMappingURL=app.b2fcfd35.js.map