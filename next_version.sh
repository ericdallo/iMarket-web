#!/bin/bash

git pull --tags

current_tag=$(git tag -l 'v*'|sed 's/v//g'|sort -n|tail -n1)

echo "current version v$current_tag"

new_tag=$((current_tag+1))

echo "next version v$new_tag"

git tag v$new_tag

git push origin --tags

