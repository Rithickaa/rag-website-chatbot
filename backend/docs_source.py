"""
Authoritative documentation source for DOCARG.

This file is the SINGLE SOURCE OF TRUTH for retrieval.
It is an answer-complete, TF-IDF-safe mirror of the UI documentation.
"""

DOCS = [

    # =========================
    # Introduction
    # =========================
    {
        "section": "Introduction",
        "content": "DOCARG is a documentation-first question answering system designed for reliability, traceability, and correctness."
    },
    {
        "section": "Introduction",
        "content": "DOCARG ensures that every response is grounded strictly in documented knowledge."
    },
    {
        "section": "Introduction",
        "content": "DOCARG treats documentation as the single source of truth and never allows the language model to invent answers."
    },
    {
        "section": "Introduction",
        "content": "DOCARG is suitable for technical documentation, internal knowledge bases, and developer platforms."
    },

    # =========================
    # Core Concepts
    # =========================
    {
        "section": "Core Concepts",
        "content": "The core concepts of DOCARG define the fundamental principles that govern how the system behaves."
    },
    {
        "section": "Core Concepts",
        "content": "DOCARG follows a retrieval-first paradigm where documentation is always consulted before answering."
    },
    {
        "section": "Core Concepts",
        "content": "In DOCARG, documentation is authoritative and retrieval always precedes generation."
    },
    {
        "section": "Core Concepts",
        "content": "In DOCARG, language models act only as rephrasing engines and do not introduce new facts."
    },
    {
        "section": "Core Concepts",
        "content": "DOCARG enforces explicit and safe failure behavior when documentation is insufficient."
    },

    # =========================
    # Retrieval Mechanism
    # =========================
    {
        "section": "Retrieval Mechanism",
        "content": "The retrieval mechanism of DOCARG defines how documentation is searched, ranked, and selected to answer queries."
    },
    {
        "section": "Retrieval Mechanism",
        "content": "Documentation in DOCARG is split into logical, paragraph-level segments for retrieval."
    },
    {
        "section": "Retrieval Mechanism",
        "content": "DOCARG applies text normalization and cleaning before performing retrieval."
    },
    {
        "section": "Retrieval Mechanism",
        "content": "DOCARG uses TF-IDF vectorization and cosine similarity to rank documentation segments."
    },
    {
        "section": "Retrieval Mechanism",
        "content": "Only the most relevant documentation segments are passed to the generation layer."
    },

    # =========================
    # Why TF-IDF
    # =========================
    {
        "section": "Why TF-IDF",
        "content": "The reason DOCARG uses TF-IDF is to ensure transparent, deterministic, and explainable retrieval behavior."
    },
    {
        "section": "Why TF-IDF",
        "content": "TF-IDF allows easy inspection of term relevance in retrieved documentation."
    },
    {
        "section": "Why TF-IDF",
        "content": "TF-IDF has lower operational complexity compared to embedding-based retrieval approaches."
    },
    {
        "section": "Why TF-IDF",
        "content": "TF-IDF allows developers to explain exactly why a document was retrieved for a query."
    },

    # =========================
    # Architecture
    # =========================
    {
        "section": "Architecture",
        "content": "The architecture of DOCARG is a layered system that separates presentation, retrieval, documentation, and generation."
    },
    {
        "section": "Architecture",
        "content": "DOCARG consists of a frontend, a retrieval layer, a documentation source, and a generation layer."
    },
    {
        "section": "Architecture",
        "content": "The frontend handles navigation and user interface rendering."
    },
    {
        "section": "Architecture",
        "content": "The retrieval layer selects relevant documentation based on similarity."
    },
    {
        "section": "Architecture",
        "content": "The generation layer rephrases retrieved documentation into answers using a constrained language model."
    },

    # =========================
    # Design Decisions
    # =========================
    {
        "section": "Design Decisions",
        "content": "The design decisions of DOCARG prioritize correctness and explainability over creativity."
    },
    {
        "section": "Design Decisions",
        "content": "DOCARG avoids speculative responses and does not rely on hidden or external data sources."
    },
    {
        "section": "Design Decisions",
        "content": "DOCARG enforces strict fallback behavior when information is missing from documentation."
    },

    # =========================
    # Limitations
    # =========================
    {
        "section": "Limitations",
        "content": "The limitations of DOCARG are that it can only answer questions explicitly covered in its documentation."
    },
    {
        "section": "Limitations",
        "content": "DOCARG does not reason beyond available information or infer unstated facts."
    },
    {
        "section": "Limitations",
        "content": "These limitations are intentional design decisions to prevent hallucinations."
    },

    # =========================
    # API Reference
    # =========================
    {
        # ✅ ADDED: definition sentence (ONLY change)
        "section": "API Reference",
        "content": "The API reference of DOCARG describes the available backend endpoints and how they can be used."
    },
    {
        "section": "API Reference",
        "content": "The API reference of DOCARG defines a single POST endpoint available at /query."
    },
    {
        "section": "API Reference",
        "content": "The /query endpoint accepts a natural language question and returns a grounded answer."
    },
    {
        "section": "API Reference",
        "content": "The API response may include source metadata indicating which documentation section was used."
    },

    # =========================
    # Error Handling
    # =========================
    {
        "section": "Error Handling",
        "content": "Error handling in DOCARG is designed to fail safely and transparently."
    },
    {
        "section": "Error Handling",
        "content": "If no relevant documentation is retrieved, DOCARG does not generate an answer."
    },
    {
        "section": "Error Handling",
        "content": "If required documentation is missing, DOCARG explicitly refuses to answer."
    },
    {
        "section": "Error Handling",
        "content": "Errors are logged for traceability and debugging."
    },
]
