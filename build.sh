#!/bin/bash

rm -rf platforms/ www/
ionic cordova build android — release — prod — aot
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore gametown-release-key.keystore platforms/android/build/outputs/apk/release/app-release-unsigned.apk gametown
zipalign -v 4 platforms/android/build/outputs/apk/release/app-release-unsigned.apk gametown-app.apk
