#!/bin/bash -eux

git checkout "$TRAVIS_BRANCH"

curl -L git.io/nodebrew | perl - setup
export PATH=$HOME/.nodebrew/current/bin:$PATH
nodebrew install 0.10

npm show google-closure-compiler@nightly

./run.js es6/nightly
./run.js es2016plus/nightly
./run.js esnext/nightly

if [ -z "$(git status --porcelain)" ]; then
    echo "No updates"
    exit
fi

echo "Updated"
git diff
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git add .
git commit --message "update nightly result with $version (travis: $TRAVIS_BUILD_NUMBER) [skip ci]"
git push "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" "HEAD:master"
