FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

# docker run \
# --name frontend \
# --log-opt max-size=1g \
# -v /etc/letsencrypt/live/interaktiv.iskor.ru:/etc/nginx/certs \
# -d \
# -p 80:80 \
# -p 443:443 \
# --rm \
# --network=interaktiv \
# zayanimal/frontend:v1

# docker run -p 80:80 --rm --network=interaktiv -it zayanimal/frontend bash
# certbot -d interaktiv.iskor.ru --manual --preferred-challenges http certonly