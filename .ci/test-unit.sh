#!/usr/bin/env bash
cd $(dirname $0)

set -e

docker exec app-dev-dotnet app-test-unit
