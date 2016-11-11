#!/bin/bash

APP_WEB=imarket-web
BUCKET_DIR=/opt/bucket

cp -rfv $BUCKET_DIR/$APP_WEB/prod/production.js /opt

docker pull imarket/$APP_WEB
if docker ps | awk -v app="APP_WEB" 'NR>1{  ($(NF) == APP_WEB )  }'; then 
	docker stop "$APP_WEB" && docker rm -f "$APP_WEB" 
fi
docker run --name $APP_WEB -d -p 8080:8080 \
	-v /opt/production.js:/opt/app/app/src/js/env.js \
	-v /opt/imarketbr.com.crt:/opt/app/imarketbr.com.crt \
	-v /opt/imarketbr.com.key:/opt/app/imarketbr.com.key \
	imarket/$APP_WEB
