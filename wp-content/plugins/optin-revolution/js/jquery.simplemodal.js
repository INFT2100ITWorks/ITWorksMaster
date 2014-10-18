(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){var t=[],n=e(document),r=navigator.userAgent.toLowerCase(),i=e(window),s=[];var o={ieQuirks:null,msie:/msie/.test(r)&&!/opera/.test(r),opera:/opera/.test(r)};o.ie6=o.msie&&/msie 6./.test(r)&&typeof window["XMLHttpRequest"]!=="object";o.ie7=o.msie&&/msie 7.0/.test(r);o.boxModel=document.compatMode==="CSS1Compat";e.modal=function(t,n){return e.modal.impl.init(t,n)};e.modal.close=function(){e.modal.impl.close()};e.modal.focus=function(t){e.modal.impl.focus(t)};e.modal.setContainerDimensions=function(){e.modal.impl.setContainerDimensions()};e.modal.setPosition=function(){e.modal.impl.setPosition()};e.modal.update=function(t,n){e.modal.impl.update(t,n)};e.fn.modal=function(t){return e.modal.impl.init(this,t)};e.modal.defaults={appendTo:"body",focus:true,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:false,autoPosition:true,zIndex:1e3,close:true,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:"simplemodal-close",escClose:true,overlayClose:false,fixed:true,position:null,persist:false,modal:true,onOpen:null,onShow:null,onClose:null};e.modal.impl={d:{},init:function(t,n){var r=this;if(r.d.data){return false}o.ieQuirks=o.msie&&!o.boxModel;r.o=e.extend({},e.modal.defaults,n);r.zIndex=r.o.zIndex;r.occb=false;if(typeof t==="object"){t=t instanceof e?t:e(t);r.d.placeholder=false;if(t.parent().parent().size()>0){t.before(e("<span></span>").attr("id","simplemodal-placeholder").css({display:"none"}));r.d.placeholder=true;r.display=t.css("display");if(!r.o.persist){r.d.orig=t.clone(true)}}}else if(typeof t==="string"||typeof t==="number"){t=e("<div></div>").html(t)}else{alert("SimpleModal Error: Unsupported data type: "+typeof t);return r}r.create(t);t=null;r.open();if(e.isFunction(r.o.onShow)){r.o.onShow.apply(r,[r.d])}return r},create:function(n){var r=this;r.getDimensions();if(r.o.modal&&o.ie6){r.d.iframe=e('<iframe src="javascript:false;"></iframe>').css(e.extend(r.o.iframeCss,{display:"none",opacity:0,position:"fixed",height:s[0],width:s[1],zIndex:r.o.zIndex,top:0,left:0})).appendTo(r.o.appendTo)}r.d.overlay=e("<div></div>").attr("id",r.o.overlayId).addClass("simplemodal-overlay").css(e.extend(r.o.overlayCss,{display:"none",opacity:r.o.opacity/100,height:r.o.modal?t[0]:0,width:r.o.modal?t[1]:0,position:"fixed",left:0,top:0,zIndex:r.o.zIndex+1})).appendTo(r.o.appendTo);r.d.container=e("<div></div>").attr("id",r.o.containerId).addClass("simplemodal-container").css(e.extend({position:r.o.fixed?"fixed":"absolute"},r.o.containerCss,{display:"none",zIndex:r.o.zIndex+2})).append(r.o.close&&r.o.closeHTML?e(r.o.closeHTML).addClass(r.o.closeClass):"").appendTo(r.o.appendTo);r.d.wrap=e("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(r.d.container);r.d.data=n.attr("id",n.attr("id")||r.o.dataId).addClass("simplemodal-data").css(e.extend(r.o.dataCss,{display:"none"})).appendTo("body");n=null;r.setContainerDimensions();r.d.data.appendTo(r.d.wrap);if(o.ie6||o.ieQuirks){r.fixIE()}},bindEvents:function(){var r=this;e("."+r.o.closeClass).bind("click.simplemodal",function(e){e.preventDefault();r.close()});if(r.o.modal&&r.o.close&&r.o.overlayClose){r.d.overlay.bind("click.simplemodal",function(e){e.preventDefault();r.close()})}n.bind("keydown.simplemodal",function(e){if(r.o.modal&&e.keyCode===9){r.watchTab(e)}else if(r.o.close&&r.o.escClose&&e.keyCode===27){e.preventDefault();r.close()}});i.bind("resize.simplemodal orientationchange.simplemodal",function(){r.getDimensions();r.o.autoResize?r.setContainerDimensions():r.o.autoPosition&&r.setPosition();if(o.ie6||o.ieQuirks){r.fixIE()}else if(r.o.modal){r.d.iframe&&r.d.iframe.css({height:s[0],width:s[1]});r.d.overlay.css({height:t[0],width:t[1]})}})},unbindEvents:function(){e("."+this.o.closeClass).unbind("click.simplemodal");n.unbind("keydown.simplemodal");i.unbind(".simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var t=this,n=t.o.position;e.each([t.d.iframe||null,!t.o.modal?null:t.d.overlay,t.d.container.css("position")==="fixed"?t.d.container:null],function(e,t){if(t){var r="document.body.clientHeight",i="document.body.clientWidth",s="document.body.scrollHeight",o="document.body.scrollLeft",u="document.body.scrollTop",a="document.body.scrollWidth",f="document.documentElement.clientHeight",l="document.documentElement.clientWidth",c="document.documentElement.scrollLeft",h="document.documentElement.scrollTop",d=t[0].style;d.position="absolute";if(e<2){d.removeExpression("height");d.removeExpression("width");d.setExpression("height",""+s+" > "+r+" ? "+s+" : "+r+' + "px"');d.setExpression("width",""+a+" > "+i+" ? "+a+" : "+i+' + "px"')}else{var v,m;if(n&&n.constructor===Array){var g=n[0]?typeof n[0]==="number"?n[0].toString():n[0].replace(/px/,""):t.css("top").replace(/px/,"");v=g.indexOf("%")===-1?g+" + (t = "+h+" ? "+h+" : "+u+') + "px"':parseInt(g.replace(/%/,""))+" * (("+f+" || "+r+") / 100) + (t = "+h+" ? "+h+" : "+u+') + "px"';if(n[1]){var y=typeof n[1]==="number"?n[1].toString():n[1].replace(/px/,"");m=y.indexOf("%")===-1?y+" + (t = "+c+" ? "+c+" : "+o+') + "px"':parseInt(y.replace(/%/,""))+" * (("+l+" || "+i+") / 100) + (t = "+c+" ? "+c+" : "+o+') + "px"'}}else{v="("+f+" || "+r+") / 2 - (this.offsetHeight / 2) + (t = "+h+" ? "+h+" : "+u+') + "px"';m="("+l+" || "+i+") / 2 - (this.offsetWidth / 2) + (t = "+c+" ? "+c+" : "+o+') + "px"'}d.removeExpression("top");d.removeExpression("left");d.setExpression("top",v);d.setExpression("left",m)}}})},focus:function(t){var n=this,r=t&&e.inArray(t,["first","last"])!==-1?t:"first";var i=e(":input:enabled:visible:"+r,n.d.wrap);setTimeout(function(){i.length>0?i.focus():n.d.wrap.focus()},10)},getDimensions:function(){var e=this,r=typeof window.innerHeight==="undefined"?i.height():window.innerHeight;t=[n.height(),n.width()];s=[r,i.width()]},getVal:function(e,t){return e?typeof e==="number"?e:e==="auto"?0:e.indexOf("%")>0?parseInt(e.replace(/%/,""))/100*(t==="h"?s[0]:s[1]):parseInt(e.replace(/px/,"")):null},update:function(e,t){var n=this;if(!n.d.data){return false}n.d.origHeight=n.getVal(e,"h");n.d.origWidth=n.getVal(t,"w");n.d.data.hide();e&&n.d.container.css("height",e);t&&n.d.container.css("width",t);n.setContainerDimensions();n.d.data.show();n.o.focus&&n.focus();n.unbindEvents();n.bindEvents()},setContainerDimensions:function(){var e=this,t=o.ie6||o.ie7;var n=e.d.origHeight?e.d.origHeight:o.opera?e.d.container.height():e.getVal(t?e.d.container[0].currentStyle["height"]:e.d.container.css("height"),"h"),r=e.d.origWidth?e.d.origWidth:o.opera?e.d.container.width():e.getVal(t?e.d.container[0].currentStyle["width"]:e.d.container.css("width"),"w"),i=e.d.data.outerHeight(true),u=e.d.data.outerWidth(true);e.d.origHeight=e.d.origHeight||n;e.d.origWidth=e.d.origWidth||r;var a=e.o.maxHeight?e.getVal(e.o.maxHeight,"h"):null,f=e.o.maxWidth?e.getVal(e.o.maxWidth,"w"):null,l=a&&a<s[0]?a:s[0],c=f&&f<s[1]?f:s[1];var h=e.o.minHeight?e.getVal(e.o.minHeight,"h"):"auto";if(!n){if(!i){n=h}else{if(i>l){n=l}else if(e.o.minHeight&&h!=="auto"&&i<h){n=h}else{n=i}}}else{n=e.o.autoResize&&n>l?l:n<h?h:n}var p=e.o.minWidth?e.getVal(e.o.minWidth,"w"):"auto";if(!r){if(!u){r=p}else{if(u>c){r=c}else if(e.o.minWidth&&p!=="auto"&&u<p){r=p}else{r=u}}}else{r=e.o.autoResize&&r>c?c:r<p?p:r}e.d.container.css({height:n,width:r});e.d.wrap.css({overflow:i>n||u>r?"auto":"visible"});e.o.autoPosition&&e.setPosition()},setPosition:function(){var e=this,t,n,r=s[0]/2-e.d.container.outerHeight(true)/2,o=s[1]/2-e.d.container.outerWidth(true)/2,u=e.d.container.css("position")!=="fixed"?i.scrollTop():0;if(e.o.position&&Object.prototype.toString.call(e.o.position)==="[object Array]"){t=u+(e.o.position[0]||r);n=e.o.position[1]||o}else{t=u+r;n=o}e.d.container.css({left:n,top:t})},watchTab:function(t){var n=this;if(e(t.target).parents(".simplemodal-container").length>0){n.inputs=e(":input:enabled:visible:first, :input:enabled:visible:last",n.d.data[0]);if(!t.shiftKey&&t.target===n.inputs[n.inputs.length-1]||t.shiftKey&&t.target===n.inputs[0]||n.inputs.length===0){t.preventDefault();var r=t.shiftKey?"last":"first";n.focus(r)}}else{t.preventDefault();n.focus()}},open:function(){var t=this;t.d.iframe&&t.d.iframe.show();if(e.isFunction(t.o.onOpen)){t.o.onOpen.apply(t,[t.d])}else{t.d.overlay.show();t.d.container.show();t.d.data.show()}t.o.focus&&t.focus();t.bindEvents()},close:function(){var t=this;if(!t.d.data){return false}t.unbindEvents();if(e.isFunction(t.o.onClose)&&!t.occb){t.occb=true;t.o.onClose.apply(t,[t.d])}else{if(t.d.placeholder){var n=e("#simplemodal-placeholder");if(t.o.persist){n.replaceWith(t.d.data.removeClass("simplemodal-data").css("display",t.display))}else{t.d.data.hide().remove();n.replaceWith(t.d.orig)}}else{t.d.data.hide().remove()}t.d.container.hide().remove();t.d.overlay.hide();t.d.iframe&&t.d.iframe.hide().remove();t.d.overlay.remove();t.d={}}}}})