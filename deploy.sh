#!/bin/bash

docker rm -f `docker ps -aq -f name=neighbormarket_*`

set -a
source .env

docker-compose -p "neighbormarket_" up -d 