#!/bin/bash

export NAMESPACE=${NAMESPACE:-staging}

# @param <delete|apply|diff>
function kubernetes {
	sed 's|staging|'$NAMESPACE'|g' skaffold.yaml > skaffold-applied.yaml
	skaffold run --tail -f skaffold-applied.yaml
}

$@
