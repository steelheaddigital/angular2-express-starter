FROM ubuntu:latest

RUN apt-get update -q
RUN apt-get install -yqq wget xvfb libxss1 gconf-service libasound2 libgconf-2-4 libnspr4 libnss3 libpango1.0-0 fonts-liberation libcurl3 xdg-utils libatk1.0-0 libcups2 libgdk-pixbuf2.0-0 libgtk2.0-0 libappindicator1 curl sudo

#Install Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome*.deb

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -yq nodejs

#Workaround for bug in latest NPM
RUN cd $(npm root -g)/npm \
 && npm install fs-extra \
 && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs\.move/ ./lib/utils/rename.js

#Update npm
RUN npm install -g npm

# Install Prerequisites
RUN npm install --quiet -g angular-cli


