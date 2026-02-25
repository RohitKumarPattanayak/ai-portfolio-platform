from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.core.dependencies import get_db
from app.models.ai_usage_model import AIUsageModel
# from app.models.interaction_model import Interaction

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/usage")
async def usage_summary(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(
            AIUsageModel.feature,
            func.sum(AIUsageModel.total_tokens)
        ).group_by(AIUsageModel.AIUsageModel)
    )

    return result.all()


# @router.get("/recruiter")
# async def recruiter_stats(db: AsyncSession = Depends(get_db)):
#     total = await db.execute(
#         select(func.count()).where(Interaction.mode == "recruiter")
#     )

#     return {"total_recruiter_interactions": total.scalar()}
