from pydantic import BaseModel, Field
from app.models.z_enums import UserMode


class CreateUserRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    mode: UserMode


class UserResponse(BaseModel):
    id: int
    username: str
    mode: UserMode

    class Config:
        from_attributes = True
