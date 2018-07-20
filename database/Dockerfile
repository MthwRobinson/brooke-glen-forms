# base image
FROM postgres:10.4-alpine

# run create.sql on init
ADD create_database.sql /docker-entrypoint-initdb.d
