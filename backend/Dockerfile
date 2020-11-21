FROM node:12.13

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm run build

COPY . ./

CMD ["npm", "run", "start:prod"]

# docker run --name nest-backend --rm -p -p 8000:8000 -v ${PWD}:/app -v /app/node_modules --network=interaktiv zayanimal/nest-backend:v1
