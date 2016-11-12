#!/bin/bash

APP_WEB=imarket-web
IMARKET_WEB_PROPERTIES=/opt/production.js

cp -rfv /opt/bucket/$APP_WEB/prod/production.js $IMARKET_WEB_PROPERTIES

if docker ps | awk -v app="APP_WEB" 'NR>1{  ($(NF) == APP_WEB )  }'; then 
    docker stop "$APP_WEB" && docker rm -f "$APP_WEB" 
fi
docker run --name $APP_WEB -d -p 8080:8080 \
    -v /opt/production.js:/opt/production.js \
    -v /opt/imarketbr.com.crt:/opt/imarketbr.com.crt \
    -v /opt/imarketbr.com.key:/opt/imarketbr.com.key \
    imarket/$APP_WEB
