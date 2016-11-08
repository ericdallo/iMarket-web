#!/bin/bash

APP=imarket-web
BUCKET_DIR=/tmp/bucket

mkdir -p $BUCKET_DIR
gcsfuse configuration.imarketbr.com $BUCKET_DIR

cp $BUCKET_DIR/$APP/prod/production.js /tmp
fusermount -u $BUCKET_DIR
rm -r $BUCKET_DIR

docker pull imarket/$APP:latest
if docker ps | awk -v app="APP" 'NR>1{  ($(NF) == APP )  }'; then
  docker stop "$APP" && docker rm -f "$APP"
fi
docker run --name $APP -d -p 80:8080 -v /tmp/production.js:/opt/app/app/src/js/env.js imarket/$APP