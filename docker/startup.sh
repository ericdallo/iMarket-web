#!/bin/bash
set -ve

git clone https://github.com/iMarketbr/iMarket-web.git $IMARKET_WEB_HOME
cd $IMARKET_WEB_HOME

IMARKET_WEB_PROPERTIES=/opt/production.js
cp $IMARKET_WEB_PROPERTIES $IMARKET_WEB_HOME/app/src/js/env.js

./node_modules/bower/bin/bower install --allow-root
exec npm run deploy