FROM mysql:8.0

COPY ./scripts/logiexpress_db.sql /docker-entrypoint-initdb.d/
COPY ./scripts/logiexpress_db_inserts.sql /docker-entrypoint-initdb.d/