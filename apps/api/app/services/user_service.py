from app.repositories.user_repository import UserRepository
from app.core.logger import logger


class UserService:

    def __init__(self, session):
        self.repo = UserRepository(session)

    async def create_user(self, username: str, mode):
        try:
            existing_user = await self.repo.get_by_username(username)
            if existing_user:
                logger.info(
                    f"create_user - username={username} already exists"
                )
                raise ValueError("Username already exists")
            user = await self.repo.create_user(username, mode)
            logger.info(
                f"create_user - username={username} created successfully"
            )
            return user
        except Exception:
            logger.error(
                f"create_user service - username={username} error",
                exc_info=True
            )
            raise

    async def update_mode(self, user_id: int, mode):
        try:
            user = await self.repo.get_by_id(user_id)
            if not user:
                logger.info(
                    f"update_mode - user_id={user_id} not found"
                )
                raise ValueError("User not found")
            updated_user = await self.repo.update_mode(user, mode)
            logger.info(
                f"update_mode - user_id={user_id} updated successfully"
            )
            return updated_user
        except Exception:
            logger.error(
                f"update_mode service - user_id={user_id} error",
                exc_info=True
            )
            raise
