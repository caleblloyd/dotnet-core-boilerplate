#!/usr/bin/env bash
cd $(dirname $0)

# stop on errors
set -e
./common.sh $@
export DEVENV=$1
export REGISTRY=$2
export TAG=$3

docker stack deploy -c ../../build/swarm/docker-compose.yml boxboat-blog-$DEVENV
