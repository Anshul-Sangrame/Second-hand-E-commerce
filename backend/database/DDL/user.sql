CREATE TABLE IF NOT EXISTS user(
    id BIGSERIAL  ,
    firstname varchar(100) NOT NULL,
    lastname varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE PRIMARY KEY,
    password varchar(50) NOT NULL,
    phonenumber int NOT NULL,
    DateofBirth  date NOT NULL,
    street_address varchar(100) NOT NULL,
    city varchar(50) NOT NULL,
    region varchar(50) NOT NULL,
    city_pincode varchar(100) NOT NULL,
);
