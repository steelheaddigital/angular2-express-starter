FROM node:latest

# Install Prerequisites
RUN npm install --quiet -g node-gyp knex gulp-cli

RUN mkdir /opt/app && mkdir /opt/app/server
WORKDIR /opt/app/server

# Share local directory on the docker container
COPY ./server /opt/app/server

RUN npm install

# Machine cleanup
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
