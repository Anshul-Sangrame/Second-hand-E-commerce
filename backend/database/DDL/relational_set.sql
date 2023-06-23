CREATE TABLE IF NOT EXISTS ratings(
   user_id INT REFERENCES users(id),
   product_id INT REFERENCES products(id),
   score INT CHECK( 0<= score and score <= 5),
   PRIMARY KEY(user_id,product_id)
);

CREATE TABLE IF NOT EXISTS carts(
   user_id INT REFERENCES users(id),
   product_id INT REFERENCES products(id),
   qty INT CHECK(qty > 0),
   PRIMARY KEY(user_id,product_id)
);
