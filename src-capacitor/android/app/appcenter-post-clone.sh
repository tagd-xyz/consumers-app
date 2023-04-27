#!/usr/bin/env bash

echo "---[ POST-CLONE ]--------------------------------------------------------------"

# fail if any command fails
set -e
# debug log
set -x

# Required nodeJS version
NODE_VERSION=16.16.0

# workaround to override the v8 alias
npm config delete prefix
. ~/.bashrc
nvm install "$NODE_VERSION"
nvm use ${NODE_VERSION}

# install quasar
yarn global add @quasar/cli

# go to root of project
cd ../../..

# install dependencies
yarn install

# create .env.production
echo "${DOTENV}" | base64 -d > .env

# add debug info
echo "DEBUG_ENABLED=true" >> .env
echo "DEBUG_BUILD_ID=${APPCENTER_BUILD_ID}" >> .env
echo "DEBUG_BRANCH=${APPCENTER_BRANCH}" >> .env

# debug only
# pwd
# ls -la
# cat .env

# go to src-capacitor and install dependencies there
cd src-capacitor
yarn install

# run optimized production build
quasar build -m capacitor -T android --skip-pkg

# copy the web assets to the native projects and updates the native plugins and dependencies based in package.json
npx cap sync android

echo "---[ POST-CLONE ]--------------------------------------------------------------"
