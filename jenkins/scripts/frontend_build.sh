#!/bin/bash
dockerDeploy() {
    echo "$(docker rmi zayanimal/react-frontend:v1)"
    echo "$(docker build -t zayanimal/react-frontend:v1 ./frontend/.)"
    echo "$(docker run --name react-frontend --rm --network=interaktiv -d -p 8000:8000 zayanimal/react-frontend:v1)"
    echo "$(docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi)"
}

if [[ -n $(docker ps --filter "name=react-frontend" -qa) ]]
then
    docker stop react-frontend
    dockerDeploy()
else
    dockerDeploy()
fi
