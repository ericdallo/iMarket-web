define('form', ['doc'], function($) {
    'use strict';

    var appendErrorClass = function(label) {
        if (label.find('.invalid-field').isEmpty()) {
            label.addClass('invalid-field');
        }
    };

    var removeValidationErrors = function(form) {
        form.find('.invalid-field').each(function(el) {
            $(el).removeClass('invalid-field');
        });
    };

    var isEmpty = function(value) {
        if (value === null || value === undefined || value.trim() === '') {
            return true;
        }
        return false;
    };

    var isValid = function(form) {
        var valid = true;

        removeValidationErrors(form);

        form.find('[required]').each(function(element){
            if (isEmpty($(element).val())) {
                appendErrorClass($(element));
                valid = false;
            }
        });
        return valid;
    };

    var applyMask = function(field, mask, event) {
        var BACKSPACE_KEY = 8;

        var position = 0,
            newField = "",
            key = event.keyCode,
            digits = field.value.toString().replace(/\-|\.|\/|\(|\)| /g, "");

        var maskSize = digits.length;

        if (key != BACKSPACE_KEY) {
            for(var i = 0; i <= maskSize; i++) {
                var hasMask  = ((mask.charAt(i) == "-") || (mask.charAt(i) == ".") || 
                            (mask.charAt(i) == "/")) || ((mask.charAt(i) == "(") || 
                            (mask.charAt(i) == ")") || (mask.charAt(i) == " "));
                if (hasMask) { 
                    newField += mask.charAt(i); 
                    maskSize++;
                } else {
                    newField += digits.charAt(position);
                    position++;
                }
            }
            field.value = newField;
        }
        
        return true;
    }

    var isDigit = function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value)
    }

    return {
        'CEP_SIZE': 9,
        'CNPJ_SIZE': 18,

        'isDigit': function(value) {
            return isDigit(value);
        },
        'mask': function (field, mask, maxValue) {
            $(field).on('keypress', function (event) {
                if(this.value.length === maxValue || !isDigit(event.key)) {
                    event.preventDefault();
                }
                applyMask(this, mask, event);
            });
        },
        'validate': function (form, configs) {
            var $form = $(form);
            $form.attr('novalidate', true);
            $form.throttle('submit', function() {
                if (isValid.call(this, $form)) {
                    configs && configs.success && configs.success.apply(this, arguments);
                } else {
                    configs && configs.error && configs.error.apply(this, arguments);
                }
            });
        }
    }
});