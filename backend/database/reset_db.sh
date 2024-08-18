source ../.env
psql $db_URL -f DDL/reset.sql