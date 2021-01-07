#!/bin/bash
if [[ -n $(docker ps --filter "name=nest-backend" -qa) ]]
then
    docker stop nest-backend
fi

docker rmi zayanimal/nest-backend:v1

# монтирование образа
docker build -t zayanimal/nest-backend:v1 ./backend/.

# сборка контейнера
docker run \
--name nest-backend \
--log-opt max-size=1g \
--rm \
--network=interaktiv \
-d \
-p 8000:8000 \
zayanimal/nest-backend:v1

docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi
