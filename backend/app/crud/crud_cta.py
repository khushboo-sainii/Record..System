from sqlalchemy.orm import Session
from backend.app.models.models_cta import CTA
from backend.app.schemas.schemas_cta import CTARequest

def create_cta(db: Session, form: CTARequest):
    new_cta = CTA(**form.dict())
    db.add(new_cta)
    db.commit()
    db.refresh(new_cta)
    return new_cta
