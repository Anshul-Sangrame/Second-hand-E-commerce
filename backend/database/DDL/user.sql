CREATE TABLE IF NOT EXISTS users(
   id SERIAL PRIMARY KEY,
   name VARCHAR(30) NOT NULL UNIQUE,
   email VARCHAR(200) NOT NULL,
   username VARCHAR(30) NOT NULL,
   password TEXT NOT NULL
);