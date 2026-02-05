# Exceed Auto - Car Dealership Website

## Overview
Exceed Auto is a car dealership website for Zimbabwe's premier destination for quality pre-owned vehicles. The application features a React frontend with a Python Flask backend and PostgreSQL database.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, Shadcn/UI, React Router v6, TanStack Query
- **Backend**: Python Flask, Flask-SQLAlchemy, Flask-CORS
- **Database**: PostgreSQL
- **Styling**: TailwindCSS with custom gold/dark theme

## Project Structure
```
├── server/                 # Flask backend
│   ├── app.py             # Main Flask application with API routes
│   └── models.py          # SQLAlchemy database models
├── src/                    # React frontend
│   ├── assets/            # Static assets (logo)
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Shadcn UI components
│   │   ├── Navbar.tsx    # Navigation with Admin link
│   │   ├── Hero.tsx      # Homepage hero section
│   │   ├── Footer.tsx    # Site footer
│   │   ├── CarCard.tsx   # Car listing card
│   │   └── FeaturedCars.tsx # Featured cars section
│   ├── lib/              # Utilities
│   │   └── api.ts        # API service for backend communication
│   ├── pages/            # Route pages
│   │   ├── Index.tsx     # Homepage
│   │   ├── Cars.tsx      # Car listings with filters
│   │   ├── CarDetail.tsx # Individual car details
│   │   ├── About.tsx     # About page
│   │   ├── Contact.tsx   # Contact page
│   │   ├── AdminLogin.tsx    # Admin login page
│   │   └── AdminDashboard.tsx # Admin car management
│   └── App.tsx           # Main app with routing
├── uploads/               # Uploaded car images
├── start.sh              # Startup script for both servers
└── vite.config.ts        # Vite config with API proxy
```

## Key Features

### Public Features
- Browse vehicle inventory with search and filters (brand, body type, fuel type, transmission)
- View detailed car information with image galleries
- Contact dealership via WhatsApp or contact form
- Responsive design for all devices

### Admin Features
- Protected admin dashboard at `/admin`
- Add new vehicles with all details and images
- Delete vehicles (auto-deletes empty brands)
- Brand management (select existing or create new)
- Image upload support

## Database Models
- **Admin**: Admin user accounts (username, password)
- **Brand**: Car brands (auto-deleted when no cars remain)
- **Car**: Vehicle listings with all details
- **CarImage**: Vehicle images with primary flag

## API Endpoints
- `GET /api/cars` - List all cars (with optional filters)
- `GET /api/cars/:id` - Get single car
- `POST /api/cars` - Create car (admin only)
- `PUT /api/cars/:id` - Update car (admin only)
- `DELETE /api/cars/:id` - Delete car (admin only)
- `GET /api/brands` - List all brands
- `POST /api/brands` - Create brand (admin only)
- `GET /api/filters` - Get all filter options
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Verify token
- `GET /api/uploads/:filename` - Serve uploaded images

## Default Admin Credentials
- Username: `admin@autoexceed`
- Password: `autoexceed@admin`

## Running the Application
The application runs with `bash start.sh` which starts:
1. Flask backend on port 5001
2. Vite frontend on port 5000 (proxies /api to backend)

## Development Notes
- Vite proxies `/api` requests to Flask backend on port 5001
- Images are stored in `/uploads` directory
- Brands are automatically deleted when they have no cars
- Featured cars appear on homepage
