from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from backend.app.models.models_patient import Patient
from backend.app.database.db import get_db
from sqlalchemy.exc import IntegrityError
from backend.app.schemas.schemas_patient import PatientCreate, PatientUpdate, PatientResponse
from backend.app.crud.crud_patient import (
    create_patient, get_patient, get_all_patients, update_patient, delete_patient
)

router = APIRouter()

@router.post("/create", response_model=PatientResponse)
def create(patient: PatientCreate, db: Session = Depends(get_db)):
    try:
        existing = db.query(Patient).filter(Patient.id == patient.id).first()
        if existing:
            raise HTTPException(status_code=400, detail=f"Patient with id {patient.id} already exists")

        new_patient = Patient(**patient.dict(exclude={"bmi", "verdict"}))
        db.add(new_patient)
        db.commit()
        db.refresh(new_patient)
        return new_patient

    except IntegrityError:
        db.rollback()  
        raise HTTPException(status_code=400, detail="Database integrity error: Duplicate or invalid entry")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/patients/{patient_id}", response_model=PatientResponse)
def read(patient_id: str = Path(..., description="Patient ID"), db: Session = Depends(get_db)):
    patient = get_patient(db, patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.get("/view", response_model=list[PatientResponse])
def read_all(db: Session = Depends(get_db)):
    patients = get_all_patients(db)   
    result = []

    for p in patients:
        bmi = round(p.weight / (p.height ** 2), 2)
        if bmi < 18.5:
            verdict = "Underweight"
        elif bmi < 25:
            verdict = "Normal"
        elif bmi < 30:
            verdict = "Overweight"
        else:
            verdict = "Obese"

        result.append({
            "id": p.id,
            "name": p.name,
            "city": p.city,
            "age": p.age,
            "gender": p.gender,
            "height": p.height,
            "weight": p.weight,
            "bmi": bmi,
            "verdict": verdict
        })

    return result


@router.put("/edit/{patient_id}", response_model=PatientResponse)
def update(patient_id: str, updates: PatientUpdate, db: Session = Depends(get_db)):
    patient = update_patient(db, patient_id, updates)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.delete("/delete/{patient_id}")
def delete(patient_id: str, db: Session = Depends(get_db)):
    patient = delete_patient(db, patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return {"message": "Patient deleted successfully"}
