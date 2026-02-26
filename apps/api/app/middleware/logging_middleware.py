import time
import uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.logger import logger


class LoggingMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next):

        request_id = str(uuid.uuid4())
        request.state.request_id = request_id

        start_time = time.time()

        # logger.info(
        #     f"[REQUEST START] id={request_id} "
        #     f"method={request.method} "
        #     f"path={request.url.path} "
        #     f"client={request.client.host}"
        # )

        try:
            response = await call_next(request)

        except Exception as e:
            logger.error(
                f"[REQUEST ERROR] id={request_id} "
                f"error={str(e)}",
                exc_info=True
            )
            raise

        # process_time = round((time.time() - start_time) * 1000, 2)

        # logger.info(
        #     f"[REQUEST END] id={request_id} "
        #     f"status={response.status_code} "
        #     f"time={process_time}ms"
        # )

        response.headers["X-Request-ID"] = request_id

        return response
