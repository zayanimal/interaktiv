FROM node:13.12.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

CMD ["npm", "run", "start"]

# docker run -it --rm  -v ${PWD}:/app -v /app/node_modules -p 3000:3000 --network=interaktiv zayanimal/react-frontend:v1
