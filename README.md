# 🏥 Patient Record Management System

A secure, scalable, and doctor-friendly platform for managing patient records with ease. Built with **Next.js (frontend)** and **FastAPI (backend)** using **Pydantic validation**, **PostgreSQL database**, and **JWT authentication**.

---

## ✨ Features

### 🔐 Security
- End-to-end encryption for patient data
- JWT-based authentication and protected routes

### ⚡ Performance
- Optimized SQL queries for instant access
- Scalable backend architecture with modular APIs
- Fast loading UI with image optimization and lazy loading

### 🩺 User-Friendly UI
- Responsive design using Tailwind CSS
- Clear error handling mapped from backend to frontend
- Professional font hierarchy, spacing, and color coding
- Dashboard with full CRUD operations

### 👩‍⚕️ Testimonials
- Feedback from healthcare professionals
- Circular avatars with consistent sizing
- Responsive grid layout

---

## 🖥️ Frontend (Next.js + React)

### Tech Stack
- **Framework**: Next.js 16 (Turbopack)
- **Styling**: Tailwind CSS
- **Routing**: App Router (`/home`, `/about`, `/signup`, `/signin`, `/create`, `/edit`, `/view`, `/delete` etc.)
- **Authentication**: Login form with Google and Facebook buttons

### Key Pages
- `page.jsx`: Hero + Features + Testimonials + CTA
- `signin/`: Login form with error handling
- `signup/`: Registration form
- `view/`: Patient record viewer
- `create/`, `edit/`, `delete/`: CRUD operations
- `about/`: Mission, journey, and team section

---

## ⚙️ Backend (FastAPI + Pydantic)

### Tech Stack
- **Framework**: FastAPI
- **Validation**: Pydantic models
- **Database**: SQL (PostgreSQL or MySQL)
- **Auth**: JWT tokens
- **Error Handling**: Custom exceptions mapped to frontend

### Key Modules
- `main.py`: FastAPI entrypoint
- `models/`: SQLAlchemy models
- `schemas/`: Pydantic schemas
- `routes/`: API endpoints
- `crud/`: DB operations
- `services/`: Business logic
- `utils/`: Helper functions
- `init_db.py`: Initial DB setup

---

## 🚀 Getting Started

### Frontend Setup
```bash
cd app
npm install
npm run dev
```

### Backend Setup
**From the project root (`patient-record-system/`):**
```bash
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload
```
