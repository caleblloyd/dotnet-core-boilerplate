#!/usr/bin/env bash
cd $(dirname $0)

display_usage() {
    echo -e "\nUsage:\n$0 [alpha|beta|prod] [registry] [version]\n"
}

# check whether user had supplied -h or --help . If yes display usage
if [[ ( $# == "--help") ||  $# == "-h" ]]
then
    display_usage
    exit 0
fi

# check number of arguments
if [ $# -ne 3 ] || ( [ $1 != "alpha" ] && [ $1 != "beta" ] && [ $1 != "prod" ] )
then
    display_usage
    exit 1
fi
