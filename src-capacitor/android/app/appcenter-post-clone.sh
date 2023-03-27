#!/usr/bin/env bash

# Example: Change bundle name of an iOS app for non-production
# if [ "$APPCENTER_BRANCH" != "main" ];
# then
#     plutil -replace CFBundleDisplayName -string "\$(PRODUCT_NAME) Beta" $APPCENTER_SOURCE_DIRECTORY/MyApp/Info.plist
# fi


npx cap update android
# or remove capacitor-cordova-android-plugins from .gitignore

npx cap copy android
# or remove app/src/main/assets/public from .gitignore