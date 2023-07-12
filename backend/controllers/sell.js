import pool from "../database/db.js";
import multer from 'multer';
import cloudinary from 'cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dewdm6hiz',
  api_key: '687984954841828',
  api_secret: 'OPHyVY8I2N21CLcjG-tsRFAU7Cg'
});

const upload = multer({});//it handles the file handling //it is necessary to include this 

app.use(express.json());
app.use(express.static('public'));

export default async function sell(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file selected' });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Retrieve the Cloudinary image URL
    const imageUrl = result.secure_url;

    // Saving  the image URL to our database
    // Performing the necessary operations to store the imageUrl in our database

    const { title, description, tags, cost, qty } = req.body;

    const product = {
      title,
      description,
      tags,
      cost,
      qty,
      image_url: imageUrl, // Use the image URL received from the frontend
    };

    // Save the product details to your database
    // ...
    const query =
      'INSERT INTO products (title, description, tags, cost, qty, image_url) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [product.title, product.description, product.tags, product.cost, product.qty, product.image_url];

    await pool.query(query, values);

    console.log('Product inserted successfully');
    res.json({ message: 'Product inserted successfully' });
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
