#!/bin/sh
docker run --rm \
 --net=iot-net \
 --name iot-alexa \
 -it iot/alexa
