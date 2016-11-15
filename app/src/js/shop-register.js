define(['doc', 'modal', 'pictureService','ajax', 'form', 'ENV'], function($, $modal, $pictureService, ajax, form, ENV) {
    'use strict'

    var ALREADY_REPORTED = 208,
        NOT_ACCEPTABLE   = 406,
        pictureIdToAsign = undefined,
        $form = $('#registerForm');


    $('#hasInternetDevice').on('change', function() {
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
            var $pictureBox = $('.picture').addClass('loading-picture');
            $pictureBox.removeClass('loaded-error-picture');

            var reader = new FileReader();

            reader.onload = function (e) {
                $form.find('.preview').attr('src', e.target.result);
            }

            var pictureFile = this.files[0];

            $pictureService.store(pictureFile, {
                'success': function(pictureId) {
                    pictureIdToAsign = pictureId;
                    $pictureBox.removeClass('loading-picture');
                    $pictureBox.removeClass('loaded-error-picture');
                    $pictureBox.addClass('loaded-picture');
                },
                'largeSize': function() {
                    showMessage(".large-size-image-upload-message");
                    $pictureBox.removeClass('loading-picture');
                    $pictureBox.addClass('loaded-error-picture');
                },
                'error': function() {
                    showMessage(".error-image-upload-message");
                    $pictureBox.removeClass('loading-picture');
                    $pictureBox.addClass('loaded-error-picture');
                }
            });

            reader.readAsDataURL(pictureFile);
        }
    });

    form.validate('#registerForm', {
        success: function(event) {
            event.preventDefault;

            var $fab = $form.find('.bt-confirm-register');

            $fab.first().disabled = true;
            $fab.addClass('loading');

            var preMarket = {
                name: $form.find('[name="name"]').val(),
                cnpj: $form.find('[name="cnpj"]').val(),
                email: $form.find('[name="email"]').val(),
                address: {
                    cep: $form.find('[name="cep"]').val(),
                    state: $form.find('[name="state"]').val(),
                    city: $form.find('[name="city"]').val(),
                    address: $form.find('[name="address"]').val(),
                    number: $form.find('[name="number"]').val(),
                    neighborhood: $form.find('[name="neighborhood"]').val()
                },
                has_delivery: $form.find('[name="hasDelivery"]').first().checked
            };

            if (pictureIdToAsign != undefined) {
                preMarket.picture = { 
                    id: pictureIdToAsign,
                    name: $form.find('[name="picture"]').first().files[0].name
                };
            }

            ajax.post(ENV.api.premarkets, preMarket, {
                'success': function(response, xhr) {
                    if (response.status === ALREADY_REPORTED) {
                        showMessage(".waiting-approval-message");
                        return;
                    }
                    $modal.show('.modal-success', function() {
                        $form.find('.required').addClass('disabled');
                        $form.find('.fab').addClass('fab-disabled');

                        $form.find('.mandatory').each(function(element) {
                            element.disabled = true;
                        });
                    });
                },
                'error': function(response, xhr) {
                    if (xhr.status === NOT_ACCEPTABLE) {
                        showMessage(".market-already-approved-message");
                        return;
                    } 
                    showMessage(".error-api-message");
                },
                'complete': function(xhr) {
                    $fab.first().disabled = false;
                    $fab.removeClass('loading');
                }
            },{
                async: true,
                headers : { "Content-Type": "application/json" }
            });
        },
        error: function() {
            showMessage(".empty-fields-message");
        }
    });

    var showMessage = function(messageClass) {
        var $invalidMessage = $form.find(messageClass);
        $invalidMessage.toggleClass('hide');
        setTimeout(function() {
            $invalidMessage.addClass('hide');
        },4000);
    }

});