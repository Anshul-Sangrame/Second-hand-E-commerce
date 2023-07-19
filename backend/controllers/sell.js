import pool from "../database/db.js";
import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'
import { unlinkSync } from 'node:fs';
import pkg from 'pg';
const { DatabaseError } = pkg;


// // Configure Cloudinary (Harsh's details exposed, upload all kinds of bikini)
// cloudinary.config({
//   cloud_name: 'dewdm6hiz',
//   api_key: '687984954841828',
//   api_secret: 'OPHyVY8I2N21CLcjG-tsRFAU7Cg'
// });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export default async function Sell(req, res) {
  try {
    const product = req.body;

    const options = {
      folder: 'second-e-commerce',
    }

    if (!req.file) {
      res.status(401).send("no valid image");
      return
    }

    const img = await cloudinary.uploader.upload(req.file.path, options);

    const image_url = img.secure_url;
    const public_id = img.public_id;

    // Save the product details to your database, including the imageUrl and public id
    const query =
      'INSERT INTO products (title, description, tag, cost, qty, image_url, public_id, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [product.title, product.description, product.tags, product.cost, product.qty, image_url, public_id, req.user_id];
    await pool.query(query, values);
    res.send("Done");
  } catch (err) {
    
    if (err instanceof DatabaseError) {
      console.error(err.message);
      res.status(401).send(err.message);
    }
    else {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
  finally {
    if (req.file && req.file.path) {
      unlinkSync(req.file.path);
    }
  }
}
