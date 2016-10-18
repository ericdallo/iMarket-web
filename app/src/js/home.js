define(['doc', 'form'], function($, form) {

    $('.cep-form .field').on('keypress', function (event) {
        if(this.value.length === form.CEP_SIZE || !form.isDigit(event.key)) {
            event.preventDefault();
        }
        form.mask(this, "#####-###", event);
    });
});