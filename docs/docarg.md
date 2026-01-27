# DOCARG Documentation

## Introduction

DOCARG is a documentation-first question answering system designed for reliability, traceability, and correctness.

The system ensures that every response is grounded strictly in documented knowledge.

DOCARG is suitable for technical documentation, internal knowledge bases, and developer platforms.

DOCARG treats documentation as the single source of truth.

The system never allows the language model to invent answers or introduce undocumented information.

---

## Core Concepts

DOCARG follows a retrieval-first paradigm.

The system always retrieves documentation before attempting to generate an answer.

Documentation is treated as authoritative and complete.

The language model is used only as a rephrasing and summarization engine.

DOCARG explicitly avoids speculative or creative responses.

If documentation does not contain the answer, the system fails safely and explicitly.

This design significantly reduces hallucinations compared to traditional chat-based systems.

---

## Retrieval Mechanism

DOCARG splits documentation into logical, paragraph-level segments.

Each segment is indexed independently for retrieval.

Documentation undergoes text normalization and cleaning before indexing.

TF-IDF vectorization is applied to all documentation segments.

User queries are processed using the same preprocessing steps.

Cosine similarity is used to rank documentation segments against the query.

Only the most relevant documentation segments are selected.

Only retrieved segments are passed to the generation layer.

---

## Why TF-IDF

DOCARG intentionally avoids opaque embedding-based retrieval methods.

TF-IDF provides deterministic and explainable retrieval behavior.

TF-IDF allows inspection of term importance and relevance.

Developers can trace exactly why a document was retrieved for a query.

TF-IDF reduces operational complexity compared to embedding-based systems.

This design choice prioritizes transparency over semantic approximation.

---

## Architecture

DOCARG follows a clean separation of concerns.

The frontend is responsible for navigation and user interface.

The backend is responsible for retrieval and grounding.

Documentation serves as the authoritative knowledge source.

The retriever selects relevant documentation segments.

The language model generates responses constrained strictly by retrieved documentation.

The language model does not introduce new facts.

---

## Design Decisions

DOCARG prioritizes correctness over creativity.

The system does not produce speculative responses.

DOCARG does not use hidden or external data sources.

All answers must be traceable to explicit documentation segments.

The system includes strict fallback behavior for missing information.

---

## Limitations

DOCARG cannot answer questions outside its documentation.

This limitation is intentional and by design.

The system does not infer unstated facts.

DOCARG does not reason beyond available documentation.

If documentation does not explicitly contain the answer, the system responds that the information is not available.

---

## API Reference

DOCARG exposes a single query endpoint.

The endpoint is a POST request to `/query`.

The endpoint accepts a natural language question.

The endpoint returns a grounded answer derived from documentation.

The response includes source or retrieval metadata when applicable.

---

## Error Handling

DOCARG is designed to fail safely and transparently.

If no relevant documentation is retrieved, no generation occurs.

If documentation is missing, the system explicitly refuses to answer.

Errors are logged for traceability and debugging.

The system prioritizes safety over partial or guessed answers.
