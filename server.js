import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();

// Enable CORS
server.use(cors());

// JSON body parser
server.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public/uploads/products');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from public directory
server.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit per file
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (jpeg, jpg, png, webp) are allowed!'));
    }
  }
});

// File upload endpoint - multiple images
server.post('/api/upload-images', upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const filePaths = req.files.map(file => `/uploads/products/${file.filename}`);

    res.json({
      success: true,
      message: `${req.files.length} file(s) uploaded successfully`,
      paths: filePaths
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete image endpoint
server.delete('/api/delete-image', (req, res) => {
  try {
    const { imagePath } = req.body;

    if (!imagePath) {
      return res.status(400).json({ error: 'Image path is required' });
    }

    // Remove leading slash and construct full path
    const filename = imagePath.replace('/uploads/products/', '');
    const fullPath = path.join(uploadsDir, filename);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      res.json({ success: true, message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Load db.json for JSON Server routes
const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// JSON Server routes
server.get('/products', (req, res) => {
  res.json(db.products || []);
});

server.get('/products/:id', (req, res) => {
  const product = db.products?.find(p => String(p.id) === String(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

server.post('/products', (req, res) => {
  const newProduct = {
    id: db.products.length > 0 ? String(Math.max(...db.products.map(p => parseInt(p.id) || 0)) + 1) : "1",
    ...req.body
  };
  db.products.push(newProduct);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json(newProduct);
});

server.put('/products/:id', (req, res) => {
  const index = db.products.findIndex(p => String(p.id) === String(req.params.id));
  if (index !== -1) {
    db.products[index] = { ...db.products[index], ...req.body, id: String(req.params.id) };
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

server.delete('/products/:id', (req, res) => {
  const index = db.products.findIndex(p => String(p.id) === String(req.params.id));
  if (index !== -1) {
    const deleted = db.products.splice(index, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
});
