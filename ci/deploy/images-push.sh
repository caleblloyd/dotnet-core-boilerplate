#!/usr/bin/env bash
cd $(dirname $0)

# stop on errors
set -e
./images-common.sh $@
export DEVENV=$1
export REGISTRY=$2
export TAG=$3

echo "Publishing environment: $1, registry: $2, version: $3"
cd ../../build/docker/prod

docker push ${REGISTRY}/boxboat/boxboat-blog-dotnet:${TAG}
docker push ${REGISTRY}/boxboat/boxboat-blog-nginx:${TAG}
docker push ${REGISTRY}/boxboat/boxboat-blog-ui-ssr:${TAG}
