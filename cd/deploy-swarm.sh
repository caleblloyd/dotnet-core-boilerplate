#!/usr/bin/env bash
cd $(dirname $0)

# stop on errors
set -e
./common.sh $@
export DEVENV=$1
export REGISTRY=$2
export TAG=$3

docker stack deploy --with-registry-auth -c ./swarm/stack.yml boxboat-blog-$DEVENV
