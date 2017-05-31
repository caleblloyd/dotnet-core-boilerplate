#!/usr/bin/env bash
cd $(dirname $0)

kubectl create -f db-deployment.yml
kubectl create -f db-service.yml
kubectl create -f app-secret.yml
kubectl create -f app-deployment.yml
kubectl create -f app-service.yml
