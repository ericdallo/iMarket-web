#!/bin/bash
set -ve

git clone https://github.com/iMarketbr/iMarket-web.git $IMARKET_WEB_HOME

cd $IMARKET_WEB_HOME
cp /opt/production.js $IMARKET_WEB_HOME/app/src/js/env.js
cp /opt/imarketbr.com.crt $IMARKET_WEB_HOME
cp /opt/imarketbr.com.key $IMARKET_WEB_HOME

./node_modules/bower/bin/bower install --allow-root
exec npm run deploy
