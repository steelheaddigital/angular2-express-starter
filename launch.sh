#!/bin/bash

#if debugging, run with . or source preceding call to this script so env variables are loaded in callers shell

if [[ ! -z `docker ps -aq` ]]
then
  docker rm -f `docker ps -aq`
fi

set -a
source .env

docker-compose up -d 