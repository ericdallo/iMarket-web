'use strict';

const http2 = require('spdy'),
    http = require('http'),
    express = require('express'),
    path = require('path'),
    app = express(),
    fs = require('fs');

var root = path.join(__dirname, 'dist/');

app.use(express.static(root, {extensions: ['html']}));

app.get('/:marketUrl/mercado', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/templates/market/home.html'));
});

if (process.env.PROD) {
    var options = {
        key: fs.readFileSync(__dirname + '/../imarketbr.com.key'),
        cert:  fs.readFileSync(__dirname + '/../imarketbr.com.crt')
    }

    http2.createServer(options, app)
        .listen(8080, (error) => {
            if (error) {
                console.error(error)
                return process.exit(1);
            } else {
                console.log('Started server on port: 8080');
            }
      });
} else {
    http.createServer(app)
        .listen(8080, (error) => {
            if (error) {
                console.error(error)
                return process.exit(1);
            } else {
                console.log('Started server on port: 8080');
            }
      });
}