from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from backend.app.database.db import get_db
from backend.app.schemas.schemas_signup import SignupCreate, SignupResponse, LoginRequest
from backend.app.crud import crud_signup
from backend.app.utils.oauth import oauth
from backend.app.utils.security import hash_password
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os, jwt, datetime

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")
ALGORITHM ="HS256"

def create_jwt_token(user_id: int, email: str):
    expire = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    payload = {"sub": str(user_id), "email": email, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# -------------------MANUAL SIGNIN----------------------------

@router.post("/signup", response_model=SignupResponse)
def signup(user: SignupCreate, db: Session = Depends(get_db)):
    password_bytes = user.password.encode('utf-8')[:72]
    safe_password = password_bytes.decode('utf-8', errors='ignore')
    safe_user = SignupCreate(name=user.name, email=user.email, password=safe_password)

    try:
        return crud_signup.create_user(db, safe_user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
def login(user: LoginRequest, db: Session = Depends(get_db)):
    db_user = crud_signup.authenticate_user(db, user.email, user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_jwt_token(db_user.id, db_user.email)
    return {"access_token": token, "token_type": "bearer"}
   
# ======================= GOOGLE OAUTH2 ============================
@router.get("/login/google")
async def login_google(request: Request):
    redirect_uri =request.url_for("auth_google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri, prompt="consent")

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

@router.get("/google/callback", name="auth_google_callback")
async def auth_google_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)

    # Step 1: Verify ID Token
    try:
        idinfo = id_token.verify_oauth2_token(
            token["id_token"], google_requests.Request(), GOOGLE_CLIENT_ID
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid ID token")

    # Step 2: Extract user info securely
    email = idinfo.get("email")
    name = idinfo.get("name", "Google User")

    if not email:
        raise HTTPException(status_code=400, detail="Google login failed")

    # Step 3: Database check
    db_user = db.query(crud_signup.Signup).filter(crud_signup.Signup.email == email).first()
    if not db_user:
        new_user = crud_signup.Signup(name=name, email=email, password=hash_password("oauth_dummy"))
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        db_user = new_user

    # Step 4: Create your own JWT
    jwt_token = create_jwt_token(db_user.id, db_user.email)
    if isinstance(jwt_token, bytes):
        jwt_token = jwt_token.decode("utf-8")

    frontend_url = f"https://record-system.vercel.app/auth/callback?token={jwt_token}"
    return RedirectResponse(url=frontend_url)