from sqlalchemy.ext.asyncio import AsyncSession
from app.models.ai_usage_model import AIUsageModel


class UsageRepository:

    def __init__(self, session: AsyncSession):
        self.session = session

    async def log_usage(
        self,
        feature: str,
        prompt_tokens: int,
        completion_tokens: int,
        total_tokens: int
    ):
        usage = AIUsageModel(
            feature=feature,
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
            total_tokens=total_tokens
        )

        self.session.add(usage)
        await self.session.commit()

    async def usage_track(self, response, feature='ussage-log'):
        usage = getattr(response, "usage", None)
        if usage == None:
            return False
        prompt_tokens = getattr(usage, "prompt_tokens", 0) if usage else 0
        completion_tokens = getattr(
            usage, "completion_tokens", 0) if usage else 0
        total_tokens = getattr(usage, "total_tokens", 0) if usage else 0

        await self.log_usage(
            feature=feature,
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
            total_tokens=total_tokens
        )
        return True
