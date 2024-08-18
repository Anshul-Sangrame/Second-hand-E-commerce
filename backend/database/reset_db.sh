source ../.env
psql $db_URL -f DDL/reset.sql
curl $prod_URL/hashAll