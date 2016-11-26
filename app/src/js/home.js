define(['doc', 'form'], function($, form) {
    'use strict'

    form.mask('.cep-form .field', "#####-###", form.CEP_SIZE);
});