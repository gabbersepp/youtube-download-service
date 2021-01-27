apt update
apt install -y wget
wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl
chmod a+rx /usr/local/bin/youtube-dl 
apt install python
youtube-dl -U
apt install ffmpeg
