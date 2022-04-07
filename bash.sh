#! /bin/bash
touch README.md
git init

git add README.md
git commit -m "first commit"
git remote add origin https://git.weus.cloud/weuscloud/BingWallpaper.git
git push -u origin master
