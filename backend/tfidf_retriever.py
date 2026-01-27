from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class TfidfRetriever:
    def __init__(self, docs):
        self.docs = docs
        self.texts = [d["content"] for d in docs]

        self.vectorizer = TfidfVectorizer(
            lowercase=True,
            stop_words="english",
        )

        self.matrix = self.vectorizer.fit_transform(self.texts)

    def retrieve(self, query, top_k=5):
        query_vec = self.vectorizer.transform([query])
        scores = cosine_similarity(query_vec, self.matrix)[0]

        results = []
        for score, doc in sorted(
            zip(scores, self.docs),
            key=lambda x: x[0],
            reverse=True,
        ):
            if score > 0:
                results.append({
                    "content": doc["content"],
                    "section": doc["section"],
                    "score": float(score),
                })

        return results[:top_k]

    @staticmethod
    def infer_section_from_question(question: str):
        q = question.lower()

        rules = [
            ("what is docarg", "Introduction"),
            ("core concept", "Core Concepts"),
            ("core concepts", "Core Concepts"),
            ("retrieval mechanism", "Retrieval Mechanism"),
            ("tf-idf", "Why TF-IDF"),
            ("architecture", "Architecture"),
            ("design decision", "Design Decisions"),
            ("design decisions", "Design Decisions"),
            ("limitation", "Limitations"),
            ("api", "API Reference"),
            ("error", "Error Handling"),
        ]

        for phrase, section in rules:
            if phrase in q:
                return section

        return None
