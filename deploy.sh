#!/bin/bash
set -e

npm run deploy
git push origin `git subtree split --prefix dist master`:gh-pages --force
