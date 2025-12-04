from sqlalchemy.orm import Session
from backend.app.models.models_signup import Signup
from backend.app.schemas.schemas_signup import SignupCreate, SignupResponse
from backend.app.utils.security import hash_password, verify_password


def create_user(db: Session, user: SignupCreate) -> SignupResponse:
    existing_user = db.query(Signup).filter(Signup.email == user.email).first()
    if existing_user:
        raise ValueError("Email already registered")

    hashed_pw = hash_password(user.password)
    new_user = Signup(name=user.name, email=user.email, password=hashed_pw)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return SignupResponse.from_orm(new_user)

def authenticate_user(db: Session, email: str, password: str) -> SignupResponse | None:
    user = db.query(Signup).filter(Signup.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return SignupResponse.from_orm(user)
