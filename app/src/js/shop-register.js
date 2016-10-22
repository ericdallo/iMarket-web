define(['doc', 'form'], function($, form) {
    'use strict'

    $('#hasInternetDevice').on('click', function() {
        var isChecked = this.checked;

        $('.shop-register .required').toggleClass('disabled');
        $('.shop-register .fab').toggleClass('fab-disabled');

        $('.mandatory').each(function(element) {
            element.disabled = !isChecked;
        });
    });

    form.mask('.shop-register .cep', "#####-###", form.CEP_SIZE);
    form.mask('.shop-register .cnpj', "##.###.###/####-##", form.CNPJ_SIZE);

    form.validate('.shop-register', {
        success: function() {
            
        },
        error: function() {
            var $invalidMessage = $('.shop-register .invalid-message');
            $invalidMessage.toggleClass('hide');
            setTimeout(function() {
                $invalidMessage.addClass('hide');
            },4000);
        }
    });

});