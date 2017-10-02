#!/usr/bin/env bash
cd $(dirname $0)

# run the following command as the "system:admin" user
# oc adm policy add-scc-to-user anyuid system:serviceaccount:boxboat:default

oc create -f db-dc.yml
oc create -f db-service.yml
oc create -f app-secret.yml
oc create -f app-dc.yml
oc create -f app-service.yml
