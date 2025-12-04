from sqlalchemy import Column, Integer, String
from backend.app.database.db import Base

class CTA(Base):
    __tablename__ = "cta_requests"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    organization = Column(String, nullable=True)
    message = Column(String, nullable=False)
