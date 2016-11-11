'use strict';

const http2 = require('spdy');
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

const options = {
    key: fs.readFileSync(__dirname + '/../imarketbr.com.key'),
    cert:  fs.readFileSync(__dirname + '/../imarketbr.com.crt')
}

var root = path.join(__dirname, 'dist/');

app.use(express.static(root, {extensions: ['html']}));


http2
    .createServer(options, app)
    .listen(8080, (error) => {
        if (error) {
            console.error(error)
            return process.exit(1);
        } else {
            console.log('Listening on port: 8080');
        }
  });