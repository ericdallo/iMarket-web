#!/bin/bash
set -ve

cd $IMARKET_WEB_HOME

./node_modules/bower/bin/bower install --allow-root
exec npm run deploy
