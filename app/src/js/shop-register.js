define(['doc', 'form'], function($, form) {
    'use strict'

    $('#hasInternetDevice').on('click', function() {
        var isChecked = this.checked;

        $('.shop-register .required').toggleClass('disabled');

        $('.mandatory').each(function(element) {
            element.disabled = !isChecked;
        });
    });


    $('.shop-register .cep').on('keypress', function (event) {
        if(this.value.length === form.CEP_SIZE || !form.isDigit(event.key)) {
            event.preventDefault();
        }
        form.mask(this, "#####-###", event);
    });


});