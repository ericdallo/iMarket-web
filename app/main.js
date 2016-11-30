'use strict';

const http2 = require('spdy'),
    http = require('http'),
    fs = require('fs'),
    app = require('./routes.js').build(),
    port = 8080;

if (process.env.PROD) {
    var options = {
        key: fs.readFileSync(__dirname + '/../imarketbr.com.key'),
        cert:  fs.readFileSync(__dirname + '/../imarketbr.com.crt')
    }

    http2.createServer(options, app)
        .listen(port, (error) => {
            if (error) {
                console.error(error)
                return process.exit(1);
            } else {
                console.log('Started server on port: ' + port);
            }
      });
} else {
    http.createServer(app)
        .listen(port, (error) => {
            if (error) {
                console.error(error)
                return process.exit(1);
            } else {
                console.log('Started server on port: ' + port);
            }
      });
}