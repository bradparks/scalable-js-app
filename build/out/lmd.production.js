(function(a,b){var c={},d={},e=function(f){var g=c[f],h;return d[f]&&g?g:(typeof g=="string"&&(g=(0,a.eval)(g)),h={exports:{}},d[f]=1,c[f]=h.exports,g?typeof g=="function"&&(g=g(b[f]?null:e,h.exports,h)||h.exports):g=a[f],c[f]=g)},f=function(a){var b={exports:{}};switch(typeof a){case"function":a(e,b.exports,b);break;case"object":for(var g in a)d[g]=0,c[g]=a[g]}return f};return f})(window,{MessageView:!0,DataGenerator:!0,Logger:!0,Hook:!0})({Core:'(function(a,b){"use strict";var c=a("$"),d=a("Template"),e=a("Sandbox"),f=a("EventManager"),g=function(a,b){return function(){return a.apply(b,arguments)}},h={descriptor:{},descriptors:{},locales:{},templates:{},runningModules:{},init:function(){this.descriptor=a("descriptor"),this.descriptors=a("descriptors"),this.templates=a("templates"),this.locales=a("locales"),this._initModules()},_initModules:function(){for(var a=0,b=this.descriptor.modules.length;a<b;a++)this.initModule(this.descriptor.modules[a])},initModule:function(b){if(this.runningModules[b])return this;var c=new e(this.descriptors[b]);return this.runningModules[b]=a(b),this.runningModules[b].init(c),this},destroyModule:function(a){return this.runningModules[a]&&(this.runningModules[a].destroy(),f.unbind("."+a),this.getBox().html(""),delete this.runningModules[a]),this},getBox:function(a){return c(this.descriptor.layout[a])},getTemplate:function(a,b){return typeof this.templates[a]=="string"&&(this.templates[a]=c("<div/>").html(this.templates[a])),d(this.templates[a].find(b).html())},getText:function(a,b){var c=this.locales[a][b];return(typeof c=="object"?c[this.descriptor.locale]:c)||b}},i={trigger:g(f.trigger,f),bind:g(f.bind,f),unbind:g(f.unbind,f),on:g(f.bind,f),init:g(h.init,h),destroyModule:g(h.destroyModule,h),initModule:g(h.initModule,h),getTemplate:g(h.getTemplate,h),getText:g(h.getText,h),getBox:g(h.getBox,h)};for(var j in i)b[j]=i[j]})',Template:'(function(){return function(a,b){var c=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj||{}){p.push(\'"+String(a).replace(/[\\r\\t\\n]/g," ").split("{%").join("\\t").replace(/((^|%})[^\\t]*)\'/g,"$1\\r").replace(/\\t=(.*?)%}/g,"\',$1,\'").split("\\t").join("\');").split("%}").join("p.push(\'").split("\\r").join("\\\\\'")+"\');}return p.join(\'\');");return b?c(b):c}})',EventManager:'(function(a){var b=a("$");return{$:b("<div/>"),hooks:{},trigger:function(a,b){if(this.hooks[a]){var c=this.hooks[a](b);if(c===!1)return this;b=c||b}return this.$.trigger.apply(this.$,[a,b]),this},bind:function(){return this.$.bind.apply(this.$,arguments),this},unbind:function(){return this.$.unbind.apply(this.$,arguments),this},hook:function(a,b){return this.hooks[a]=b,this},unhook:function(a){return delete this.hooks[a],this}}})',Sandbox:'(function(a){var b=a("Core"),c=a("EventManager"),d=function(a){this.descriptor=a||{}};return d.prototype.getBox=function(){return b.getBox(this.descriptor.name)},d.prototype.is=function(){var a=this.descriptor.acl;if(a["*"])return!0;for(var b=0,c=arguments.length,d;b<c;b++){d=arguments[b];if(!a[d]&&!a[d.split(":")[0]+":*"])return!1}return!0},d.prototype.bind=function(a,b){return this.is("listen:"+a)&&c.bind(a+"."+this.descriptor.name,b),this},d.prototype.unbind=function(a,b){return this.is("listen:"+a)&&c.unbind(a+"."+this.descriptor.name,b),this},d.prototype.trigger=function(a,b){return this.is("trigger:"+a)&&c.trigger(a,b||{}),this},d.prototype.hook=function(a,b){return this.is("hook:"+a)&&c.hook(a,b),this},d.prototype.unhook=function(a){return this.is("hook:"+a)&&c.unhook(a),this},d.prototype.getText=function(a){return b.getText(this.descriptor.name,a)},d.prototype.getResource=function(a){return this.descriptor.resources[a]},d.prototype.getTemplate=function(a){return b.getTemplate(this.descriptor.name,a)},d})',locales:{MessageView:{text_label:{ru:"Он сказал: ",en:"He said: "}},DataGenerator:{},Logger:{},Hook:{}},templates:{MessageView:'<div class="b-message-view">\r\n    <span class="b-message-view__label">{%=label%}</span><span class="b-message-view__value">{%=value%}</span>\r\n</div>'},descriptors:{MessageView:{name:"MessageView",acl:{"trigger:newData:display":!0,"listen:newData":!0},resources:{}},DataGenerator:{name:"DataGenerator",acl:{"trigger:newData":!0},resources:{interval:1e3}},Logger:{name:"Logger",acl:{"listen:newData":!0,"listen:ready":!0},resources:{}},Hook:{name:"Hook",acl:{"hook:*":!0},resources:{}}},descriptor:{modules:["MessageView","DataGenerator","Logger","Hook"],layout:{MessageView:".b-message-view"},locale:"ru",path:{descriptor:"./app/descriptors/",module:"./app/modules/",locale:"./app/locales/",template:"./app/templates/"}},MessageView:'(function(a,b,c){"use strict";var d,e=function(a){var b=this;this.sandbox=a,this.template=a.getTemplate(".b-message-view"),this.label=a.getText("text_label"),this.$box=a.getBox(),a.bind("newData",function(a,c){b.update(c)})};return e.prototype.update=function(a){var b=this.template({label:this.label,value:a});this.$box.html(b),this.sandbox.trigger("newData:display")},{init:function(a){d=new e(a)},destroy:function(){d=null}}})',DataGenerator:'(function(a,b,c){"use strict";var d;return{init:function(a){d=setInterval(function(){a.trigger("newData",Math.random())},a.getResource("interval"))},destroy:function(){clearInterval(d)}}})',Logger:'(function(a,b,c){"use strict";var d=function(a,b){console.log(a.type,b)};return{init:function(a){a.bind("newData",d),a.bind("ready",d)},destroy:function(){}}})',Hook:'(function(a,b,c){"use strict";var d;return{init:function(a){d=a,a.hook("newData",function(a){return typeof a=="string"?!1:(a<.5&&(a*=100),a)})},destroy:function(){d.unhook("newData")}}})'})(function(b,c,d){"use strict",b("Core").init()})