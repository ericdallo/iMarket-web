define(['doc', 'form'], function($, form) {
    'use strict'

    $('#hasInternetDevice').on('click', function() {
        var isChecked = this.checked;

        $('.shop-register .required').toggleClass('disabled');

        $('.mandatory').each(function(element) {
            element.disabled = !isChecked;
        });
    });

    form.mask($('.shop-register .cep'), "#####-###", form.CEP_SIZE);
    form.mask($('.shop-register .cnpj'), "##.###.###/####-##", form.CNPJ_SIZE);

});