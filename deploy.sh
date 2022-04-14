#!/usr/bin/env sh
# 当发生错误时中止脚本
set -e

# 构建
yarn build
#cp dist/index.html dist/404.html

# cd 到构建输出的目录下
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://TaitChan.github.io/Vue-Learning
git push -f git@github.com:TaitChan/Vue-Learning.git master:gh-pages

cd -