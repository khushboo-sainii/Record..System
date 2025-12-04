from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.database.db import get_db
from backend.app.schemas.schemas_cta import CTARequest, CTAResponse
from backend.app.crud.crud_cta import create_cta

router = APIRouter()

@router.post("/cta", response_model=CTAResponse)
def submit_cta(form: CTARequest, db: Session = Depends(get_db)):
    try:
        new_cta = create_cta(db, form)
        return new_cta
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving CTA form: {str(e)}")
