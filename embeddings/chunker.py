def chunk_text(text, chunk_size=500, overlap=50):
    chunks = []
    start = 0
    text_length = len(text)

    while start < text_length:
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start = end - overlap

    return chunks


if __name__ == "__main__":
    with open("../data/streamlit_docs_cleaned.txt", "r", encoding="utf-8") as f:
        text = f.read()

    chunks = chunk_text(text)

    print(f"Total chunks created: {len(chunks)}")
    print("Sample chunk:\n")
    print(chunks[0][:500])
