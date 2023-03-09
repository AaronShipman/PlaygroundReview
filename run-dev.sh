#!/bin/bash

docker run -e SECRET_KEY=notReallySecret -e DEBUG=True -p 80:80 AaronShipman/complete:1.0