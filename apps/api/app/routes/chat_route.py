from app.services.user_service import UserService
from fastapi import Query
from fastapi import APIRouter
from pydantic import BaseModel
from app.repositories.chat_repository import ChatRepository
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from fastapi.responses import StreamingResponse
from app.core.dependencies import get_db
from app.services.chat_service import ChatService
from app.core.logger import logger
from pydantic import BaseModel, Field
from app.models.z_enums import UserMode

router = APIRouter(prefix="/chat", tags=["Chat"])


class StreamChatRequest(BaseModel):
    user_id: int
    message: str = Field(..., min_length=1)


@router.post("/conversation")
async def stream_chat(
    payload: StreamChatRequest,
    db: AsyncSession = Depends(get_db)
):
    try:
        chat_service = ChatService(db)
        user_service = UserService(db)

        user = await user_service.get_user_by_id(payload.user_id)
        response = StreamingResponse(
            chat_service.stream_response(
                payload.user_id,
                payload.message,
                user.mode
            ),
            media_type="text/plain"
        )

        logger.info(
            "stream_chat - Streaming chat response started successfully")

        return response
    except Exception as e:
        logger.error("stream_chat - Error occurred", exc_info=True)
        raise
