#!/bin/sh
docker run \
 --net=iot-net \
 --name iot-alexa \
 -d iot/alexa
