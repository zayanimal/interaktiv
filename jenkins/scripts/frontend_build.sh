#!/bin/bash
if [[ -n $(docker ps --filter "name=react-frontend" -qa) ]]
then
    docker stop react-frontend
fi

docker rmi zayanimal/react-frontend:v1
docker build -t zayanimal/react-frontend:v1 ./frontend/.
docker run --name react-frontend --rm --network=interaktiv -p -e CHOKIDAR_USEPOLLING=true -p 80:3000 zayanimal/react-frontend:v1
docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi
