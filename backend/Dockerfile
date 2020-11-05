FROM node:12.13
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# FROM node:12.13-alpine
# WORKDIR /app
# COPY --from=builder app ./
CMD ["npm", "run", "start:prod"]

# docker run --name nest-backend --rm --network=interaktiv -d -p 8000:8000 zayanimal/nest-backend:v1
