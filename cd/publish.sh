#!/usr/bin/env bash
cd $(dirname $0)

set -e

./common.sh $@

# version=$(date +%Y%m%d%H%M)

./images-build.sh $@
./images-test.sh $@
./images-push.sh $@
