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

// Event Products routes
server.get('/event-products', (req, res) => {
  res.json(db['event-products'] || []);
});

server.get('/event-products/:id', (req, res) => {
  const product = db['event-products']?.find(p => String(p.id) === String(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Event product not found' });
  }
});

server.post('/event-products', (req, res) => {
  if (!db['event-products']) {
    db['event-products'] = [];
  }
  const newProduct = {
    id: db['event-products'].length > 0 ? String(Math.max(...db['event-products'].map(p => parseInt(p.id) || 0)) + 1) : "1",
    ...req.body
  };
  db['event-products'].push(newProduct);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json(newProduct);
});

server.put('/event-products/:id', (req, res) => {
  const index = db['event-products']?.findIndex(p => String(p.id) === String(req.params.id));
  if (index !== -1) {
    db['event-products'][index] = { ...db['event-products'][index], ...req.body, id: String(req.params.id) };
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db['event-products'][index]);
  } else {
    res.status(404).json({ error: 'Event product not found' });
  }
});

server.delete('/event-products/:id', (req, res) => {
  const index = db['event-products']?.findIndex(p => String(p.id) === String(req.params.id));
  if (index !== -1) {
    const deleted = db['event-products'].splice(index, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Event product not found' });
  }
});

// Events routes
server.get('/events', (req, res) => {
  res.json(db.events || []);
});

server.get('/events/:id', (req, res) => {
  const event = db.events?.find(e => String(e.id) === String(req.params.id));
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

server.post('/events', (req, res) => {
  if (!db.events) {
    db.events = [];
  }
  const newEvent = {
    id: db.events.length > 0 ? String(Math.max(...db.events.map(e => parseInt(e.id) || 0)) + 1) : "1",
    ...req.body
  };
  db.events.push(newEvent);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json(newEvent);
});

server.put('/events/:id', (req, res) => {
  const index = db.events?.findIndex(e => String(e.id) === String(req.params.id));
  if (index !== -1) {
    db.events[index] = { ...db.events[index], ...req.body, id: String(req.params.id) };
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.events[index]);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

server.delete('/events/:id', (req, res) => {
  const index = db.events?.findIndex(e => String(e.id) === String(req.params.id));
  if (index !== -1) {
    const deleted = db.events.splice(index, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

// Testimonials routes
server.get('/testimonials', (req, res) => {
  res.json(db.testimonials || []);
});

server.get('/testimonials/:id', (req, res) => {
  const testimonial = db.testimonials?.find(t => String(t.id) === String(req.params.id));
  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({ error: 'Testimonial not found' });
  }
});

server.post('/testimonials', (req, res) => {
  if (!db.testimonials) {
    db.testimonials = [];
  }
  const newTestimonial = {
    id: db.testimonials.length > 0 ? String(Math.max(...db.testimonials.map(t => parseInt(t.id) || 0)) + 1) : "1",
    ...req.body
  };
  db.testimonials.push(newTestimonial);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json(newTestimonial);
});

server.put('/testimonials/:id', (req, res) => {
  const index = db.testimonials?.findIndex(t => String(t.id) === String(req.params.id));
  if (index !== -1) {
    db.testimonials[index] = { ...db.testimonials[index], ...req.body, id: String(req.params.id) };
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.testimonials[index]);
  } else {
    res.status(404).json({ error: 'Testimonial not found' });
  }
});

server.delete('/testimonials/:id', (req, res) => {
  const index = db.testimonials?.findIndex(t => String(t.id) === String(req.params.id));
  if (index !== -1) {
    const deleted = db.testimonials.splice(index, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Testimonial not found' });
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
});
