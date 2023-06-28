import pool from "../database/db.js";

export default async function sell(req, res) {
  const { title, description, tags, cost, qty } = req.body;

  const products = {
    title,
    description,
    tags,
    cost,
    qty,
  };

  try {
    const query = 'INSERT INTO products (title, description, tags, cost, qty) VALUES ($1, $2, $3, $4, $5)';
    const values = [products.title, products.description, products.tags, products.cost, products.qty];

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(query, values);
      await client.query('COMMIT');
      console.log('Item inserted successfully');
      res.json({ message: 'Form submitted successfully' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error inserting item into the database:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
