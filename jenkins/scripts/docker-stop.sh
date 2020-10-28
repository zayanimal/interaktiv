#!/bin/bash

# остановить и удалить контейнер бэка
if [[ -n $(docker ps --filter "name=node-backend" -qa) ]]; then
    docker stop $(docker ps --filter "name=node-backend" -qa)
    docker rm $(docker ps --filter "name=node-backend" -qa)
fi
