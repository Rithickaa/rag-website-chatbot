import re

def extract_sections(markdown_text: str) -> list[str]:
    """
    Extracts clean documentation blocks from markdown text.
    Headings are removed. Content is grouped by section.
    """

    # Split on markdown headings (## ...)
    sections = re.split(r"\n##\s+", markdown_text)

    cleaned_blocks = []

    for section in sections:
        lines = section.strip().splitlines()

        # Remove section title if present
        if lines and not lines[0].startswith("#"):
            lines = lines[1:]

        content = " ".join(line.strip() for line in lines if line.strip())

        if content:
            cleaned_blocks.append(content)

    return cleaned_blocks
