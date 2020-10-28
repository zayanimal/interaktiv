FROM node:12.13-alpine As development

WORKDIR /var/www/interaktiv

COPY ./backend/package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /var/www/interaktiv

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /var/www/interaktiv/dist ./dist

CMD ["node", "dist/main"]

EXPOSE 8000

# Create Node container
# docker run -d -v $(pwd)/backend:/var/www/interaktiv -p 3000:3000 --network=interaktiv-network --name=interaktiv node-interaktiv

# Create PostgresSQL container
# docker container run -d --name=pgsql -p 5432:5432 -e POSTGRES_PASSWORD=secret -e PGDATA=pgdata -v $(pwd)/database/pgsql:/pgdata postgres

# Access to bash in container
# docker exec -it interaktiv bash
