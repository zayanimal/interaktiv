docker run \
--name react-frontend-dev \
--log-opt max-size=1g \
-v /home/zayanimal:/etc/nginx/certs \
-d \
-p 80:80 \
-p 443:443 \
--network=interaktiv \
zayanimal/react-frontend-dev:v1
