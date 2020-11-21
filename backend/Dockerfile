FROM node:12.13

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm", "run", "start:prod"]

# docker run \
#     --name nest-backend \
#     --rm \
#     -d \
#     -p 8000:8000 \
#     -v ${pwd}:/app
#     -v /app/node_modules \
#     --network=interaktiv \
#     zayanimal/nest-backend:v1
