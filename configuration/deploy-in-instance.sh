#!/bin/bash

APP=imarket-web

docker pull imarket/$APP:latest
if docker ps | awk -v app="APP" 'NR>1{  ($(NF) == APP )  }'; then
  docker stop "$APP" && docker rm -f "$APP"
fi
docker run --name $APP -d -p 8080:8080 -v /opt/production.js:/opt/app/app/src/js/env.js imarket/$APP