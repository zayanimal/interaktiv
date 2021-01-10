docker run \
--name nest-backend-dev \
--network=interaktiv \
-d \
-p 8000:8000 \
--log-opt max-size=1g \
zayanimal/nest-backend-dev:v1
