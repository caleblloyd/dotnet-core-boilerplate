#!/usr/bin/env bash
cd $(dirname $0)

display_usage() {
    echo -e "\nUsage:\n$0 [alpha|beta] [version]\n"
}

# check whether user had supplied -h or --help . If yes display usage
if [[ ( $# == "--help") ||  $# == "-h" ]]
then
    display_usage
    exit 0
fi

# check number of arguments
if [ $# -ne 2 ] || ( [ $1 != "alpha" ] && [ $1 != "beta" ] )
then
    display_usage
    exit 1
fi

# stop on errors
set -e

echo "Publishing to environment: $1 version: $2"

# copy dotnet assets
echo "Building backend Assets"
cd ../build/docker/prod
docker exec -it app-dev-dotnet app-publish
rm -rf dotnet/stage/dotnet/App
mv ../../../dotnet/src/App/Common/publish dotnet/stage/dotnet/App

# copy nginx assets
echo "Building frontend Assets"
rm -rf ../../../ui/dist/* ../../../ui/dist-ssr/*
docker exec -it app-dev-ui app-publish
rm -rf nginx/stage/var/www/*
cp -r ../../../ui/dist/* nginx/stage/var/www
rm -rf ui-ssr/stage/ui/*
cp -r ../../../ui/dist-ssr/* ui-ssr/stage/ui

# build images
echo "Building Images"
export TAG=$2
docker-compose build

# push docker images
gcloud docker -- push gcr.io/caleb-lloyd/dotvue-blog-dotnet:$2
gcloud docker -- push gcr.io/caleb-lloyd/dotvue-blog-nginx:$2
gcloud docker -- push gcr.io/caleb-lloyd/dotvue-blog-ui-ssr:$2

# deploy to kubernetes
kubectl set image deployment/dotvue-blog-$1 \
    dotnet=gcr.io/caleb-lloyd/dotvue-blog-dotnet:$2 \
    nginx=gcr.io/caleb-lloyd/dotvue-blog-nginx:$2 \
    ui-ssr=gcr.io/caleb-lloyd/dotvue-blog-ui-ssr:$2
