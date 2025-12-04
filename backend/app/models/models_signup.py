from backend.app.database.db import Base
from sqlalchemy import Column, Integer, String

class Signup(Base):
    __tablename__ = "signup"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String(128), nullable=False)
