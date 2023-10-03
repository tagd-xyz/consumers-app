#!/usr/bin/env bash

source ${DTK_HOME}/lib/node.sh

npm install -g eslint

yarn install --production=false

eslint --ext .js,.vue --ignore-path .gitignore src/

