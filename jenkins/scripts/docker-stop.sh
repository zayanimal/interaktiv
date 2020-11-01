#!/bin/bash

# остановить контейнер бэка
if [[ -n $(docker ps --filter "name=nest-backend" -qa) ]]; then
    docker stop nest-backend
fi
