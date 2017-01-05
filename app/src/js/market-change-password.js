define(['doc', 'form', 'alert', 'http', 'path', 'messages', 'ENV'], function($, form, alert, $http, $path, $messages, ENV) {
    'use strict'

    var id = $path.getParameter('id'),
        token = $path.getParameter('token');

    if (!id || !token) {
        $path.home();
        return;
    }

    var $form = $('#change-password-form');

    form.validate('#change-password-form', {
        success: function(event) {
            event.preventDefault();

            var password = $form.find('[name="password"]').val(),
                confirmPassword = $form.find('[name="confirm-password"]').val();

            if (password != confirmPassword) {
                alert.error('.invalid-fields-message');
                return;
            }

            var changePasswordData = {
                id: id,
                token: token,
                password: password
            }

            $http.post(ENV.api.changePassword, changePasswordData, {
                success: function(response) {
                    $messages.addSuccess('Senha alterada com sucesso');
                    $path.redirect(ENV.login);
                },
                error: function() {
                    alert.error('.not-authorized-message');
                }
            });
        },
        error: function() {
            alert.error('.empty-fields-message');
        }
    });
});