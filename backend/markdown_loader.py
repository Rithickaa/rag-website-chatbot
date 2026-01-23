from pathlib import Path

def load_markdown(path: str) -> str:
    """
    Reads a markdown file and returns its raw text.
    """
    file_path = Path(path)

    if not file_path.exists():
        raise FileNotFoundError(f"Markdown file not found: {path}")

    return file_path.read_text(encoding="utf-8")
