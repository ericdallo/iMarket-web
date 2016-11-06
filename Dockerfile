FROM node:4-onbuild

ENV IMARKET_WEB_HOME /opt/app

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package.json /opt/app
RUN npm install

ENTRYPOINT /opt/app/docker/startup.sh

COPY . /opt/app

EXPOSE 8080