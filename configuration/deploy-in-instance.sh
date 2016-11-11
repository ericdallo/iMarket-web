#!/bin/bash

APP_WEB=imarket-web

docker pull imarket/$APP_WEB:latest
if docker ps | awk -v app="APP_WEB" 'NR>1{  ($(NF) == APP_WEB )  }'; then 
	docker stop "$APP_WEB" && docker rm -f "$APP_WEB" 
fi
docker run --name $APP_WEB -d -p 8080:8080 -v /opt/production.js:/opt/app/app/src/js/env.js imarket/$APP_WEB