/*!
 * AngularJS Toaster
 * Version: 0.4.10
 * Copyright 2013 Jiri Kavulak.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Jiri Kavulak
 * Related to project of John Papa and Hans Fjällemark
 */
!function(){"use strict";angular.module("toaster",["ngAnimate"]).constant("toasterConfig",{limit:0,"tap-to-dismiss":!0,"close-button":!1,"newest-on-top":!0,"time-out":5e3,"icon-classes":{error:"toast-error",info:"toast-info",wait:"toast-wait",success:"toast-success",warning:"toast-warning"},"body-output-type":"","body-template":"toasterBodyTmpl.html","icon-class":"toast-info","position-class":"toast-top-right","title-class":"toast-title","message-class":"toast-message","prevent-duplicates":!1,"mouseover-timer-stop":!0}).service("toaster",["$rootScope","toasterConfig",function(t,e){this.pop=function(e,o,s,n,i,a,r,l){if(angular.isObject(e)){var c=e;this.toast={type:c.type,title:c.title,body:c.body,timeout:c.timeout,bodyOutputType:c.bodyOutputType,clickHandler:c.clickHandler,showCloseButton:c.showCloseButton},r=c.toasterId}else this.toast={type:e,title:o,body:s,timeout:n,bodyOutputType:i,clickHandler:a,showCloseButton:l};t.$emit("toaster-newToast",r)},this.clear=function(){t.$emit("toaster-clearToasts")};for(var o in e["icon-classes"])this[o]=function(t){return function(e,o,s,n,i,a,r){angular.isString(e)?this.pop(t,e,o,s,n,i,a,r):this.pop(angular.extend(e,{type:t}))}}(o)}]).factory("toasterEventRegistry",["$rootScope",function(t){var e,o=null,s=null,n=[],i=[];return e={setup:function(){o||(o=t.$on("toaster-newToast",function(t,e){for(var o=0,s=n.length;s>o;o++)n[o](t,e)})),s||(s=t.$on("toaster-clearToasts",function(t){for(var e=0,o=i.length;o>e;e++)i[e](t)}))},subscribeToNewToastEvent:function(t){n.push(t)},subscribeToClearToastsEvent:function(t){i.push(t)},unsubscribeToNewToastEvent:function(t){var e=n.indexOf(t);e>=0&&n.splice(e,1),0===n.length&&(o(),o=null)},unsubscribeToClearToastsEvent:function(t){var e=i.indexOf(t);e>=0&&i.splice(e,1),0===i.length&&(s(),s=null)}},{setup:e.setup,subscribeToNewToastEvent:e.subscribeToNewToastEvent,subscribeToClearToastsEvent:e.subscribeToClearToastsEvent,unsubscribeToNewToastEvent:e.unsubscribeToNewToastEvent,unsubscribeToClearToastsEvent:e.unsubscribeToClearToastsEvent}}]).directive("toasterContainer",["$parse","$rootScope","$interval","$sce","toasterConfig","toaster","toasterEventRegistry",function(t,e,o,s,n,i,a){return{replace:!0,restrict:"EA",scope:!0,link:function(e,r,l){function c(t,s){t.timeoutPromise=o(function(){e.removeToast(t.id)},s,1)}function u(o){if(o.type=m["icon-classes"][o.type],o.type||(o.type=m["icon-class"]),!(m["prevent-duplicates"]===!0&&e.toasters.length>0&&e.toasters[e.toasters.length-1].body===o.body)){o.id=++v;var n=m["close-button"];if("boolean"==typeof o.showCloseButton);else if("boolean"==typeof n)o.showCloseButton=n;else if("object"==typeof n){var i=n[o.type];"undefined"!=typeof i&&null!==i&&(o.showCloseButton=i)}else o.showCloseButton=!1;switch(o.bodyOutputType=o.bodyOutputType||m["body-output-type"],o.bodyOutputType){case"trustedHtml":o.html=s.trustAsHtml(o.body);break;case"template":o.bodyTemplate=o.body||m["body-template"];break;case"templateWithData":var a=t(o.body||m["body-template"]),r=a(e);o.bodyTemplate=r.template,o.data=r.data}e.configureTimer(o),m["newest-on-top"]===!0?(e.toasters.unshift(o),m.limit>0&&e.toasters.length>m.limit&&e.toasters.pop()):(e.toasters.push(o),m.limit>0&&e.toasters.length>m.limit&&e.toasters.shift())}}function p(t){var s=e.toasters[t];s&&(s.timeoutPromise&&o.cancel(s.timeoutPromise),e.toasters.splice(t,1))}function d(){for(var t=e.toasters.length;t>=0;t--)p(t)}var m,v=0;m=angular.extend({},n,e.$eval(l.toasterOptions)),e.config={toasterId:m["toaster-id"],position:m["position-class"],title:m["title-class"],message:m["message-class"],tap:m["tap-to-dismiss"],closeButton:m["close-button"],animation:m["animation-class"],mouseoverTimer:m["mouseover-timer-stop"]},e.$on("$destroy",function(){a.unsubscribeToNewToastEvent(e._onNewToast),a.unsubscribeToClearToastsEvent(e._onClearToasts)}),e.configureTimer=function(t){var e=angular.isNumber(t.timeout)?t.timeout:m["time-out"];e>0&&c(t,e)},e.removeToast=function(t){var o,s;for(o=0,s=e.toasters.length;s>o;o++)if(e.toasters[o].id===t){p(o);break}},e.toasters=[],e._onNewToast=function(t,o){(void 0===e.config.toasterId&&void 0===o||void 0!==o&&o===e.config.toasterId)&&u(i.toast)},e._onClearToasts=function(){d()},a.setup(),a.subscribeToNewToastEvent(e._onNewToast),a.subscribeToClearToastsEvent(e._onClearToasts)},controller:["$scope","$element","$attrs",function(t){t.stopTimer=function(e){t.config.mouseoverTimer===!0&&e.timeoutPromise&&(o.cancel(e.timeoutPromise),e.timeoutPromise=null)},t.restartTimer=function(e){t.config.mouseoverTimer===!0?e.timeoutPromise||t.configureTimer(e):null===e.timeoutPromise&&t.removeToast(e.id)},t.click=function(e){if(t.config.tap===!0||e.showCloseButton===!0){var o=!0;e.clickHandler&&(angular.isFunction(e.clickHandler)?o=e.clickHandler(e,e.showCloseButton):angular.isFunction(t.$parent.$eval(e.clickHandler))?o=t.$parent.$eval(e.clickHandler)(e,e.showCloseButton):console.log("TOAST-NOTE: Your click handler is not inside a parent scope of toaster-container.")),o&&t.removeToast(e.id)}}}],template:'<div id="toast-container" ng-class="[config.position, config.animation]"><div ng-repeat="toaster in toasters" class="toast" ng-class="toaster.type" ng-click="click(toaster)" ng-mouseover="stopTimer(toaster)" ng-mouseout="restartTimer(toaster)"><button type="button" class="toast-close-button" ng-show="toaster.showCloseButton" ng-click="click(toaster)">&times;</button><div ng-class="config.title">{{toaster.title}}</div><div ng-class="config.message" ng-switch on="toaster.bodyOutputType"><div ng-switch-when="trustedHtml" ng-bind-html="toaster.html"></div><div ng-switch-when="template"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="templateWithData"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-default >{{toaster.body}}</div></div></div></div>'}}])}(window,document);