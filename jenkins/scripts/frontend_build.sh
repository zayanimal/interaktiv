#!/bin/bash
if [[ -n $(docker ps --filter "name=react-frontend" -qa) ]]
then
    docker stop react-frontend
fi

docker rmi zayanimal/react-frontend:v1

# монтирование образа
docker build -t zayanimal/react-frontend:v1 ./frontend/.

# сборка контейнера
docker run \
--name react-frontend \
--rm \
--network=interaktiv \
--log-opt max-size=1g \
-itd \
-v ${PWD}:/app \
-v /app/node_modules \
-e CHOKIDAR_USEPOLLING=true \
-p 3000:3000 \
zayanimal/react-frontend:v1

docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi
