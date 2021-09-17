(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{336:function(t,e,n){"use strict";n.r(e);var l=n(12),o=(n(56),n(54),n(79)),c=Object(o.c)({props:{blockchain:{type:Object,required:!0},wallets:{type:Array,required:!0}},setup:function(t){var e=Object(o.j)().$sleep,n=Object(o.h)(!1),c=Object(o.h)(!1),r=Object(o.h)(null),d=function(){var t=document.querySelector(".blocks"),e=t.querySelectorAll(".block-chain"),n=e[e.length-1].getBoundingClientRect().left+t.scrollWidth;t.scrollTo({left:n,behavior:"smooth"}),c.value=!1},v=function(){var t=Object(l.a)(regeneratorRuntime.mark((function t(l,o){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r.value){t.next=6;break}if(r.value.index!==o){t.next=3;break}return t.abrupt("return",f());case 3:return r.value=null,t.next=6,e(500);case 6:r.value=Object.assign({index:o},l),n.value=!0;case 8:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),f=function(){r.value=null,n.value=!1},x=function(t){var e=document.querySelector(".blocks"),n=e.scrollLeft,l=e.scrollWidth-e.clientWidth;c.value=n<l-25};return Object(o.f)((function(){document.querySelector(".blocks").addEventListener("scroll",x),window.addEventListener("resize",x);try{setTimeout(d,1e3)}catch(t){}})),Object(o.e)((function(){try{document.querySelector(".blocks").removeEventListener("scroll",x)}catch(t){}window.removeEventListener("resize",x)})),{blocksCompactView:n,showBtnScrollToLeft:c,selectedBlock:r,blocksScrollLeft:d,onBlockClick:v,closeTransactionsPanel:f}}}),r=c,d=n(41),component=Object(d.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("transition",[n("div",{staticClass:"rounded pt-4 overflow-hidden flex flex-col bg-gray-50"},[n("div",{staticClass:"px-4 flex justify-between"},[n("div",{staticClass:"text-2xl font-semibold"},[t._v("\n          Block\n        ")]),t._v(" "),n("div",[n("button",{staticClass:"\n              rounded\n              px-2 py-1 text-xs\n              bg-gray-100 text-gray-600\n            ",class:{"bg-gray-300":!t.blocksCompactView},on:{click:function(e){t.blocksCompactView=!t.blocksCompactView}}},[n("font-awesome-icon",{attrs:{icon:["fas","align-justify"]}})],1),t._v(" "),n("button",{staticClass:"\n              rounded\n              px-2 py-1 text-xs\n              bg-gray-100 text-gray-600\n            ",class:{"bg-gray-300":t.blocksCompactView},on:{click:function(e){t.blocksCompactView=!t.blocksCompactView}}},[n("font-awesome-icon",{attrs:{icon:["fas","align-left"]}})],1)])]),t._v(" "),n("div",{staticClass:"px-4 pt-1 text-xs text-gray-500"},[t._v("\n        * For creating block, you must make transaction first.\n      ")]),t._v(" "),n("div",{staticClass:"relative"},[n("transition",{attrs:{name:"button-scroll-to-left"}},[t.showBtnScrollToLeft?n("button",{staticClass:"absolute rounded-full text-sm bottom-0 right-0 mb-6 mr-4 z-10 block py-2 px-4 shadow-xl text-gray-100 bg-blue-500",on:{click:t.blocksScrollLeft}},[n("font-awesome-icon",{attrs:{icon:["fas","chevron-right"]}})],1):t._e()]),t._v(" "),n("transition-group",{staticClass:"blocks transition-all duration-300 relative flex flex-row space-x-10",attrs:{name:"block"}},t._l(t.blockchain.chain,(function(e,i){return n("div",{key:"key-"+i,staticClass:"\n              transition-all duration-300 cursor-pointer\n              block-chain relative rounded border-2 border-gray-500\n              hover:border-blue-500\n            ",class:{"border-blue-500":t.selectedBlock&&t.selectedBlock.index===i},on:{click:function(n){return t.onBlockClick(e,i)}}},[n("div",{staticClass:"title py-2 px-3 font-semibold border-b border-gray-500"},[t._v("\n              Block "+t._s(i+1)+"\n              "),0===i?n("span",{staticClass:"text-xs"},[t._v("(Genesis Block)")]):t._e()]),t._v(" "),t.blocksCompactView?t._e():n("div",[n("div",{staticClass:"text-sm p-2 border-b border-gray-500"},[n("div",{staticClass:"mb-2"},[n("div",{staticClass:"font-semibold"},[t._v("Hash")]),t._v(" "),n("div",{staticClass:"truncate text-pink-600"},[t._v(t._s(e.hash))])]),t._v(" "),n("div",[n("div",{staticClass:"font-semibold"},[t._v("Previous Block Hash")]),t._v(" "),n("div",{staticClass:"truncate text-purple-600"},[t._v(t._s(e.previousHash))])])]),t._v(" "),n("div",{staticClass:"text-sm p-2 border-b border-gray-500"},[n("div",{staticClass:"mb-2"},[n("div",{staticClass:"font-semibold"},[t._v("Nonce")]),t._v(" "),n("div",{staticClass:"truncate"},[t._v(t._s(e.nonce))])])]),t._v(" "),n("div",{staticClass:"text-sm p-2 border-b border-gray-500"},[n("div",{staticClass:"mb-2"},[n("div",{staticClass:"font-semibold"},[t._v("Transaction Count")]),t._v(" "),n("div",{staticClass:"truncate"},[t._v(t._s(e.data.length))])])])]),t._v(" "),0!==i?n("div",{staticClass:"chain"}):t._e()])})),0)],1)])]),t._v(" "),n("transition",{attrs:{name:"panels"}},[t.selectedBlock?n("div",{staticClass:"mt-4 flex-1 rounded pt-4 overflow-hidden flex flex-col bg-gray-50"},[n("div",{staticClass:"px-4 flex space-x-2"},[n("div",[n("button",{staticClass:"\n              rounded\n              px-2 py-1 text-xs\n              bg-red-100 text-red-600\n            ",on:{click:t.closeTransactionsPanel}},[n("font-awesome-icon",{attrs:{icon:["fas","times"]}})],1)]),t._v(" "),n("div",{staticClass:"text-2xl font-bold self-center"},[t._v("\n          Transactions\n          "),n("span",{staticClass:"text-xs"},[t._v("\n            Inside Block "+t._s(t.selectedBlock.index+1)+"\n          ")])])]),t._v(" "),n("div",{staticClass:"px-4 py-2 flex-1 w-full"},[0===t.selectedBlock.data.length?n("div",[t._v("\n          This block has no transactions.\n        ")]):t._e(),t._v(" "),t._l(t.selectedBlock.data,(function(e,i){return n("div",{key:i,staticClass:"\n            rounded\n            text-gray-700 bg-gray-100 hover:bg-gray-200\n            px-4 py-2\n            flex flex-col md:flex-row space-x-4\n            mb-2\n            overflow-x-hidden\n          "},[n("div",{staticClass:"w-1/12 text-3xl text-center self-center text-blue-500"},[t._v("\n            "+t._s(i+1)+"\n          ")]),t._v(" "),n("div",{staticClass:"w-10/12 flex flex-col"},[n("div",{staticClass:"flex"},[n("div",{staticClass:"truncate font-semibold"},[t._v("\n                From :\n                "),e.fromAddress===t.blockchain.system.publicKey?n("span",{staticClass:"text-blue-500"},[t._v("\n                  System\n                ")]):n("span",{staticClass:"text-gray-500"},[t._v("\n                  "+t._s(e.fromAddress)+"\n                ")])])]),t._v(" "),n("div",{staticClass:"flex"},[n("div",{staticClass:"truncate font-semibold"},[t._v("\n                To :\n                "),n("span",{staticClass:"text-gray-500"},[t._v(t._s(e.toAddress))])])]),t._v(" "),n("div",{staticClass:"flex"},[n("div",{staticClass:"truncate font-semibold"},[t._v("\n                Amount :\n                "),n("span",{staticClass:"text-gray-500"},[t._v(t._s(e.amount)+" Coin")])])])]),t._v(" "),n("div",{staticClass:"w-1/12 text-3xl text-center self-center text-gray-400"},[e.isValid()?n("font-awesome-icon",{staticClass:"text-green-500",attrs:{icon:["fas","check"]}}):n("font-awesome-icon",{staticClass:"text-red-500",attrs:{icon:["fas","times"]}})],1)])}))],2)]):t._e()])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Button:n(287).default})}}]);