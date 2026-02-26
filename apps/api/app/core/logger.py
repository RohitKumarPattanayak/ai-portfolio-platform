import logging
import sys


def setup_logger():
    logger = logging.getLogger(__name__)

    logger.setLevel(logging.INFO)  # Change to DEBUG in dev

    handler = logging.StreamHandler(sys.stdout)

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(message)s"
    )

    handler.setFormatter(formatter)

    if not logger.handlers:
        logger.addHandler(handler)

    return logger


logger = setup_logger()
