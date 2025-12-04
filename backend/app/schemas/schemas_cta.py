from pydantic import BaseModel, ConfigDict

class CTARequest(BaseModel):
    full_name: str
    email: str
    organization: str | None = None
    message: str

class CTAResponse(BaseModel):
    id: int
    full_name: str
    email: str
    organization: str | None = None
    message: str

    model_config = ConfigDict(from_attributes=True)
