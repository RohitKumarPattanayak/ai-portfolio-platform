from datetime import timedelta
from datetime import datetime
from fastapi import HTTPException
import os
import jwt

class JwtService:
    def __init__(self):
        self.secret_key = os.getenv("secret_key")
        self.refresh_secret_key = os.getenv("refresh_secret_key")
        self.algorithm = os.getenv("algorithm")
        self.access_token_expire_minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
        self.refresh_token_expire_minutes = int(os.getenv("REFRESH_TOKEN_EXPIRE_MINUTES"))

    def create_access_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=self.access_token_expire_minutes)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt

    def create_refresh_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=self.refresh_token_expire_minutes)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.refresh_secret_key, algorithm=self.algorithm)
        return encoded_jwt

    def decode_access_token(self, token: str):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Access token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid access token")

    def decode_refresh_token(self, token: str):
        try:
            payload = jwt.decode(token, self.refresh_secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Refresh token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
