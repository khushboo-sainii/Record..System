from sqlalchemy.orm import Session
from backend.app.models.models_patient import Patient
from backend.app.schemas.schemas_patient import PatientCreate, PatientUpdate

def create_patient(db: Session, patient: PatientCreate) -> Patient:
    if db.query(Patient).filter(Patient.id == patient.id).first():
        raise ValueError("Patient already exists")

    db_patient = Patient(**patient.model_dump(exclude={"bmi", "verdict"}))
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

def get_patient(db: Session, patient_id: str) -> Patient | None:
    return db.query(Patient).filter(Patient.id == patient_id).first()

def get_all_patients(db: Session) -> list[Patient]:
    return db.query(Patient).all()

def update_patient(db: Session, patient_id: str, updates: PatientUpdate) -> Patient | None:
    patient = get_patient(db, patient_id)
    if not patient:
        return None

    for key, value in updates.model_dump(exclude_unset=True).items():
        setattr(patient, key, value)

    db.commit()
    db.refresh(patient)
    return patient

def delete_patient(db: Session, patient_id: str) -> Patient | None:
    patient = get_patient(db, patient_id)
    if not patient:
        return None
    db.delete(patient)
    db.commit()
    return patient
