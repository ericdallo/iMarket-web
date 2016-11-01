#!/bin/bash
set -e

# Image build
docker build -t imarket-web .

# Push image to registry

