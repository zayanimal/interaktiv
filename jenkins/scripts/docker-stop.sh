#!/bin/bash

# остановить контейнер бэка
if [[ -n $(docker ps --filter "name=node-backend" -qa) ]]; then
    docker stop $(docker ps --filter "name=node-backend" -qa)
    docker rm $(docker ps --filter "name=node-backend" -qa)
else
    docker run -d -p 8000:3000 --name=node-backend zayanimal/node-backend:v1
fi
