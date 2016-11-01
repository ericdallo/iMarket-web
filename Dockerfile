FROM node:4-onbuild

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json /opt/app/
RUN npm install

COPY . /opt/app

EXPOSE 8080
CMD ["npm", "run", "start"]