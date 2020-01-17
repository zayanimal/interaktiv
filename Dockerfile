FROM node:13.6.0

RUN npm install -g nodemon

WORKDIR /var/www/interaktiv

CMD npm install && nodemon index.js

EXPOSE 80

# Create Node container
# docker run -d -v $(pwd)/backend:/var/www/interaktiv -p 3000:3000 --network=interaktiv-network --name=interaktiv node-interaktiv

# Create PostgresSQL container
# docker container run -d --name=pgsql -p 5432:5432 -e POSTGRES_PASSWORD=secret -e PGDATA=pgdata -v $(pwd)/database/pgsql:/pgdata postgres

# Access to bash in container
# docker exec -it interaktiv bash  
