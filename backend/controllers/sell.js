import pool from "../database/db.js";
import cloudinary from 'cloudinary';
import express from 'express';
const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dewdm6hiz',
  api_key: '687984954841828',
  api_secret: 'OPHyVY8I2N21CLcjG-tsRFAU7Cg'
});

export default async function Sell(req, res) {
  try {
    if (!req.body.file) {
      return res.status(400).json({ error: 'No file selected' });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Retrieve the Cloudinary image URL
    const imageUrl = result.secure_url;

    const { product } = req.body;
    // Save the product details to your database, including the imageUrl
    const query =
      'INSERT INTO products (title, description, tags, cost, qty, image_url) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [product.title, product.description, product.tags, product.cost, product.qty, imageUrl];

    await pool.query(query, values);

    console.log('Product inserted successfully');
    res.json({ message: 'Product inserted successfully' });
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
