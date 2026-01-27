import re

def extract_sections(markdown_text: str) -> list[str]:
    """
    Extracts clean, retrieval-ready documentation blocks from markdown text.
    Removes headings, separators, and empty lines.
    """

    # Remove horizontal rules like ---
    markdown_text = re.sub(r"\n-{3,}\n", "\n", markdown_text)

    # Remove top-level title (# ...)
    markdown_text = re.sub(r"^#.*\n", "", markdown_text)

    # Split on section headings (## ...)
    sections = re.split(r"\n##\s+.*\n", markdown_text)

    cleaned_blocks = []

    for section in sections:
        lines = [
            line.strip()
            for line in section.splitlines()
            if line.strip() and not line.strip().startswith("#")
        ]

        content = " ".join(lines)

        if content:
            cleaned_blocks.append(content)

    return cleaned_blocks
