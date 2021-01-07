FROM postgres:13.0-alpine

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=secret
ENV POSTGRES_DB=postgres
ENV PGDATA=/var/lib/postgresql/data/pgdata

EXPOSE 5432

# docker run \
# --name=pgsql \
# --network=interaktiv \
# --log-opt max-size=1g \
# -d -p 5432:5432 \
# -v /usr/local/pgsql/data:/var/lib/postgresql/data/pgdata zayanimal/pgsql:v1

# для этого контейнера есть образ в docker hub: zayanimal/pgsql:v1
