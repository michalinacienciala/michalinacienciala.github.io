(self.webpackChunktest_ui=self.webpackChunktest_ui||[]).push([[396,229],{53229:(e,t,s)=>{"use strict";s.r(t),s.d(t,{AlchemyProvider:()=>l});var n=s(81015),i=s(3576),r=s(37482),o=s(79545);s(54432);class c{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;this.sendBatchFn=e,this.maxBatchSize=t,this.pendingBatch=[]}enqueueRequest(e){return(0,n._)(this,void 0,void 0,(function*(){const t={request:e,resolve:void 0,reject:void 0},s=new Promise(((e,s)=>{t.resolve=e,t.reject=s}));return this.pendingBatch.push(t),this.pendingBatch.length===this.maxBatchSize?this.sendBatchRequest():this.pendingBatchTimer||(this.pendingBatchTimer=setTimeout((()=>this.sendBatchRequest()),10)),s}))}sendBatchRequest(){return(0,n._)(this,void 0,void 0,(function*(){const e=this.pendingBatch;this.pendingBatch=[],this.pendingBatchTimer&&(clearTimeout(this.pendingBatchTimer),this.pendingBatchTimer=void 0);const t=e.map((e=>e.request));return this.sendBatchFn(t).then((t=>{e.forEach(((e,s)=>{const n=t[s];if(n.error){const t=new Error(n.error.message);t.code=n.error.code,t.data=n.error.data,e.reject(t)}else e.resolve(n.result)}))}),(t=>{e.forEach((e=>{e.reject(t)}))}))}))}}class l extends r.r{constructor(e){const t=l.getApiKey(e.apiKey),s=l.getAlchemyNetwork(e.network),i=l.getAlchemyConnectionInfo(s,t,"http");void 0!==e.url&&(i.url=e.url),i.throttleLimit=e.maxRetries;super(i,n.E[s]),this.apiKey=e.apiKey,this.maxRetries=e.maxRetries,this.batchRequests=e.batchRequests;const r=Object.assign(Object.assign({},this.connection),{headers:Object.assign(Object.assign({},this.connection.headers),{"Alchemy-Ethers-Sdk-Method":"batchSend"})});this.batcher=new c((e=>(0,o.fetchJson)(r,JSON.stringify(e))))}static getApiKey(e){if(null==e)return n.D;if(e&&"string"!==typeof e)throw new Error(`Invalid apiKey '${e}' provided. apiKey must be a string.`);return e}static getNetwork(e){return"string"===typeof e&&e in n.C?n.C[e]:(0,i.H)(e)}static getAlchemyNetwork(e){if(void 0===e)return n.a;if("number"===typeof e)throw new Error(`Invalid network '${e}' provided. Network must be a string.`);if(!Object.values(n.N).includes(e))throw new Error(`Invalid network '${e}' provided. Network must be one of: ${Object.values(n.N).join(", ")}.`);return e}static getAlchemyConnectionInfo(e,t,s){const i="http"===s?(0,n.g)(e,t):(0,n.b)(e,t);return{headers:n.I?{"Alchemy-Ethers-Sdk-Version":n.V}:{"Alchemy-Ethers-Sdk-Version":n.V,"Accept-Encoding":"gzip"},allowGzip:!0,url:i}}detectNetwork(){const e=Object.create(null,{detectNetwork:{get:()=>super.detectNetwork}});return(0,n._)(this,void 0,void 0,(function*(){let t=this.network;if(null==t&&(t=yield e.detectNetwork.call(this),!t))throw new Error("No network detected");return t}))}_startPending(){(0,n.l)("WARNING: Alchemy Provider does not support pending filters")}isCommunityResource(){return this.apiKey===n.D}send(e,t){return this._send(e,t,"send")}_send(e,t,s){let i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const r={method:e,params:t,id:this._nextId++,jsonrpc:"2.0"};if(Object.assign({},this.connection).headers["Alchemy-Ethers-Sdk-Method"]=s,this.batchRequests||i)return this.batcher.enqueueRequest(r);this.emit("debug",{action:"request",request:(0,n.d)(r),provider:this});const c=["eth_chainId","eth_blockNumber"].indexOf(e)>=0;if(c&&this._cache[e])return this._cache[e];const l=(0,o.fetchJson)(this.connection,JSON.stringify(r),h).then((e=>(this.emit("debug",{action:"response",request:r,response:e,provider:this}),e)),(e=>{throw this.emit("debug",{action:"response",error:e,request:r,provider:this}),e}));return c&&(this._cache[e]=l,setTimeout((()=>{this._cache[e]=null}),0)),l}}function h(e){if(e.error){const t=new Error(e.error.message);throw t.code=e.error.code,t.data=e.error.data,t}return e.result}},96396:(e,t,s)=>{"use strict";s.r(t),s.d(t,{AlchemyWebSocketProvider:()=>m});var n=s(81015),i=s(68787),r=s(24326),o=s(3576),c=s(42473),l=s(53229),h=(s(54432),s(54501));class a{constructor(e){this.provider=e,this.maxBackfillBlocks=120}getNewHeadsBackfill(e,t,s){return(0,n._)(this,void 0,void 0,(function*(){p(e);const i=yield this.getBlockNumber();if(p(e),0===t.length)return this.getHeadEventsInRange(Math.max(s,i-this.maxBackfillBlocks)+1,i+1);const r=(0,n.f)(t[t.length-1].number),o=i-this.maxBackfillBlocks+1;if(r<=o)return this.getHeadEventsInRange(o,i+1);const c=yield this.getReorgHeads(e,t);p(e);const l=yield this.getHeadEventsInRange(r+1,i+1);return p(e),[...c,...l]}))}getLogsBackfill(e,t,s,i){return(0,n._)(this,void 0,void 0,(function*(){p(e);const r=yield this.getBlockNumber();if(p(e),0===s.length)return this.getLogsInRange(t,Math.max(i,r-this.maxBackfillBlocks)+1,r+1);const o=(0,n.f)(s[s.length-1].blockNumber),c=r-this.maxBackfillBlocks+1;if(o<c)return this.getLogsInRange(t,c,r+1);const l=yield this.getCommonAncestor(e,s);p(e);const h=s.filter((e=>(0,n.f)(e.blockNumber)>l.blockNumber)).map((e=>Object.assign(Object.assign({},e),{removed:!0}))),a=l.blockNumber===Number.NEGATIVE_INFINITY?(0,n.f)(s[0].blockNumber):l.blockNumber;let u=yield this.getLogsInRange(t,a,r+1);return u=u.filter((e=>e&&((0,n.f)(e.blockNumber)>l.blockNumber||(0,n.f)(e.logIndex)>l.logIndex))),p(e),[...h,...u]}))}setMaxBackfillBlock(e){this.maxBackfillBlocks=e}getBlockNumber(){return(0,n._)(this,void 0,void 0,(function*(){const e=yield this.provider.send("eth_blockNumber");return(0,n.f)(e)}))}getHeadEventsInRange(e,t){return(0,n._)(this,void 0,void 0,(function*(){if(e>=t)return[];const s=[];for(let i=e;i<t;i++)s.push({method:"eth_getBlockByNumber",params:[(0,n.t)(i),!1]});return(yield this.provider.sendBatch(s)).map(u)}))}getReorgHeads(e,t){return(0,n._)(this,void 0,void 0,(function*(){const s=[];for(let i=t.length-1;i>=0;i--){const r=t[i],o=yield this.getBlockByNumber((0,n.f)(r.number));if(p(e),r.hash===o.hash)break;s.push(u(o))}return s.reverse()}))}getBlockByNumber(e){return(0,n._)(this,void 0,void 0,(function*(){return this.provider.send("eth_getBlockByNumber",[(0,n.t)(e),!1])}))}getCommonAncestor(e,t){return(0,n._)(this,void 0,void 0,(function*(){let s=yield this.getBlockByNumber((0,n.f)(t[t.length-1].blockNumber));p(e);for(let e=t.length-1;e>=0;e--){const i=t[e];if(i.blockNumber!==s.number&&(s=yield this.getBlockByNumber((0,n.f)(i.blockNumber))),i.blockHash===s.hash)return{blockNumber:(0,n.f)(i.blockNumber),logIndex:(0,n.f)(i.logIndex)}}return{blockNumber:Number.NEGATIVE_INFINITY,logIndex:Number.NEGATIVE_INFINITY}}))}getLogsInRange(e,t,s){return(0,n._)(this,void 0,void 0,(function*(){if(t>=s)return[];const i=Object.assign(Object.assign({},e),{fromBlock:(0,n.t)(t),toBlock:(0,n.t)(s-1)});return this.provider.send("eth_getLogs",[i])}))}}function u(e){const t=Object.assign({},e);return delete t.totalDifficulty,delete t.transactions,delete t.uncles,t}function d(e,t){const s=new Set,n=[];return e.forEach((e=>{const i=t(e);s.has(i)||(s.add(i),n.push(e))})),n}const f=new Error("Cancelled");function p(e){if(e())throw f}class m extends c.q{constructor(e,t){var r;const o=l.AlchemyProvider.getApiKey(e.apiKey),c=l.AlchemyProvider.getAlchemyNetwork(e.network),u=l.AlchemyProvider.getAlchemyConnectionInfo(c,o,"wss"),d=`alchemy-sdk-${n.V}`;super(new i.Z(null!==(r=e.url)&&void 0!==r?r:u.url,d,{wsConstructor:null!==t&&void 0!==t?t:"undefined"!==typeof h&&null!=h&&null!=h.versions&&null!=h.versions.node?s(65442).w3cwebsocket:WebSocket}),n.E[c]),this._events=[],this.virtualSubscriptionsById=new Map,this.virtualIdsByPhysicalId=new Map,this.handleMessage=e=>{const t=JSON.parse(e.data);if(!function(e){return!function(e){return Array.isArray(e)||"2.0"===e.jsonrpc&&void 0!==e.id}(e)}(t))return;const s=t.params.subscription,n=this.virtualIdsByPhysicalId.get(s);if(!n)return;const i=this.virtualSubscriptionsById.get(n);if("eth_subscribe"===i.method)switch(i.params[0]){case"newHeads":{const e=i,r=t,{isBackfilling:o,backfillBuffer:c}=e,{result:l}=r.params;o?function(e,t){w(e,t,y)}(c,l):s!==n?this.emitAndRememberEvent(n,l,y):this.rememberEvent(n,l,y);break}case"logs":{const e=i,r=t,{isBackfilling:o,backfillBuffer:c}=e,{result:l}=r.params;o?function(e,t){w(e,t,k)}(c,l):n!==s?this.emitAndRememberEvent(n,l,k):this.rememberEvent(n,l,k);break}default:if(s!==n){const{result:e}=t.params;this.emitEvent(n,e)}}},this.handleReopen=()=>{this.virtualIdsByPhysicalId.clear();const{cancel:e,isCancelled:t}=function(){let e=!1;return{cancel:()=>e=!0,isCancelled:()=>e}}();this.cancelBackfill=e;for(const s of this.virtualSubscriptionsById.values())(()=>{(0,n._)(this,void 0,void 0,(function*(){try{yield this.resubscribeAndBackfill(t,s)}catch(e){t()||console.error(`Error while backfilling "${s.params[0]}" subscription. Some events may be missing.`,e)}}))})();this.startHeartbeat()},this.stopHeartbeatAndBackfill=()=>{null!=this.heartbeatIntervalId&&(clearInterval(this.heartbeatIntervalId),this.heartbeatIntervalId=void 0),this.cancelBackfill()},this.apiKey=o,this.backfiller=new a(this),this.addSocketListeners(),this.startHeartbeat(),this.cancelBackfill=n.n}static getNetwork(e){return"string"===typeof e&&e in n.C?n.C[e]:(0,o.H)(e)}on(e,t){return this._addEventListener(e,t,!1)}once(e,t){return this._addEventListener(e,t,!0)}off(e,t){return(0,n.i)(e)?this._off(e,t):super.off(e,t)}removeAllListeners(e){return void 0!==e&&(0,n.i)(e)?this._removeAllListeners(e):super.removeAllListeners(e)}listenerCount(e){return void 0!==e&&(0,n.i)(e)?this._listenerCount(e):super.listenerCount(e)}listeners(e){return void 0!==e&&(0,n.i)(e)?this._listeners(e):super.listeners(e)}_addEventListener(e,t,s){if((0,n.i)(e)){(0,n.v)(e);const i=new n.c((0,n.e)(e),t,s);return this._events.push(i),this._startEvent(i),this}return super._addEventListener(e,t,s)}_startEvent(e){[...n.A,"block","filter"].includes(e.type)?this.customStartEvent(e):super._startEvent(e)}_subscribe(e,t,s,i){return(0,n._)(this,void 0,void 0,(function*(){let n=this._subIds[e];const r=yield this.getBlockNumber();null==n&&(n=Promise.all(t).then((e=>this.send("eth_subscribe",e))),this._subIds[e]=n);const o=yield n,c=yield Promise.all(t);this.virtualSubscriptionsById.set(o,{event:i,method:"eth_subscribe",params:c,startingBlockNumber:r,virtualId:o,physicalId:o,sentEvents:[],isBackfilling:!1,backfillBuffer:[]}),this.virtualIdsByPhysicalId.set(o,o),this._subs[o]={tag:e,processFunc:s}}))}emit(e){for(var t=arguments.length,s=new Array(t>1?t-1:0),i=1;i<t;i++)s[i-1]=arguments[i];if((0,n.i)(e)){let t=!1;const i=[],r=(0,n.e)(e);return this._events=this._events.filter((e=>e.tag!==r||(setTimeout((()=>{e.listener.apply(this,s)}),0),t=!0,!e.once||(i.push(e),!1)))),i.forEach((e=>{this._stopEvent(e)})),t}return super.emit(e,...s)}sendBatch(e){return(0,n._)(this,void 0,void 0,(function*(){let t=0;const s=e.map((e=>{let{method:s,params:n}=e;return{method:s,params:n,jsonrpc:"2.0",id:"alchemy-sdk:"+t++}}));return this.sendBatchConcurrently(s)}))}destroy(){return this.removeSocketListeners(),this.stopHeartbeatAndBackfill(),super.destroy()}isCommunityResource(){return this.apiKey===n.D}_stopEvent(e){let t=e.tag;if(n.A.includes(e.type)){if(this._events.filter((e=>n.A.includes(e.type))).length)return}else if("tx"===e.type){if(this._events.filter((e=>"tx"===e.type)).length)return;t="tx"}else if(this.listenerCount(e.event))return;const s=this._subIds[t];s&&(delete this._subIds[t],s.then((e=>{this._subs[e]&&(delete this._subs[e],this.send("eth_unsubscribe",[e]))})))}addSocketListeners(){this._websocket.addEventListener("message",this.handleMessage),this._websocket.addEventListener("reopen",this.handleReopen),this._websocket.addEventListener("down",this.stopHeartbeatAndBackfill)}removeSocketListeners(){this._websocket.removeEventListener("message",this.handleMessage),this._websocket.removeEventListener("reopen",this.handleReopen),this._websocket.removeEventListener("down",this.stopHeartbeatAndBackfill)}resubscribeAndBackfill(e,t){return(0,n._)(this,void 0,void 0,(function*(){const{virtualId:s,method:n,params:i,sentEvents:r,backfillBuffer:o,startingBlockNumber:c}=t;t.isBackfilling=!0,o.length=0;try{const l=yield this.send(n,i);switch(p(e),t.physicalId=l,this.virtualIdsByPhysicalId.set(l,s),i[0]){case"newHeads":{const t=yield b((()=>g(this.backfiller.getNewHeadsBackfill(e,r,c),6e4)),5,(()=>!e()));p(e);(function(e){return d(e,(e=>e.hash))})([...t,...o]).forEach((e=>this.emitNewHeadsEvent(s,e)));break}case"logs":{const t=i[1]||{},n=yield b((()=>g(this.backfiller.getLogsBackfill(e,t,r,c),6e4)),5,(()=>!e()));p(e);(function(e){return d(e,(e=>`${e.blockHash}/${e.logIndex}`))})([...n,...o]).forEach((e=>this.emitLogsEvent(s,e)));break}}}finally{t.isBackfilling=!1,o.length=0}}))}emitNewHeadsEvent(e,t){this.emitAndRememberEvent(e,t,y)}emitLogsEvent(e,t){this.emitAndRememberEvent(e,t,k)}emitAndRememberEvent(e,t,s){this.rememberEvent(e,t,s),this.emitEvent(e,t)}emitEvent(e,t){const s=this.virtualSubscriptionsById.get(e);s&&this.emitGenericEvent(s,t)}rememberEvent(e,t,s){const n=this.virtualSubscriptionsById.get(e);n&&w(n.sentEvents,Object.assign({},t),s)}emitGenericEvent(e,t){this.emitProcessFn(e.event)(t)}startHeartbeat(){null==this.heartbeatIntervalId&&(this.heartbeatIntervalId=setInterval((()=>(0,n._)(this,void 0,void 0,(function*(){try{yield g(this.send("net_version"),1e4)}catch(e){this._websocket.reconnect()}}))),3e4))}sendBatchConcurrently(e){return(0,n._)(this,void 0,void 0,(function*(){return Promise.all(e.map((e=>this.send(e.method,e.params))))}))}customStartEvent(e){if(e.type===n.h){const{fromAddress:t,toAddress:s,hashesOnly:i}=e;this._subscribe(e.tag,[n.j.PENDING_TRANSACTIONS,{fromAddress:t,toAddress:s,hashesOnly:i}],this.emitProcessFn(e),e)}else if(e.type===n.k){const{addresses:t,includeRemoved:s,hashesOnly:i}=e;this._subscribe(e.tag,[n.j.MINED_TRANSACTIONS,{addresses:t,includeRemoved:s,hashesOnly:i}],this.emitProcessFn(e),e)}else"block"===e.type?this._subscribe("block",["newHeads"],this.emitProcessFn(e),e):"filter"===e.type&&this._subscribe(e.tag,["logs",this._getFilter(e.filter)],this.emitProcessFn(e),e)}emitProcessFn(e){switch(e.type){case n.h:return t=>this.emit({method:n.j.PENDING_TRANSACTIONS,fromAddress:e.fromAddress,toAddress:e.toAddress,hashesOnly:e.hashesOnly},t);case n.k:return t=>this.emit({method:n.j.MINED_TRANSACTIONS,addresses:e.addresses,includeRemoved:e.includeRemoved,hashesOnly:e.hashesOnly},t);case"block":return e=>{const t=r.O$.from(e.number).toNumber();this._emitted.block=t,this.emit("block",t)};case"filter":return t=>{null==t.removed&&(t.removed=!1),this.emit(e.filter,this.formatter.filterLog(t))};default:throw new Error("Invalid event type to `emitProcessFn()`")}}_off(e,t){if(null==t)return this.removeAllListeners(e);const s=[];let i=!1;const r=(0,n.e)(e);return this._events=this._events.filter((e=>e.tag!==r||e.listener!=t||(!!i||(i=!0,s.push(e),!1)))),s.forEach((e=>{this._stopEvent(e)})),this}_removeAllListeners(e){let t=[];if(null==e)t=this._events,this._events=[];else{const s=(0,n.e)(e);this._events=this._events.filter((e=>e.tag!==s||(t.push(e),!1)))}return t.forEach((e=>{this._stopEvent(e)})),this}_listenerCount(e){if(!e)return this._events.length;const t=(0,n.e)(e);return this._events.filter((e=>e.tag===t)).length}_listeners(e){if(null==e)return this._events.map((e=>e.listener));const t=(0,n.e)(e);return this._events.filter((e=>e.tag===t)).map((e=>e.listener))}}function b(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:()=>!0;return(0,n._)(this,void 0,void 0,(function*(){let n=0,i=0;for(;;)try{return yield e()}catch(r){if(i++,i>=t||!s(r))throw r;if(yield v(n),!s(r))throw r;n=0===n?1e3:Math.min(3e4,2*n)}}))}function v(e){return new Promise((t=>setTimeout(t,e)))}function g(e,t){return Promise.race([e,new Promise(((e,s)=>setTimeout((()=>s(new Error("Timeout"))),t)))])}function y(e){return(0,n.f)(e.number)}function k(e){return(0,n.f)(e.blockNumber)}function w(e,t,s){const n=s(t),i=e.findIndex((e=>s(e)>n-10));-1===i?e.length=0:e.splice(0,i),e.push(t)}},73818:e=>{var t=function(){if("object"===typeof self&&self)return self;if("object"===typeof window&&window)return window;throw new Error("Unable to resolve global `this`")};e.exports=function(){if(this)return this;if("object"===typeof globalThis&&globalThis)return globalThis;try{Object.defineProperty(Object.prototype,"__global__",{get:function(){return this},configurable:!0})}catch(e){return t()}try{return __global__||t()}finally{delete Object.prototype.__global__}}()},68787:(e,t)=>{"use strict";var s=function(){function e(t,s,i){if(void 0===i&&(i={}),this.url=t,this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this.ondown=null,this.onreopen=null,this.CONNECTING=e.CONNECTING,this.OPEN=e.OPEN,this.CLOSING=e.CLOSING,this.CLOSED=e.CLOSED,this.hasBeenOpened=!1,this.isClosed=!1,this.messageBuffer=[],this.nextRetryTime=0,this.reconnectCount=0,this.lastKnownExtensions="",this.lastKnownProtocol="",this.listeners={},null==s||"string"===typeof s||Array.isArray(s)?this.protocols=s:i=s,this.options=n(i),!this.options.wsConstructor){if("undefined"===typeof WebSocket)throw new Error("WebSocket not present in global scope and no wsConstructor option was provided.");this.options.wsConstructor=WebSocket}this.openNewWebSocket()}return Object.defineProperty(e.prototype,"binaryType",{get:function(){return this.binaryTypeInternal||"blob"},set:function(e){this.binaryTypeInternal=e,this.ws&&(this.ws.binaryType=e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bufferedAmount",{get:function(){var e=this.ws?this.ws.bufferedAmount:0,t=!1;return this.messageBuffer.forEach((function(s){var n=function(e){return"string"===typeof e?2*e.length:e instanceof ArrayBuffer?e.byteLength:e instanceof Blob?e.size:void 0}(s);null!=n?e+=n:t=!0})),t&&this.debugLog("Some buffered data had unknown length. bufferedAmount() return value may be below the correct amount."),e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"extensions",{get:function(){return this.ws?this.ws.extensions:this.lastKnownExtensions},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"protocol",{get:function(){return this.ws?this.ws.protocol:this.lastKnownProtocol},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"readyState",{get:function(){return this.isClosed?e.CLOSED:e.OPEN},enumerable:!0,configurable:!0}),e.prototype.close=function(e,t){this.disposeSocket(e,t),this.shutdown(),this.debugLog("WebSocket permanently closed by client.")},e.prototype.send=function(e){if(this.isClosed)throw new Error("WebSocket is already in CLOSING or CLOSED state.");this.ws&&this.ws.readyState===this.OPEN?this.ws.send(e):this.messageBuffer.push(e)},e.prototype.reconnect=function(){if(this.isClosed)throw new Error("Cannot call reconnect() on socket which is permanently closed.");this.disposeSocket(1e3,"Client requested reconnect."),this.handleClose(void 0)},e.prototype.addEventListener=function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)},e.prototype.dispatchEvent=function(e){return this.dispatchEventOfType(e.type,e)},e.prototype.removeEventListener=function(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter((function(e){return e!==t})))},e.prototype.openNewWebSocket=function(){var e=this;if(!this.isClosed){var t=this.options,s=t.connectTimeout,n=t.wsConstructor;this.debugLog("Opening new WebSocket to "+this.url+".");var i=new n(this.url,this.protocols);i.onclose=function(t){return e.handleClose(t)},i.onerror=function(t){return e.handleError(t)},i.onmessage=function(t){return e.handleMessage(t)},i.onopen=function(t){return e.handleOpen(t)},this.connectTimeoutId=setTimeout((function(){e.clearConnectTimeout(),e.disposeSocket(),e.handleClose(void 0)}),s),this.ws=i}},e.prototype.handleOpen=function(e){var t=this;if(this.ws&&!this.isClosed){var s=this.options.allClearResetTime;this.debugLog("WebSocket opened."),null!=this.binaryTypeInternal?this.ws.binaryType=this.binaryTypeInternal:this.binaryTypeInternal=this.ws.binaryType,this.clearConnectTimeout(),this.hasBeenOpened?this.dispatchEventOfType("reopen",e):(this.dispatchEventOfType("open",e),this.hasBeenOpened=!0),this.messageBuffer.forEach((function(e){return t.send(e)})),this.messageBuffer=[],this.allClearTimeoutId=setTimeout((function(){t.clearAllClearTimeout(),t.nextRetryTime=0,t.reconnectCount=0;var e=s/1e3|0;t.debugLog("WebSocket remained open for "+e+" seconds. Resetting retry time and count.")}),s)}},e.prototype.handleMessage=function(e){this.isClosed||this.dispatchEventOfType("message",e)},e.prototype.handleClose=function(e){var t=this;if(!this.isClosed){var s=this.options,n=s.maxReconnectAttempts,i=s.shouldReconnect;if(this.clearConnectTimeout(),this.clearAllClearTimeout(),this.ws&&(this.lastKnownExtensions=this.ws.extensions,this.lastKnownProtocol=this.ws.protocol,this.disposeSocket()),this.dispatchEventOfType("down",e),this.reconnectCount>=n)this.stopReconnecting(e,this.getTooManyFailedReconnectsMessage());else{var r=!e||i(e);"boolean"===typeof r?this.handleWillReconnect(r,e,"Provided shouldReconnect() returned false. Closing permanently."):r.then((function(s){t.isClosed||t.handleWillReconnect(s,e,"Provided shouldReconnect() resolved to false. Closing permanently.")}))}}},e.prototype.handleError=function(e){this.dispatchEventOfType("error",e),this.debugLog("WebSocket encountered an error.")},e.prototype.handleWillReconnect=function(e,t,s){e?this.reestablishConnection():this.stopReconnecting(t,s)},e.prototype.reestablishConnection=function(){var e=this,t=this.options,s=t.minReconnectDelay,n=t.maxReconnectDelay,i=t.reconnectBackoffFactor;this.reconnectCount++;var r=this.nextRetryTime;this.nextRetryTime=Math.max(s,Math.min(this.nextRetryTime*i,n)),setTimeout((function(){return e.openNewWebSocket()}),r);var o=r/1e3|0;this.debugLog("WebSocket was closed. Re-opening in "+o+" seconds.")},e.prototype.stopReconnecting=function(e,t){this.debugLog(t),this.shutdown(),e&&this.dispatchEventOfType("close",e)},e.prototype.shutdown=function(){this.isClosed=!0,this.clearAllTimeouts(),this.messageBuffer=[],this.disposeSocket()},e.prototype.disposeSocket=function(e,t){this.ws&&(this.ws.onerror=i,this.ws.onclose=i,this.ws.onmessage=i,this.ws.onopen=i,this.ws.close(e,t),this.ws=void 0)},e.prototype.clearAllTimeouts=function(){this.clearConnectTimeout(),this.clearAllClearTimeout()},e.prototype.clearConnectTimeout=function(){null!=this.connectTimeoutId&&(clearTimeout(this.connectTimeoutId),this.connectTimeoutId=void 0)},e.prototype.clearAllClearTimeout=function(){null!=this.allClearTimeoutId&&(clearTimeout(this.allClearTimeoutId),this.allClearTimeoutId=void 0)},e.prototype.dispatchEventOfType=function(e,t){var s=this;switch(e){case"close":this.onclose&&this.onclose(t);break;case"error":this.onerror&&this.onerror(t);break;case"message":this.onmessage&&this.onmessage(t);break;case"open":this.onopen&&this.onopen(t);break;case"down":this.ondown&&this.ondown(t);break;case"reopen":this.onreopen&&this.onreopen(t)}return e in this.listeners&&this.listeners[e].slice().forEach((function(e){return s.callListener(e,t)})),!t||!t.defaultPrevented},e.prototype.callListener=function(e,t){"function"===typeof e?e.call(this,t):e.handleEvent.call(this,t)},e.prototype.debugLog=function(e){this.options.debug&&console.log(e)},e.prototype.getTooManyFailedReconnectsMessage=function(){var e,t=this.options.maxReconnectAttempts;return"Failed to reconnect after "+t+" "+(e="attempt",(1===t?e:e+"s")+". Closing permanently.")},e.DEFAULT_OPTIONS={allClearResetTime:5e3,connectTimeout:5e3,debug:!1,minReconnectDelay:1e3,maxReconnectDelay:3e4,maxReconnectAttempts:Number.POSITIVE_INFINITY,reconnectBackoffFactor:1.5,shouldReconnect:function(){return!0},wsConstructor:void 0},e.CONNECTING=0,e.OPEN=1,e.CLOSING=2,e.CLOSED=3,e}();function n(e){var t={};return Object.keys(s.DEFAULT_OPTIONS).forEach((function(n){var i=e[n];t[n]=void 0===i?s.DEFAULT_OPTIONS[n]:i})),t}function i(){}t.Z=s},65442:(e,t,s)=>{var n;if("object"===typeof globalThis)n=globalThis;else try{n=s(73818)}catch(c){}finally{if(n||"undefined"===typeof window||(n=window),!n)throw new Error("Could not determine global this")}var i=n.WebSocket||n.MozWebSocket,r=s(19251);function o(e,t){return t?new i(e,t):new i(e)}i&&["CONNECTING","OPEN","CLOSING","CLOSED"].forEach((function(e){Object.defineProperty(o,e,{get:function(){return i[e]}})})),e.exports={w3cwebsocket:i?o:null,version:r}},19251:(e,t,s)=>{e.exports=s(19794).version},19794:e=>{"use strict";e.exports={version:"1.0.34"}}}]);
//# sourceMappingURL=396.e710c348.chunk.js.map