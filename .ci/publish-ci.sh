#!/usr/bin/env bash
cd $(dirname $0)

if [ $TRAVIS_PULL_REQUEST != "false" ]; then
    echo "CI publish does not run for pull requests.  Exiting."
    exit 0
fi

DEVENV=""
if [ $TRAVIS_BRANCH == "develop" ]; then
    DEVENV="alpha"
elif [ $TRAVIS_BRANCH == "master" ]; then
    DEVENV="beta"
else
    echo "CI publish only runs on 'develop' and 'master' branches.  Exiting."
    exit 0
fi

# install gcloud if needed
if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then rm -rf $HOME/google-cloud-sdk; curl https://sdk.cloud.google.com | bash > /dev/null 2>&1; fi
source /home/travis/google-cloud-sdk/path.bash.inc
gcloud version
gcloud --quiet components update kubectl

# decrypt service account key
openssl aes-256-cbc -K $encrypted_0e4892d76640_key -iv $encrypted_0e4892d76640_iv \
  -in gcp-service-account.json.enc -out gcp-service-account.json -d

# login to google cloud platform
echo "Logging in to Google Cloud Platform"
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/gcp-service-account.json"
gcloud auth activate-service-account --key-file=gcp-service-account.json
gcloud config set project $(grep "project_id" gcp-service-account.json | cut -d '"' -f4)
gcloud container clusters get-credentials cluster-1 --zone=us-central1-c
kubectl version

# publish build
./publish.sh $DEVENV $(date +%Y%m%d%H%M)
