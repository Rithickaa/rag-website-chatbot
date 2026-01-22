import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from chunker import chunk_text


def load_text():
    with open("../data/streamlit_docs_cleaned.txt", "r", encoding="utf-8") as f:
        return f.read()


def create_embeddings():
    text = load_text()
    chunks = chunk_text(text)

    vectorizer = TfidfVectorizer(
        max_features=1000,
        stop_words="english"
    )

    embeddings = vectorizer.fit_transform(chunks)

    # Save vectorizer for later use
    with open("tfidf_vectorizer.pkl", "wb") as f:
        pickle.dump(vectorizer, f)

    return chunks, embeddings


if __name__ == "__main__":
    chunks, embeddings = create_embeddings()
    print(f"Total chunks: {len(chunks)}")
    print(f"Embedding shape: {embeddings.shape}")
