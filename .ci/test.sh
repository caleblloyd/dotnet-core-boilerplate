#!/usr/bin/env bash
cd $(dirname $0)

set -e

docker exec -it app-dev-dotnet app-test
