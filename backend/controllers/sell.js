import pool from "../database/db.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static('public'));

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file selected' });
    }

    // Save the image file to the database or cloud storage
    // Here, we'll just log the file details
    console.log('File uploaded:', req.file);

    res.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/api/sell', upload.single('file'), async (req, res) => {
  const { title, description, tags, cost, qty } = req.body;

  const product = {
    title,
    description,
    tags,
    cost,
    qty,
    image_url: req.file ? req.file.filename : null,
  };

  try {
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
});
