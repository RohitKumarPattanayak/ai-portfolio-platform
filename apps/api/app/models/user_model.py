# app/models/user.py

from sqlalchemy import Column, Integer, String, Enum
from app.core.database import Base
from app.models.z_enums import UserMode


class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(20), unique=True, nullable=False, index=True)
    mode = Column(Enum(UserMode), nullable=False)
