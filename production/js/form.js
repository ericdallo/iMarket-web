define("form",["doc"],function(t){"use strict";var i=function(t){t.find(".invalid-field").isEmpty()&&t.addClass("invalid-field")},n=function(i){i.find(".invalid-field").each(function(i){t(i).removeClass("invalid-field")})},r=function(t){return null===t||void 0===t||""===t.trim()},e=function(e){var a=!0;return n(e),e.find("[required]").each(function(n){r(t(n).val())&&(i(t(n)),a=!1)}),a},a=function(t,i,n){const r=8;var e=0,a="",c=n.keyCode,u=t.value.toString().replace(/\-|\.|\/|\(|\)| /g,""),l=u.length;if(c!=r){for(var o=0;o<=l;o++){var s="-"==i.charAt(o)||"."==i.charAt(o)||"/"==i.charAt(o)||"("==i.charAt(o)||")"==i.charAt(o)||" "==i.charAt(o);s?(a+=i.charAt(o),l++):(a+=u.charAt(e),e++)}t.value=a}return!0},c=function(t){return!isNaN(parseFloat(t))&&isFinite(t)};return{CEP_SIZE:9,CNPJ_SIZE:18,isDigit:function(t){return c(t)},mask:function(i,n,r){t(i).on("keypress",function(t){this.value.length!==r&&c(t.key)||t.preventDefault(),a(this,n,t)})},validate:function(i,n){var r=t(i);r.attr("novalidate",!0),r.throttle("submit",function(){e.call(this,r)?n&&n.success&&n.success.apply(this,arguments):n&&n.error&&n.error.apply(this,arguments)})}}});