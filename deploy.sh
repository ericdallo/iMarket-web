#!/bin/bash
set -e

npm run deploy
git push origin `git subtree split --prefix production master`:gh-pages --force
