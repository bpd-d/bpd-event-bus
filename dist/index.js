!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("cui-light",[],e):"object"==typeof exports?exports["cui-light"]=e():t["cui-light"]=e()}(window,(function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function i(t,e=!0){return null!=t&&(!e||!function(t){if("string"==typeof t)return 0===t.length;if("boolean"==typeof t)return t;if(Array.isArray(t))return 0===t.length;return!1}(t))}function*r(){let t=0;for(;;){((yield t++)||t>2e5)&&(t=0)}}function o(t){return t?"string"==typeof t?t:t.id:null}n.r(e),n.d(e,"BpdEventBusFactory",(function(){return _})),n.d(e,"BpdEventBus",(function(){return q}));var s=function(t,e,n,i){return new(n||(n=Promise))((function(r,o){function s(t){try{a(i.next(t))}catch(t){o(t)}}function u(t){try{a(i.throw(t))}catch(t){o(t)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,u)}a((i=i.apply(t,e||[])).next())}))};class u{execute(t,e,n){return s(this,void 0,void 0,(function*(){n=null!=n?n:[],i(e)?t.apply(e,n):t(...n)}))}}var a,c,l=function(t,e,n){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,n),n},h=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class f{constructor(){a.set(this,void 0),c.set(this,void 0),l(this,a,[]),l(this,c,[])}add(t,e){i(t)&&!this.has(t)&&(h(this,a).push(t),h(this,c).push(e))}remove(t){if(i(t)&&this.has(t)){let e=this.indexOf(t);e>-1&&(h(this,a).splice(e,1),h(this,c).splice(e,1))}}has(t){return h(this,a).includes(t)}get(t){return t>-1&&t<this.length()?{key:h(this,a)[t],value:h(this,c)[t]}:null}first(){return this.get(0)}length(){return h(this,a).length}indexOf(t){return h(this,a).indexOf(t)}}a=new WeakMap,c=new WeakMap;var d,p,v,g,y=function(t,e,n,i){return new(n||(n=Promise))((function(r,o){function s(t){try{a(i.next(t))}catch(t){o(t)}}function u(t){try{a(i.throw(t))}catch(t){o(t)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,u)}a((i=i.apply(t,e||[])).next())}))},w=function(t,e,n){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,n),n},m=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class E{constructor(t,e,n){d.set(this,void 0),p.set(this,void 0),v.set(this,void 0),g.set(this,void 0),this.queue=new f,w(this,g,e),this.isBusy=!1,w(this,d,n),w(this,p,t),w(this,v,r())}handle(t,e,n,r){return y(this,void 0,void 0,(function*(){if(!i(e))return void this.logError("handle","No events provided");let o=this.createKey(t,r);if(this.queue.add(o,{events:e,id:n,args:r}),!this.isBusy){this.isBusy=!0;let t=null;for(;this.queue.length()>0;){t=this.queue.first();try{yield m(this,g).perform(t.value)}catch(t){this.logError("perform",t.message)}finally{this.queue.remove(t.key)}}this.isBusy=!1}return!0}))}logEvent(t,e){this.log("INFO",t,e)}logError(t,e){this.log("ERROR",t,e)}nextId(){return"#"+m(this,v).next().value}log(t,e,n){i(m(this,d))&&m(this,d).call(this,t,`[${m(this,p)}]-[${e}]`,(new Date).toLocaleString(),n)}}d=new WeakMap,p=new WeakMap,v=new WeakMap,g=new WeakMap;class x extends E{constructor(t){super("SimpleEventEmitHandler",t)}createKey(t,e){return this.nextId()}}var b,M=function(t,e,n,i){return new(n||(n=Promise))((function(r,o){function s(t){try{a(i.next(t))}catch(t){o(t)}}function u(t){try{a(i.throw(t))}catch(t){o(t)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,u)}a((i=i.apply(t,e||[])).next())}))},k=function(t,e,n){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,n),n},O=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class I{idMatches(t,e){return!i(t)||i(t)&&t==e}}new WeakMap;class W extends I{constructor(t){super(),b.set(this,void 0),k(this,b,t)}perform(t){return M(this,void 0,void 0,(function*(){let e=[],n=null,i=null;for(let r in t.events)n=t.events[r],i=n.target?o(n.target):null,this.idMatches(t.id,i)&&e.push(O(this,b).execute(n.callback,n.ctx,t.args));return yield Promise.all(e),!0}))}}b=new WeakMap;var T,j,P,S,B,A=function(t,e,n,i){return new(n||(n=Promise))((function(r,o){function s(t){try{a(i.next(t))}catch(t){o(t)}}function u(t){try{a(i.throw(t))}catch(t){o(t)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,u)}a((i=i.apply(t,e||[])).next())}))},R=function(t,e,n){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,n),n},$=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class _{static create(t){let e=new W(new u),n=new q(new x(e),null==t?void 0:t.name);return i(null==t?void 0:t.logger)&&n.setLogger(t.logger),n}}class q{constructor(t,e){T.set(this,void 0),j.set(this,void 0),P.set(this,void 0),S.set(this,void 0),B.set(this,void 0),R(this,T,{}),R(this,j,t),R(this,S,r()),R(this,B,null!=e?e:"EVENT_BUS")}setLogger(t){R(this,P,t)}on(t,e,n,r){(function(...t){if(!i(t))return!1;let e=t.length;for(let n=0;n<e;n++)if(!i(t[n]))return!1;return!0})(t,e)||this.logError("on","Missing argument");let s=this.prepareEventId(o(n));return this.logInfo("on",`Attaching new event: [${t}] for: [${s}]`),$(this,T)[t]||($(this,T)[t]={}),$(this,T)[t][s]={ctx:n,callback:e,target:r},s}detach(t,e){i(t)||this.logError("detach","Missing argument");let n=$(this,T)[t],r=o(e);this.logInfo("detach",`Detaching item: [${r}] from [${t}]`),this.isAttached(n,r)&&delete n[r]}detachAll(t){i(t)&&$(this,T)[t]?delete $(this,T)[t]:this.logError("detachAll","Event name is missing or incorrect")}emit(t,e,...n){return A(this,void 0,void 0,(function*(){i(t)||this.logInfo("emit","Event name is incorrect");let r=o(e);return this.logInfo("emit",`Emit: [${t}], id: [${r}]`),yield $(this,j).handle(t,$(this,T)[t],r,n),!0}))}isSubscribing(t,e){let n=$(this,T)[t];return this.isAttached(n,o(e))}isAttached(t,e){return i(t)&&i(e)&&i(t[e])}prepareEventId(t){return i(t)?t:this.getRandomEventId()}logError(t,e){this.log("ERROR",t,e)}logInfo(t,e){this.log("INFO",t,e)}log(t,e,n){$(this,P)&&$(this,P).call(this,t,e,(new Date).toLocaleString(),n)}getRandomEventId(){return $(this,B)+"_"+$(this,S).next().value}}T=new WeakMap,j=new WeakMap,P=new WeakMap,S=new WeakMap,B=new WeakMap}])}));
//# sourceMappingURL=index.js.map