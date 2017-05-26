#!/usr/bin/env bash
cd $(dirname $0)
cd ../

mkdir -p $HOME/.cache/yarn
mkdir -p $HOME/.nuget

docker-compose up &

for i in `seq 1 600`; do
	# wait for dotnet to come up
	sleep 1
	# get a response from frontend and backend
	curl localhost:48001 >/dev/null 2>&1 && curl localhost:48010 >/dev/null 2>&1
	# exit if successful
	if [ $? -eq 0 ]; then
		echo "Docker container started"
		exit 0
	fi
done

# init script did not run
>&2 echo "Docker container did not start"
exit 1
