FROM app:latest

RUN apt-get update -q
RUN apt-get install -yqq xvfb libxss1 gconf-service libasound2 libgconf-2-4 libnspr4 libnss3 libpango1.0-0 fonts-liberation libcurl3 xdg-utils libatk1.0-0 libcups2 libgdk-pixbuf2.0-0 libgtk2.0-0 libappindicator1
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome*.deb


