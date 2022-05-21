#!/bin/bash
set -e

export DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME:-michaelact}
export VERSION=${VERSION:-latest}

function setup-container-images {
    echo "···························"
    echo "·· creating microservices container images >>>>  ··"
    echo "···························"

    find * -type f -name "Dockerfile" -printf "%h\n" | xargs -I % sh -c "docker build -t $DOCKERHUB_USERNAME/fear-%:latest %/"
}

$@
