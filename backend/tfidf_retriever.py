import re
import numpy as np
from typing import Dict, Union, List
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
    def __init__(self, docs: Union[Dict[str, str], List[str]]):
        """
        docs can be:
        1) dict -> { section_name: full_text }   (legacy docs)
        2) list -> [ full_text, full_text, ... ] (markdown docs)
        """

        self.chunks = []
        self.metadata = []

        # 🔹 Case 1: Legacy dict-based docs
        if isinstance(docs, dict):
            for section, content in docs.items():
                paragraphs = [
                    p.strip()
                    for p in content.split("\n")
                    if len(p.strip()) > 60
                ]

                for para in paragraphs:
                    self.chunks.append(para)
                    self.metadata.append({
                        "section": section
                    })

        # 🔹 Case 2: Markdown list-based docs
        elif isinstance(docs, list):
            for idx, content in enumerate(docs):
                paragraphs = [
                    p.strip()
                    for p in content.split("\n")
                    if len(p.strip()) > 60
                ]

                section_name = f"Section {idx + 1}"

                for para in paragraphs:
                    self.chunks.append(para)
                    self.metadata.append({
                        "section": section_name
                    })

        else:
            raise TypeError("Unsupported docs format passed to TfidfRetriever")

        # 🔹 Improved TF-IDF configuration
        self.vectorizer = TfidfVectorizer(
            tokenizer=stem_tokenizer,
            stop_words="english",
            ngram_range=(1, 2),     # unigrams + bigrams
            sublinear_tf=True      # log-scaled term frequency
        )

        self.tfidf_matrix = self.vectorizer.fit_transform(self.chunks)

    def retrieve(self, query: str, top_k: int = 6):
        """
        Returns top_k most relevant chunks with metadata.
        """

        query_vec = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vec, self.tfidf_matrix)[0]

        top_indices = np.argsort(similarities)[::-1][:top_k]

        results = []
        for idx in top_indices:
            score = float(similarities[idx])
            if score == 0:
                continue

            results.append({
                "content": self.chunks[idx],
                "section": self.metadata[idx]["section"],
                "score": score
            })

        return results
