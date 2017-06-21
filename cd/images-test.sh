#!/usr/bin/env bash
cd $(dirname $0)
deploy_dir=$(pwd)

# stop on errors
set -e
./common.sh $@
export DEVENV=$1
export REGISTRY=$2
export TAG=$3

echo "Testing environment: $1, registry: $2, version: $3"
cd ../../build/docker/prod

docker-compose -f docker-compose.yml -f $deploy_dir/compose-image-db.yml -p image up -d
docker-compose -p image logs -f &
pid=$!

set +e

# at this point, image should be built and start within 5 seconds
sleep 5

rc1=$(curl -s -o /dev/null -w "%{http_code}" http://localhost)
rc2=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/posts)
rc3=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/authors)

# let logging catch up
sleep 1

[ $rc1 == "200" ] && [ $rc2 == "200" ] && [ $rc3 == "200" ]
rc=$?

kill $pid
wait $pid
docker-compose -p image down

if [ $rc -eq 0 ]
then
    echo "Image test passed"
else
    >&2 echo "An HTTP Request in the image test failed"
fi

exit $rc
