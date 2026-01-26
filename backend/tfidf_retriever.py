import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem import PorterStemmer


stemmer = PorterStemmer()


def stem_tokenizer(text: str):
    """
    Tokenizes text, lowercases it, removes non-alphabetic tokens,
    and applies Porter stemming.
    """
    tokens = re.findall(r"[a-zA-Z]+", text.lower())
    return [stemmer.stem(token) for token in tokens]


class TfidfRetriever:
    def __init__(self, docs: list[str]):
        """
        docs: list of answer-complete documentation chunks
        """

        self.chunks: list[str] = []
        self.metadata: list[dict] = []

        for idx, text in enumerate(docs):
            cleaned = text.strip()
            if not cleaned:
                continue

            self.chunks.append(cleaned)

            # Temporary section label (will improve later)
            self.metadata.append({
                "section": self._infer_section(cleaned)
            })

        self.vectorizer = TfidfVectorizer(
            tokenizer=stem_tokenizer,
            stop_words="english",
            ngram_range=(1, 2),
            sublinear_tf=True,
        )

        self.tfidf_matrix = self.vectorizer.fit_transform(self.chunks)

    def _infer_section(self, text: str) -> str:
        """
        Infer section name based on keywords.
        This maps answers back to sidebar sections.
        """

        lowered = text.lower()

        if "retrieval" in lowered:
            return "Retrieval Mechanism"
        if "tf-idf" in lowered:
            return "Why TF-IDF"
        if "architecture" in lowered:
            return "Architecture"
        if "design decision" in lowered or "prioritizes" in lowered:
            return "Design Decisions"
        if "limitation" in lowered or "cannot" in lowered:
            return "Limitations"
        if "/query" in lowered or "endpoint" in lowered:
            return "API Reference"
        if "error" in lowered or "fail" in lowered:
            return "Error Handling"
        if "core concept" in lowered or "retrieval-first" in lowered:
            return "Core Concepts"

        return "Introduction"

    def retrieve(self, query: str, top_k: int = 3):
        """
        Retrieve top_k relevant documentation chunks.
        """

        query_vec = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vec, self.tfidf_matrix)[0]

        top_indices = np.argsort(similarities)[::-1][:top_k]

        results = []
        for idx in top_indices:
            score = float(similarities[idx])
            if score <= 0:
                continue

            results.append({
                "content": self.chunks[idx],
                "section": self.metadata[idx]["section"],
                "score": score,
            })

        return results
