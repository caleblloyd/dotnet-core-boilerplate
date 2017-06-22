#!/usr/bin/env bash
cd $(dirname $0)

# stop on errors
set -e
./common.sh $@
export DEVENV=$1
export REGISTRY=$2
export TAG=$3

echo "Building environment: $1, registry: $2, version: $3"
cd ../build/docker/prod

# copy dotnet assets
echo "Building backend Assets"
docker exec app-dev-dotnet app-publish
mkdir -p dotnet/stage/dotnet
rm -rf dotnet/stage/dotnet/App
docker cp app-dev-dotnet:/tmp/publish dotnet/stage/dotnet/App

# copy nginx assets
echo "Building frontend Assets"
rm -rf ../../../ui/dist/* ../../../ui/dist-ssr/*
docker exec app-dev-ui app-publish
mkdir -p nginx/stage/var
rm -rf nginx/stage/var/www
docker cp app-dev-ui:/ui/dist nginx/stage/var/www
mkdir -p ui-ssr/stage
rm -rf ui-ssr/stage/ui
docker cp app-dev-ui:/ui/dist-ssr ui-ssr/stage/ui
docker cp app-dev-ui:/ui/dist/index.html ui-ssr/stage/ui

# build images
echo "Building Images"
docker-compose build
