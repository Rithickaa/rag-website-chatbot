from datetime import datetime
import os

LOG_DIR = "logs"
LOG_FILE = os.path.join(LOG_DIR, "queries.log")


def log_query(query: str, top_section: str, score: float):
    """
    Logs user queries along with retrieval information.
    """

    # Ensure logs directory exists
    os.makedirs(LOG_DIR, exist_ok=True)

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    log_line = (
        f"{timestamp} | "
        f"query=\"{query}\" | "
        f"top_section=\"{top_section}\" | "
        f"score={score:.4f}\n"
    )

    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(log_line)
