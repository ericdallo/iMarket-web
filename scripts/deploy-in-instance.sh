#!/bin/bash

BUCKET_DIR=/tmp/bucket

mkdir -p $BUCKET_DIR
gcsfuse configuration.imarketbr.com $BUCKET_DIR

cp $BUCKET_DIR/imarket-web/prod/production.js /tmp
fusermount -u $BUCKET_DIR
rm -r $BUCKET_DIR

docker pull imarket/imarket-web:latest

docker run --name imarket-web -p 80:8080 -v /tmp/production.js:/opt/app/app/src/js/env.js imarket/imarket-web
