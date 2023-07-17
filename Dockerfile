FROM postgres
COPY init.sql /var/lib/pgadmin/docker-entrypoint-initdb.d
