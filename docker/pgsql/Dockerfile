FROM postgres:13.0-alpine

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=secret
ENV POSTGRES_DB=postgres
ENV PGDATA=/var/lib/postgresql/data/pgdata

VOLUME /usr/local/pgsql/data:/var/lib/postgresql/data/pgdata

EXPOSE 5432
