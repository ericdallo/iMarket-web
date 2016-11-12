FROM node:4-onbuild

ENV IMARKET_WEB_HOME /opt/imarket-web

RUN mkdir -p /opt/app

COPY . /opt/app
WORKDIR /opt/app

RUN npm install

ENTRYPOINT /opt/app/docker/startup.sh

EXPOSE 8080