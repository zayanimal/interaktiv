FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

# docker run --name react-frontend -d --rm -v ${PWD}:/app -v /app/node_modules -e CHOKIDAR_USEPOLLING=true -p 3000:3000 --network=interaktiv zayanimal/react-frontend:v1
