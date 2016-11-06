#!/bin/bash
set -ve

cd $IMARKET_WEB_HOME
exec npm run deploy
