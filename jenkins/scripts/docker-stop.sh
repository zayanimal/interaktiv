#!/bin/bash

# остановить контейнер бэка
if [[ -n $(docker ps --filter "name=backend" -qa) ]]; then
    docker stop $(docker ps --filter "name=backend" -qa)
fi


# удалить контейнер бэка
if [[ -n $(docker ps --filter "name=backend" -qa) ]]; then
    docker rm $(docker ps --filter "name=backend" -qa)
fi
