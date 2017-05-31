#!/usr/bin/env bash
cd $(dirname $0)

set -e

display_usage() {
    echo -e "\nUsage:\n$0 [alpha|beta|prod] [registry]\n"
}

# check whether user had supplied -h or --help . If yes display usage
if [[ ( $# == "--help") ||  $# == "-h" ]]
then
    display_usage
    exit 0
fi

# check number of arguments
if [ $# -ne 2 ] || ( [ $1 != "alpha" ] && [ $1 != "beta" ] && [ $1 != "prod" ] )
then
    display_usage
    exit 1
fi

version=$(date +%Y%m%d%H%M)

./images-build.sh $1 $2 $version
./images-test.sh $1 $2 $version
./images-push.sh $1 $2 $version

printf $version > version.txt
