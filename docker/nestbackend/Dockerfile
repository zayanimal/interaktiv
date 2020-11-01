FROM node:12.13-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# Second Stage : Setup command to run your app
FROM node:12.13-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 8000
CMD ["npm", "run", "start:prod"]

# docker run --name nest-backend -d -v /var/jenkins_home/workspace/interaktiv/backend:/var/www/interaktiv -p 8000:8000 zayanimal/nest-backend:v1

# Create PostgresSQL container
# docker run --name=pgsql -d -p 5432:5432 -v $(pwd)/database/pgsql:/pgdata postgres

# Access to bash in container
# docker exec -it interaktiv bash
