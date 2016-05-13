FROM ubuntu:latest

# Install Utilities
RUN apt-get update -q
RUN apt-get install -yqq wget aptitude git traceroute dnsutils curl ssh sudo tree tcpdump psmisc gcc make build-essential libfreetype6 libfontconfig libkrb5-dev

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get install -yq nodejs

#Workaround for bug in latest NPM
RUN cd $(npm root -g)/npm \
 && npm install fs-extra \
 && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs\.move/ ./lib/utils/rename.js

#Update npm
RUN npm install -g npm

# Install Prerequisites
RUN npm install --quiet -g knex gulp-cli jspm karma-cli mocha typings

RUN mkdir /opt/neighbormarket
WORKDIR /opt/neighbormarket

ADD package.json /opt/neighbormarket/package.json
ADD bower.json /opt/neighbormarket/bower.json
ADD .bowerrc /opt/neighbormarket/.bowerrc

# Install packages
RUN npm install
RUN bower install --allow-root --config.interactive=false

# Share local directory on the docker container
ADD . /opt/neighbormarket

# Machine cleanup
RUN npm cache clean
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
