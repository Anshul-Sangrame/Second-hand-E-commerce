CREATE TABLE IF NOT EXISTS users(
   id SERIAL PRIMARY KEY,
   first_name VARCHAR(20) NOT NULL,
   last_name VARCHAR(20) NOT NULL,
   email VARCHAR(200) NOT NULL UNIQUE CHECK(email ~ '^[[:graph:]]+\@[[:graph:]]+\.[[:graph:]]+'),
   password TEXT NOT NULL,
   city VARCHAR(20),
   state VARCHAR(20),
   address TEXT,
   phone VARCHAR(10) CHECK(phone ~ '^[0-9]{10}'),
   DOB date,
   cart_cost INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    title varchar(30),
    description text,
    tag varchar(20),
    cost INTEGER,
    image_url VARCHAR(255),
    public_id VARCHAR(255),
    qty INTEGER CHECK(qty >= 0),
    views INT DEFAULT 0,
    owner_id INT REFERENCES users(id) ON DELETE CASCADE
);