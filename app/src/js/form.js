define('form', [], function() {
    'use strict';

    var applyMask = function(field, mask, event) {
        const BACKSPACE_KEY = 8;

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
        'mask': function ($field, mask, maxValue) {
            $field.on('keypress', function (event) {
                if(this.value.length === maxValue || !isDigit(event.key)) {
                    event.preventDefault();
                }
                applyMask(this, mask, event);
            });
        }
    }
});