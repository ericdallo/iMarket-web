'use strict';

const express = require('express'),
      path = require('path'),
      app = express(),
      distPath = __dirname + '/dist/';

function buildCustomRoutes() {

    app.get('/:marketUrl/mercado', function(req, res) {
        res.sendFile(path.join(distPath + 'templates/market/home.html'));
    });

}

module.exports = {
    build: function() {
        var root = path.join(__dirname, 'dist/');

        app.use(express.static(root, {extensions: ['html']}));

        buildCustomRoutes();

        app.use(function(req, res, next){
          res.status(404)
             .sendFile(path.join(distPath + '404.html'));
        });

        app.use(function (err, req, res, next) {
          console.error(err);
        });

        return app;
    }
};