"""
Authoritative documentation source for DOCARG.

This file defines the exact knowledge base used for retrieval.
The assistant must answer strictly from this content.
"""

DOCS = [

    # =========================
    # Introduction
    # =========================
    "DOCARG is a documentation-first question answering system designed for reliability, traceability, and correctness.",

    "DOCARG ensures that every response is grounded strictly in documented knowledge.",

    "DOCARG is suitable for technical documentation, internal knowledge bases, and developer platforms.",

    "DOCARG treats documentation as the single source of truth.",

    "DOCARG never allows the language model to invent answers.",


    # =========================
    # Core Concepts
    # =========================
    "The core concepts of DOCARG define how the system behaves.",

    "DOCARG follows a retrieval-first paradigm where documentation is retrieved before generating an answer.",

    "In DOCARG, documentation is authoritative.",

    "In DOCARG, language models act only as rephrasing engines.",

    "DOCARG enforces explicit safe failure when documentation is missing.",

    "This approach reduces hallucinations compared to traditional chat-based systems.",


    # =========================
    # Retrieval Mechanism
    # =========================
    "The retrieval mechanism of DOCARG defines how documentation is searched and selected.",

    "DOCARG splits documentation into paragraph-level segments.",

    "DOCARG applies text normalization and cleaning.",

    "DOCARG uses TF-IDF vectorization for retrieval.",

    "Cosine similarity is used to rank documentation segments.",

    "Only the most relevant documentation segments are passed to the generation layer.",


    # =========================
    # Why TF-IDF
    # =========================
    "DOCARG uses TF-IDF to prioritize transparency and explainability.",

    "TF-IDF provides deterministic retrieval behavior.",

    "TF-IDF allows inspection of term relevance.",

    "DOCARG intentionally avoids opaque embedding-based retrieval methods.",


    # =========================
    # Architecture
    # =========================
    "The architecture of DOCARG is a layered system.",

    "DOCARG consists of a frontend, a retrieval layer, a documentation source, and a generation layer.",

    "The frontend handles navigation and user interface rendering.",

    "The retrieval layer selects relevant documentation.",

    "The documentation layer acts as the single source of truth.",

    "The generation layer rephrases retrieved documentation into answers.",


    # =========================
    # Design Decisions
    # =========================
    "The design decisions of DOCARG prioritize correctness and explainability.",

    "DOCARG prioritizes correctness over creativity.",

    "DOCARG avoids speculative responses.",

    "DOCARG does not rely on hidden or external data sources.",

    "DOCARG enforces strict fallback behavior when information is missing.",


    # =========================
    # Limitations
    # =========================
    "DOCARG has the following limitations: it can only answer questions that are explicitly covered in its documentation, it does not use external or internet-based knowledge, it does not reason beyond the provided content, and it does not infer unstated facts. These limitations are intentional design decisions to prevent hallucinations."



    # =========================
    # API Reference
    # =========================
    "The API reference of DOCARG describes how external clients interact with the system.",

    "DOCARG exposes a single POST endpoint at /query.",

    "The /query endpoint accepts a natural language question.",

    "The /query endpoint returns a grounded answer derived strictly from documentation.",

    "The API response may include source metadata.",


    # =========================
    # Error Handling
    # =========================
    "Error handling in DOCARG defines how the system responds to failures.",

    "DOCARG is designed to fail safely and transparently.",

    "If no relevant documentation is retrieved, DOCARG does not generate an answer.",

    "If documentation is missing, DOCARG explicitly refuses to answer.",

    "Errors are logged for traceability and debugging.",
]
