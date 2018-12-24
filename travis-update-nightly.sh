#!/bin/bash -eux

curl -L git.io/nodebrew | perl - setup
export PATH=$HOME/.nodebrew/current/bin:$PATH
nodebrew install 0.10

version=$(npm i --no-save google-closure-compiler@nightly | grep google-closure-compiler@ | sed -e 's/.*@//')
echo "version: $version"
# ./run.js es6/1.0-SNAPSHOT
# ./run.js es2016plus/1.0-SNAPSHOT
./run.js esnext/1.0-SNAPSHOT

if [ -z "$(git status --porcelain)" ]; then
    echo "No updates"
    exit
fi

echo "Updated"
git diff
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git add .
git commit --message "update nightly result with $version (travis #$TRAVIS_BUILD_NUMBER)"
git push "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" "HEAD:nightly-tmp"
