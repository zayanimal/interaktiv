#!/bin/bash
dockerDeploy() {
    docker rmi zayanimal/nest-backend:v1
    docker build -t zayanimal/nest-backend:v1 ./backend/.
    docker run --name nest-backend --rm --network=interaktiv -d -p 8000:8000 zayanimal/nest-backend:v1
    docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi
}

if [[ -n $(docker ps --filter "name=nest-backend" -qa) ]]
then
    docker stop nest-backend
    dockerDeploy()
else
    dockerDeploy()
fi
