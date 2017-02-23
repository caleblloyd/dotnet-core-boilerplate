#!/usr/bin/env bash
cd $(dirname $0)

display_usage() {
    echo -e "\nUsage:\n$0 ./publish.sh [version]\n"
}

# check whether user had supplied -h or --help . If yes display usage
if [[ ( $# == "--help") ||  $# == "-h" ]]
then
    display_usage
    exit 0
fi

# check number of arguments
if [ $# -ne 1 ]
then
    display_usage
    exit 1
fi

set -e

docker exec -it app-dev-dotnet app-publish
rm -rf dotnet/stage/dotnet/App
mv ../../../dotnet/src/App/Common/publish dotnet/stage/dotnet/App

docker exec -it app-dev-ui app-publish
rm -rf nginx/stage/var/www/*
mv ../../../ui/dist/* nginx/stage/var/www

export TAG=$1
docker-compose build
