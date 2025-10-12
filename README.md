# Hood Agent

Hood Agent adalah platform web interaktif yang menggabungkan fitur e-commerce, manajemen proyek properti, event management, dan sistem manajemen divisi organisasi. Aplikasi ini dilengkapi dengan admin panel yang komprehensif untuk mengelola semua konten.

## Fitur Utama

### User Features

- **Landing Page** - Homepage dengan informasi lengkap tentang Hood Agent
- **Products Catalog** - Katalog produk merchandise (apparel, accessories, stationery, lifestyle items)
- **Real Estate Projects** - Showcase proyek-proyek properti
- **Events** - Informasi event dan acara terbaru
- **Divisions** - Informasi tentang divisi-divisi dalam organisasi
- **Testimonials** - Testimoni dari pengguna/klien

### Admin Features

- **Admin Authentication** - Sistem login dan register untuk admin
- **Protected Routes** - Halaman admin yang dilindungi dengan autentikasi
- **Products Management** - CRUD operations untuk produk
- **Projects Management** - CRUD operations untuk proyek properti
- **Events Management** - CRUD operations untuk event
- **Divisi Management** - CRUD operations untuk divisi organisasi
- **Admin Dashboard** - Dashboard terpusat untuk mengelola semua konten

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.14
- **Routing**: React Router DOM 7.9.4
- **HTTP Client**: Axios 1.12.2
- **Backend Mock**: JSON Server 1.0.0-beta.3
- **Linting**: ESLint 9.36.0

## Prerequisites

Pastikan Anda telah menginstall:

- Node.js (versi 16 atau lebih tinggi)
- npm atau yarn

## Instalasi

1. Clone repository ini:

```bash
git clone <repository-url>
cd Final-Hoodagent
```

2. Install dependencies:

```bash
npm install
```

## Cara Menjalankan Aplikasi

### Development Mode

Anda perlu menjalankan 2 server secara bersamaan:

1. **Terminal 1** - Jalankan Vite Development Server:

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

2. **Terminal 2** - Jalankan JSON Server (Backend):

```bash
npm run server
```

JSON Server akan berjalan di `http://localhost:5000`

### Production Build

Untuk membuild aplikasi untuk production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Kredensial Admin Default

Untuk login ke admin panel, gunakan kredensial berikut:

- **Email**: admin@hoodagent.com
- **Password**: admin123

Access admin panel di: `http://localhost:5173/admin/login`

## Struktur Proyek

```
Final-Hoodagent/
├── public/                 # Static assets
│   ├── favicon.svg
│   ├── header_img.png
│   └── vite.svg
├── src/
│   ├── assets/            # Asset files dan konfigurasi
│   │   └── assets.js
│   ├── components/        # Reusable components
│   │   ├── About.jsx
│   │   ├── Divisi.jsx
│   │   ├── Events.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── Products.jsx
│   │   ├── Projects.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Testimonials.jsx
│   ├── context/           # React Context
│   │   └── AdminAuthContext.jsx
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin pages
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── DivisiManagement.jsx
│   │   │   ├── EventsManagement.jsx
│   │   │   ├── ProductsManagement.jsx
│   │   │   └── ProjectsManagement.jsx
│   │   ├── AdminLoginPage.jsx
│   │   ├── AdminRegisterPage.jsx
│   │   ├── Home.jsx
│   │   └── ProductsPage.jsx
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── db.json                # JSON Server database
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # Documentation

```

## Available Scripts

- `npm run dev` - Menjalankan development server
- `npm run server` - Menjalankan JSON Server
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint untuk check code quality

## API Endpoints (JSON Server)

JSON Server menyediakan REST API di `http://localhost:5000`:

- **Admins**: `/admins`
- **Products**: `/products`
- **Projects**: `/projects`
- **Events**: `/events`
- **Divisi**: `/divisi`

### Contoh API Usage:

```javascript
// Get all products
GET http://localhost:5000/products

// Get product by ID
GET http://localhost:5000/products/1

// Create new product
POST http://localhost:5000/products

// Update product
PUT http://localhost:5000/products/1

// Delete product
DELETE http://localhost:5000/products/1
```

## Data Schema

### Products

```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "price": number,
  "image": "string",
  "description": "string",
  "stock": number
}
```

### Projects

```json
{
  "id": "string",
  "title": "string",
  "price": "string",
  "location": "string",
  "image": "string"
}
```

### Events

```json
{
  "id": "string",
  "title": "string",
  "date": "string",
  "time": "string",
  "location": "string",
  "category": "string",
  "description": "string",
  "status": "string"
}
```

### Divisi

```json
{
  "id": "string",
  "name": "string",
  "icon": "string",
  "description": "string",
  "members": number,
  "projects": number,
  "skills": ["string"]
}
```

## Fitur Keamanan

- Protected Routes untuk halaman admin
- Context-based authentication
- Session management menggunakan localStorage

## Contributing

1. Fork repository ini
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Kontak & Support

Untuk pertanyaan atau dukungan, silakan hubungi:

- Email: luthfie257@gmail.com

---

Built with ❤️ using React + Tailwind + Vite
