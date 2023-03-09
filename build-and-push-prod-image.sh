#!/bin/bash

##############################
# This builds and pushes our application image
#
# The nginx/React static files get built with an environment variable
# that sets the url of the DRF backend REACT_APP_BASE_URL.  Once you
# know the IP address of your EC2 instance, you would pass that in
# instead of localhost
##############################

BASE_URL=$1
NEW_VERSION=$2

docker buildx build --platform linux/amd64 --build-arg REACT_APP_BASE_URL=$BASE_URL -t AaronShipman/complete:$NEW_VERSION . --no-cache

docker push AaronShipman/complete:$NEW_VERSION
