# mount folder into /data

FROM node
RUN export DEBIAN_FRONTEND=noninteractive && \
    apt update && \
    apt install -y wget python ffmpeg && \
    wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl && \
    chmod a+rx /usr/local/bin/youtube-dl 
RUN youtube-dl -U

COPY app/package.json /app/package.json

WORKDIR /app

RUN npm install

COPY /app /app

CMD node index.js
