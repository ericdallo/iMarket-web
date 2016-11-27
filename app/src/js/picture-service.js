define('pictureService', ['ENV'], function(ENV) {
    'use strict'

    return {
        'store': function(file, callback) {
            var formData = new FormData();
            formData.append("file", file);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", ENV.api.premarketsPicture, true);
            xhr.addEventListener("load", function (response) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    callback.success.call(this, xhr.responseText);
                } else if(xhr.status === 413) {
                    callback.largeSize.call(this);
                } else {
                    callback.error.call(this);
                }
            });
            xhr.send(formData);
        }
    }
});