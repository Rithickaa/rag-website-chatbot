docs_content = {
    "Introduction": """
DOCARG (Documentation-Oriented Contextual Augmented Retrieval Generation) is a
documentation-centric question answering system.

DOCARG avoids hallucinations by ensuring that all answers are generated strictly
from retrieved documentation content. The system does not rely on the language
model’s internal knowledge.

The primary goal of DOCARG is to provide accurate, explainable, and traceable
answers grounded in documentation.
""",

    "Core Philosophy": """
The core philosophy of DOCARG is that documentation is the single source of truth.

DOCARG enforces explainability by always linking answers to specific documentation
sections. Users can verify exactly where an answer originated.

By design, DOCARG prefers to return "I don't know" rather than generate an
unsupported or fabricated response.
""",

    "Retrieval Mechanism": """
DOCARG uses a TF-IDF based retrieval mechanism to locate relevant documentation.

Each documentation section is split into paragraph-level chunks. These chunks are
vectorized using TF-IDF, and cosine similarity is used to rank relevance.

Only the most relevant chunks are passed to the generation stage.
""",

    "Why TF-IDF": """
TF-IDF was chosen over dense embeddings because it is lightweight, deterministic,
and fully explainable.

Unlike dense embeddings, TF-IDF does not require GPUs, large models, or external
dependencies. This makes the system stable and platform-independent.

TF-IDF also provides transparent similarity scores, which improves debugging and
trust in retrieval results.
""",

    "Design Decisions": """
DOCARG avoids hallucinations by restricting the language model to retrieved
documentation only.

The language model is never allowed to answer beyond the provided context. If the
retrieved documentation does not explicitly contain an answer, DOCARG responds
with "I don't know based on the given documentation."

This design choice prioritizes correctness and safety over speculative answers.
""",

    "Architecture": """
DOCARG follows a modular architecture separating retrieval and generation.

The frontend presents documentation and a chatbot interface. The backend handles
retrieval, scoring, and controlled answer generation.

This separation improves maintainability and allows retrieval strategies to be
improved independently.
""",

    "Limitations": """
DOCARG cannot answer questions that fall outside the documented scope.

TF-IDF relies on lexical similarity and may struggle with heavily paraphrased
queries. However, this limitation is accepted in exchange for transparency and
predictable behavior.

Documentation updates require rebuilding the TF-IDF index.
""",

    "API Reference": """
DOCARG exposes a REST API for querying documentation.

Endpoint:
POST /query

The request contains a natural language question. The response includes the
generated answer and the documentation sections used to produce it.
""",

    "Error Handling": """
DOCARG returns a 422 error for invalid request payloads.

Internal server errors indicate failures during retrieval or generation and should
be inspected via logs.
"""
}
