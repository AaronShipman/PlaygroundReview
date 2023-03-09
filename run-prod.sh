#!/bin/sh

export SECRET_KEY=$1
export VERSION=$2

docker run -e SECRET_KEY=$SECRET_KEY -e DEBUG=False -p 80:80 AaronShipman/complete:$VERSION
