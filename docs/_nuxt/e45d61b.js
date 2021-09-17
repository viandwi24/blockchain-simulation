(window.webpackJsonp=window.webpackJsonp||[]).push([[8,4,15],{287:function(e,t,n){"use strict";n.r(t);var l=n(79),r=Object(l.c)({props:{text:{type:String,default:""}},setup:function(){}}),o=n(41),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("button",{staticClass:"shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded",attrs:{type:"button"}},[e._v("\n  "+e._s(e.text)+"\n")])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Button:n(287).default})},290:function(e,t,n){var l=n(193),r=n(194),o=n(300),c=function(){"use strict";function e(){l(this,e)}return r(e,[{key:"generate",value:function(){var e=new o.ec("secp256k1").genKeyPair();return{privateKey:e.getPrivate("hex"),publicKey:e.getPublic("hex")}}}]),e}(),d=function(){"use strict";function e(){l(this,e),this.key=void 0}return r(e,[{key:"fromPrivate",value:function(e){return this.key=new o.ec("secp256k1").keyFromPrivate(e,"hex"),this}},{key:"fromPublic",value:function(e){return this.key=new o.ec("secp256k1").keyFromPublic(e,"hex"),this}},{key:"getAddress",value:function(){return this.key?this.key.getPublic("hex"):void 0}},{key:"generate",value:function(e){return this.key.sign(e,"base64").toDER("hex")}},{key:"verify",value:function(e,t){return this.key.verify(e,t)}}]),e}();t.KeyGenerator=c,t.SignatureGenerator=d},292:function(e,t,n){var l=n(193),r=n(194);n(19),n(80);var o=n(295),c=n(139),d=n(290).SignatureGenerator,v=function(){"use strict";function e(t,n,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:c();l(this,e),this.fromAddress=t,this.toAddress=n,this.amount=parseInt(r),this.timestamp=c(o).unix()}return r(e,[{key:"calculateHash",value:function(){var pattern=this.fromAddress+this.toAddress+this.amount;return o(pattern).toString()}},{key:"sign",value:function(e){var t=new d(e).fromPrivate(e);if(t.getAddress()!==this.fromAddress)throw new Error("Invalid signing key");return this.signature=t.generate(this.calculateHash()),this}},{key:"isValid",value:function(){return!(!this.fromAddress||!this.toAddress)&&(!!this.signature&&(!!(new d).fromPublic(this.fromAddress).verify(this.calculateHash(),this.signature)||(console.log({hash:this.calculateHash(),signature:this.signature}),!1)))}}]),e}();e.exports=v},294:function(e,t,n){var l=n(193),r=n(194);n(19),n(80),n(47),n(196);var o=n(295),c=n(139),d=function(){"use strict";function e(data,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";l(this,e),this.data=data,this.timestamp=c(t).unix(),this.hash=void 0,this.previousHash=n,this.hash=this.calculateHash(),this.nonce=0}return r(e,[{key:"calculateHash",value:function(){var e=JSON.stringify(this.data),pattern=this.previousHash+this.timestamp+this.nonce+e;return o(pattern).toString()}},{key:"mine",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2;for(Date.now();this.hash.slice(0,e)!=="0".repeat(e);)this.nonce++,this.hash=this.calculateHash();Date.now()}}]),e}();e.exports=d},299:function(e,t){},301:function(e,t){},302:function(e,t){},339:function(e,t,n){"use strict";n.r(t);var l=n(12),r=(n(42),n(54),n(79)),o=n(290),c=n(292),d=n.n(c),v=n(294),f=n.n(v),m=Object(r.c)({props:{blockchain:{type:Object,required:!0},wallets:{type:Array,required:!0}},setup:function(e){var t=Object(r.j)().$sleep,n=e.wallets,c=e.blockchain,v=Object(r.h)(null),m=Object(r.h)(null),h=function(){v.value=null,m.value=null},y=function(){var e=Object(l.a)(regeneratorRuntime.mark((function e(n,l){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!m.value){e.next=7;break}if(m.value.index!==l){e.next=3;break}return e.abrupt("return",h());case 3:return v.value=null,m.value=null,e.next=7,t(500);case 7:m.value=Object.assign({},n,{index:l}),v.value="edit";case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return{action:v,closePanel:h,onWalletClick:y,selectedWallet:m,createWallet:function(){h(),y({name:"",amount:0},n.length),v.value="create"},actionSaveCreate:function(){var e=(new o.KeyGenerator).generate(),t=e.publicKey,l=e.privateKey;if(n.push({name:m.value.name,publicKey:t,privateKey:l}),m.value.amount>0){var r=new d.a(c.system.publicKey,t,m.value.amount).sign(c.system.privateKey),v=new f.a([r]);v.previousHash=c.getLastBlock().hash,v.mine(),c.chain.push(v)}h()},actionSaveEdit:function(){n[m.value.index].name=m.value.name,h()}}}}),h=m,y=n(41),component=Object(y.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("transition",[n("div",{staticClass:"rounded pt-4 overflow-hidden flex flex-col bg-gray-50"},[n("div",{staticClass:"px-4 flex justify-between"},[n("div",{staticClass:"text-2xl font-semibold"},[e._v("\n          Wallets\n        ")]),e._v(" "),n("div",[n("button",{staticClass:"\n              rounded\n              px-2 py-1 text-xs\n              bg-gray-100 text-gray-600\n            ",on:{click:e.createWallet}},[n("font-awesome-icon",{attrs:{icon:["fas","plus"]}}),e._v(" New\n          ")],1)])]),e._v(" "),n("div",{staticClass:"relative"},[n("transition-group",{staticClass:"wallets transition-all duration-300 relative flex flex-row space-x-10",attrs:{name:"block"}},e._l(e.wallets,(function(t,i){return n("div",{key:"key-"+i,staticClass:"\n              transition-all duration-300 cursor-pointer\n              wallet flex flex-col justify-center\n              text-center hover:bg-blue-700 hover:border-blue-800\n            ",on:{click:function(n){return e.onWalletClick(t,i)}}},[n("div",{staticClass:"text-xl font-semibold text-gray-100"},[e._v("\n              "+e._s(t.name)+"\n            ")]),e._v(" "),n("div",{staticClass:"text-gray-200"},[e._v("\n              "+e._s(e.blockchain.getBalance(t.publicKey))+" Coin\n            ")])])})),0)],1)])]),e._v(" "),n("transition",{attrs:{name:"panels"}},[e.action?n("div",{staticClass:"mt-4 flex-1 rounded pt-4 overflow-hidden flex flex-col bg-gray-50"},[n("div",{staticClass:"px-4 flex space-x-2"},[n("div",[n("button",{staticClass:"rounded px-2 py-1 text-xs bg-red-100 text-red-600",on:{click:e.closePanel}},[n("font-awesome-icon",{attrs:{icon:["fas","times"]}})],1)]),e._v(" "),n("div",{staticClass:"text-2xl font-bold self-center"},["create"===e.action?[e._v("\n            New Wallet\n          ")]:e._e(),e._v(" "),"edit"===e.action?[e._v("\n            Edit Wallet\n          ")]:e._e()],2)]),e._v(" "),n("div",{staticClass:"px-4 py-4 flex-1 w-full"},["edit"===e.action?[n("form",{staticClass:"w-full"},[n("div",{staticClass:"w-full md:flex md:items-center mb-6"},[n("div",{staticClass:"md:w-2/12"},[n("label",{staticClass:"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4",attrs:{for:"inline-full-name"}},[e._v("\n                  Name\n                ")])]),e._v(" "),n("div",{staticClass:"md:w-9/12"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedWallet.name,expression:"selectedWallet.name"}],staticClass:"bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",attrs:{id:"name",type:"text"},domProps:{value:e.selectedWallet.name},on:{input:function(t){t.target.composing||e.$set(e.selectedWallet,"name",t.target.value)}}})])]),e._v(" "),n("div",{staticClass:"w-full md:flex md:items-center mb-6"},[n("div",{staticClass:"md:w-2/12"},[n("label",{staticClass:"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4",attrs:{for:"inline-full-name"}},[e._v("\n                  Public Key\n                ")])]),e._v(" "),n("div",{staticClass:"md:w-9/12"},[n("input",{staticClass:"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",attrs:{id:"publicKey",disabled:!0,readonly:"",type:"text"},domProps:{value:e.selectedWallet.publicKey}})])]),e._v(" "),n("div",{staticClass:"w-full md:flex md:items-center mb-6"},[n("div",{staticClass:"md:w-2/12"},[n("label",{staticClass:"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4",attrs:{for:"inline-full-name"}},[e._v("\n                  Private Key\n                ")])]),e._v(" "),n("div",{staticClass:"md:w-9/12"},[n("input",{staticClass:"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",attrs:{id:"privateKey",disabled:!0,readonly:"",type:"text"},domProps:{value:e.selectedWallet.privateKey}})])]),e._v(" "),n("div",{staticClass:"w-full md:flex md:items-center mb-6"},[n("div",{staticClass:"md:w-2/12"}),e._v(" "),n("div",{staticClass:"md:w-9/12"},[n("Button",{attrs:{text:"Save"},nativeOn:{click:function(t){return t.preventDefault(),e.actionSaveEdit.apply(null,arguments)}}})],1)])])]:"create"===e.action?[n("form",{staticClass:"w-full"},[n("div",{staticClass:"w-full md:flex md:items-center mb-6"},[n("div",{staticClass:"md:w-2/12"},[n("label",{staticClass:"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4",attrs:{for:"inline-full-name"}},[e._v("\n                  Name\n                ")])]),e._v(" "),n("div",{staticClass:"md:w-9/12"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedWallet.name,expression:"selectedWallet.name"}],staticClass:"bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",attrs:{id:"name",type:"text"},domProps:{value:e.selectedWallet.name},on:{input:function(t){t.target.composing||e.$set(e.selectedWallet,"name",t.target.value)}}})])]),e._v(" "),n("div",{staticClass:"w-full md:flex md:items-center mb-6"},[n("div",{staticClass:"md:w-2/12"},[n("label",{staticClass:"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4",attrs:{for:"inline-full-name"}},[e._v("\n                  Initial Balance\n                ")])]),e._v(" "),n("div",{staticClass:"md:w-9/12"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedWallet.amount,expression:"selectedWallet.amount"}],staticClass:"bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",attrs:{id:"name",type:"number"},domProps:{value:e.selectedWallet.amount},on:{input:function(t){t.target.composing||e.$set(e.selectedWallet,"amount",t.target.value)}}})])]),e._v(" "),n("div",{staticClass:"w-full md:flex md:items-center mb-6"},[n("div",{staticClass:"md:w-2/12"}),e._v(" "),n("div",{staticClass:"md:w-9/12"},[n("Button",{attrs:{text:"Save"},nativeOn:{click:function(t){return t.preventDefault(),e.actionSaveCreate.apply(null,arguments)}}})],1)])])]:e._e()],2)]):e._e()])],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Button:n(287).default,Button:n(287).default})}}]);