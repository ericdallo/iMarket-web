var path = require('path');
var fs = require('fs');
var pp = require('preprocess');
var forEachInDir = require('foreach-in-dir');

forEachInDir.recursive('./app/src', function (filename, done) {
    var dist = filename.replace('src', 'dist');

    if (!fs.existsSync(dist) && !dist.includes('.')) {
        fs.mkdirSync(dist);
    } else if (filename.includes('.html')) {

        var context = require('./app/context.js');

        pp.preprocessFile(filename, dist, context.vars);
    }
    done();
});

