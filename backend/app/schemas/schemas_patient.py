from pydantic import BaseModel, Field, field_validator, computed_field, ConfigDict
from typing import Optional, Literal

class PatientCreate(BaseModel):
    id: str
    name: str
    city: str
    age: int = Field(gt=0, lt=120)
    gender: Literal['male', 'female', 'others']
    height: float = Field(gt=0)
    weight: float = Field(gt=0)

    model_config = ConfigDict(from_attributes=True)

    @field_validator("height")
    def validate_height(cls, v):
        if v < 0.5 or v > 2.5:
            raise ValueError("Height must be between 0.5m and 2.5m")
        return v

    @field_validator("weight")
    def validate_weight(cls, v):
        if v < 2 or v > 300:
            raise ValueError("Weight must be between 2kg and 300kg")
        return v

    @computed_field
    @property
    def bmi(self) -> float:
        return round(self.weight / (self.height ** 2), 2)

    @computed_field
    @property
    def verdict(self) -> str:
        if self.bmi < 18.5:
            return "Underweight"
        elif self.bmi < 25:
            return "Normal"
        elif self.bmi < 30:
            return "Overweight"
        else:
            return "Obese"

class PatientUpdate(BaseModel):
    name: Optional[str] = None
    city: Optional[str] = None
    age: Optional[int] = Field(default=None, gt=0, lt=120)
    gender: Optional[Literal['male', 'female', 'others']] = None
    height: Optional[float] = Field(default=None, gt=0)
    weight: Optional[float] = Field(default=None, gt=0)

class PatientResponse(BaseModel):
    id: str
    name: str
    city: str
    age: int
    gender: str
    height: float
    weight: float
    bmi: float | None = None
    verdict: str | None = None

    model_config = ConfigDict(from_attributes=True) 
