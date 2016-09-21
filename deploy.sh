#!/bin/bash
set -e

npm run deploy
git subtree push --prefix dist origin gh-pages
