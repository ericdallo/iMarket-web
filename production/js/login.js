define(["doc","ajax","form","loggedUser","ENV"],function(o,n,e,i,s){"use strict";var t=o("#loginForm");e.validate("#loginForm",{success:function(e){e.preventDefault;var t={username:o(this).find('[name="email"]').val(),password:o(this).find('[name="password"]').val()};n.post(s.api.login,t,{success:function(o,n){i.store(o),window.location="/"},error:function(o,n){a(".invalid-fields-message")},complete:function(o){}},{async:!0})},error:function(){a(".empty-fields-message")}}),t.find(".btn-facebook").on("click",function(o){o.preventDefault(),FB.login(function(o){"connected"===o.status?(window.location="/",console.log("con",o)):"not_authorized"===o.status?console.log("not_a",o):console.log("erro")},{scope:"public_profile,email"})});var a=function(o){var n=t.find(o);n.toggleClass("hide"),setTimeout(function(){n.addClass("hide")},4e3)}});