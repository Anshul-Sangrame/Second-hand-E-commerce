CREATE TABLE IF NOT EXISTS views(
   user_id INT REFERENCES users(id),
   product_id INT REFERENCES products(id),
   PRIMARY KEY(user_id,product_id)
);

CREATE TABLE IF NOT EXISTS carts(
   user_id INT REFERENCES users(id),
   product_id INT REFERENCES products(id),
   qty INT CHECK(qty > 0),
   PRIMARY KEY(user_id,product_id)
);
