from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.logger import logger
import os
security = HTTPBearer()
API_KEY = os.getenv("AUTH_API_KEY")


async def basic_auth(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    try:
        token = credentials.credentials

        if token != API_KEY:
            logger.info("basic_auth - Invalid API key")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unauthorized"
            )

        logger.info("basic_auth - Authorized successfully")

    except Exception:
        logger.error("basic_auth - Error occurred", exc_info=True)
        raise
