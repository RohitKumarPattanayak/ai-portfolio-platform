from sqlalchemy.exc import IntegrityError
from sqlalchemy import select
from app.models.user_model import UserModel
from app.core.logger import logger


class UserRepository:

    def __init__(self, session):
        self.session = session

    async def get_by_username(self, username: str):
        try:
            result = await self.session.execute(select(UserModel).where(UserModel.username == username))
            user = result.scalars().first()
            if not user:
                logger.info(
                    "get_by_username - No user found - success"
                )
                return None
            logger.info(
                "get_by_username - User fetched successfully"
            )
            return user
        except Exception:
            logger.error(
                "get_by_username - Error occurred",
                exc_info=True
            )
            raise

    async def create_user(self, username: str, mode):
        try:
            user = UserModel(username=username, mode=mode)
            self.session.add(user)
            await self.session.commit()
            await self.session.refresh(user)
            logger.info(
                f"create_user - username={username} - success"
            )
            return user
        except IntegrityError:
            await self.session.rollback()
            logger.info(
                f"create_user - username={username} already exists")
            raise ValueError("Username already exists")
        except Exception:
            await self.session.rollback()
            logger.error(
                f"create_user - username={username} - error", exc_info=True)
            raise

    async def update_mode(self, user: UserModel, mode):
        try:
            user.mode = mode
            await self.session.commit()
            await self.session.refresh(user)

            logger.info(
                "update_mode - User mode updated successfully"
            )
            return user

        except Exception:
            await self.session.rollback()
            logger.error(
                "update_mode - Error occurred",
                exc_info=True
            )
            raise

    async def get_by_id(self, user_id: int):
        try:
            result = await self.session.execute(
                select(UserModel).where(UserModel.id == user_id)
            )
            return result.scalars().first()

        except Exception:
            logger.error("get_by_id - Error occurred", exc_info=True)
            raise
