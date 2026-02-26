from fastapi import APIRouter
from app.core.logger import logger

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health():
    logger.info("health - Health check successful")
    return {"status": "ok"}
