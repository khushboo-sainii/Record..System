from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import routes_signup, routes_patient, routes_cta
from backend.app.database.db import create_table
from starlette.middleware.sessions import SessionMiddleware
import os

app = FastAPI(title="Record System API")

SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")

ALLOWED_ORIGINS = [
    "https://recordsystem.vercel.app",   # production frontend
    "https://record-system-git-new-feature-khushboo-sainiis-projects.vercel.app",  # staging frontend
    "http://localhost:3000"  # local dev frontend
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

create_table()

# Prefix routers to keep endpoints organized
app.include_router(routes_signup.router, prefix="/auth", tags=["auth"])
app.include_router(routes_patient.router, prefix="/patients", tags=["patients"])
app.include_router(routes_cta.router)

@app.get("/")
def root():
    return {"message": "Patient management system API"}
