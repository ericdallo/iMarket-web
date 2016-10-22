define(['doc', 'form'], function($, form) {
    'use strict'

    var $form = $('#registerForm');

    $('#hasInternetDevice').on('click', function() {
        var isChecked = this.checked;

        $form.find('.required').toggleClass('disabled');
        $form.find('.fab').toggleClass('fab-disabled');

        $form.find('.mandatory').each(function(element) {
            element.disabled = !isChecked;
        });
    });

    form.mask($form.find('.cep').first(), "#####-###", form.CEP_SIZE);
    form.mask($form.find('.cnpj').first(), "##.###.###/####-##", form.CNPJ_SIZE);

    $form.find('#shopPicture').on('change', function() {
        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $form.find('.preview').attr('src', e.target.result);
            }

            reader.readAsDataURL(this.files[0]);
        }
    });

    form.validate('#registerForm', {
        success: function() {
            
        },
        error: function() {
            var $invalidMessage = $form.find('.invalid-message');
            $invalidMessage.toggleClass('hide');
            setTimeout(function() {
                $invalidMessage.addClass('hide');
            },4000);
        }
    });

});