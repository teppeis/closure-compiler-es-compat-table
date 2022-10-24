#!/bin/bash -eux

git checkout "$GITHUB_REF"

git clone https://github.com/asdf-vm/asdf.git $HOME/.asdf --branch v0.10.2
source $HOME/.asdf/asdf.sh
sudo apt-get install dirmngr gpg curl gawk
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf install nodejs 0.10.48

version=$(npm show google-closure-compiler@nightly --json|jq -r .version)

./run.mjs es6/nightly
./run.mjs es2016plus/nightly
./run.mjs esnext/nightly
./replace-lambda-stacktrace.sh

if [ -z "$(git status --porcelain)" ]; then
    echo "No updates"
    exit
fi

echo "Updated"
git diff
git config --local user.name "GitHub Actions Bot"
git config --local user.email "github-actions-bot@users.noreply.github.com"
git add .
git commit --message "update nightly result with $version (build: $GITHUB_RUN_ID:$GITHUB_RUN_NUMBER) [skip ci]" > /dev/null
git push "$GITHUB_SERVER_URL/$GITHUB_REPOSITORY.git" "HEAD:master"
