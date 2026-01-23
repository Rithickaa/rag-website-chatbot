from pathlib import Path

from markdown_loader import load_markdown
from markdown_parser import extract_sections


# Resolve project root dynamically
PROJECT_ROOT = Path(__file__).resolve().parent.parent
DOCS_PATH = PROJECT_ROOT / "docs" / "docarg.md"


def get_markdown_docs() -> list[str]:
    """
    Loads documentation from Markdown and returns clean text sections.
    """
    markdown_text = load_markdown(DOCS_PATH)
    sections = extract_sections(markdown_text)
    return sections
