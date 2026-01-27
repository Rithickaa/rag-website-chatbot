import { useEffect, useState } from "react";

/* ---------- Styles ---------- */

const listStyle = {
  paddingLeft: "24px",
  margin: "20px 0",
};

const noteBox = {
  backgroundColor: "#f8fafc",
  borderLeft: "4px solid #3b82f6",
  padding: "18px 20px",
  borderRadius: "10px",
  margin: "28px 0",
  fontSize: "15px",
};

const warningBox = {
  backgroundColor: "#fff7ed",
  borderLeft: "4px solid #f97316",
  padding: "18px 20px",
  borderRadius: "10px",
  margin: "28px 0",
  fontSize: "15px",
};

const codeBlock = {
  backgroundColor: "#020617",
  color: "#e5e7eb",
  padding: "18px 20px",
  borderRadius: "12px",
  fontFamily: "ui-monospace, monospace",
  fontSize: "14px",
  margin: "26px 0",
};

/* ---------- Documentation Content ---------- */

const docs = {
  Introduction: (
    <>
      <p>
        DOCARG is a documentation-first question answering system designed for
        reliability, traceability, and correctness.
      </p>

      <p>
        The system ensures that every response is grounded strictly in
        documented knowledge, making it suitable for technical documentation,
        internal knowledge bases, and developer platforms.
      </p>

      <div style={noteBox}>
        <strong>Key Idea</strong>
        <p>
          DOCARG treats documentation as the single source of truth and never
          allows the language model to invent answers.
        </p>
      </div>
    </>
  ),

  "Core Concepts": (
    <>
      <p>
        DOCARG is built around a retrieval-first paradigm. The system always
        retrieves documentation before attempting to generate an answer.
      </p>

      <ul style={listStyle}>
        <li>Documentation is authoritative</li>
        <li>Retrieval precedes generation</li>
        <li>LLMs act only as rephrasing engines</li>
        <li>Failure is explicit and safe</li>
      </ul>

      <p>
        This approach significantly reduces hallucinations compared to
        traditional chat-based systems.
      </p>
    </>
  ),

  "Retrieval Mechanism": (
    <>
      <p>
        Documentation is split into logical, paragraph-level segments that are
        indexed for retrieval.
      </p>

      <ul style={listStyle}>
        <li>Text normalization and cleaning</li>
        <li>TF-IDF vectorization</li>
        <li>Cosine similarity ranking</li>
      </ul>

      <div style={codeBlock}>
        Query → Preprocessing → TF-IDF → Similarity → Top Results
      </div>

      <p>
        Only the most relevant documentation segments are passed to the
        generation layer.
      </p>
    </>
  ),

  "Why TF-IDF": (
    <>
      <p>
        DOCARG intentionally avoids opaque embedding-based retrieval to
        prioritize transparency.
      </p>

      <ul style={listStyle}>
        <li>Deterministic retrieval behavior</li>
        <li>Easy inspection of term relevance</li>
        <li>Lower operational complexity</li>
      </ul>

      <div style={noteBox}>
        <strong>Design Choice</strong>
        <p>
          TF-IDF allows developers to explain exactly why a document was
          retrieved for a query.
        </p>
      </div>
    </>
  ),

  Architecture: (
    <>
      <p>
        DOCARG follows a clean separation between presentation, retrieval, and
        generation layers.
      </p>

      <div style={codeBlock}>
        Frontend → Retriever → Documentation → LLM → Response
      </div>

      <ul style={listStyle}>
        <li>Frontend handles navigation and UI</li>
        <li>Backend handles retrieval and grounding</li>
        <li>LLM is constrained by documentation context</li>
      </ul>
    </>
  ),

  "Design Decisions": (
    <>
      <p>
        DOCARG favors correctness and explainability over creativity.
      </p>

      <ul style={listStyle}>
        <li>No speculative responses</li>
        <li>No hidden data sources</li>
        <li>Strict fallback behavior</li>
      </ul>
    </>
  ),

  Limitations: (
    <>
      <div style={warningBox}>
        <strong>Important</strong>
        <p>
          DOCARG cannot answer questions outside its documentation. This is an
          intentional design decision.
        </p>
      </div>

      <p>
        The system does not reason beyond available information or infer
        unstated facts.
      </p>
    </>
  ),

  "API Reference": (
    <>
      <p>The backend exposes a single query endpoint:</p>

      <div style={codeBlock}>POST /query</div>

      <ul style={listStyle}>
        <li>Accepts a natural language question</li>
        <li>Returns grounded answer</li>
        <li>Includes source metadata</li>
      </ul>
    </>
  ),

  "Error Handling": (
    <>
      <p>DOCARG is designed to fail safely and transparently.</p>

      <ul style={listStyle}>
        <li>No retrieval → no generation</li>
        <li>Missing docs → explicit refusal</li>
        <li>Errors are logged for traceability</li>
      </ul>
    </>
  ),
};

/* ---------- Component ---------- */

export default function Content({ selectedSection, sectionSource }) {
  const [highlight, setHighlight] = useState(false);

  // ✨ Highlight ONLY when coming from chatbot
  useEffect(() => {
    if (sectionSource === "chat") {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [selectedSection, sectionSource]);

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f3f7fb",
        boxSizing: "border-box",
        padding: "48px 0",
      }}
    >
      <div
        style={{
          maxWidth: "860px",
          marginLeft: "max(48px, 6vw)",
          marginRight: "min(120px, 10vw)",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "64px 56px",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: 700,
            marginBottom: "14px",
            color: "#020617",
            padding: highlight ? "6px 10px" : "0",
            backgroundColor: highlight ? "#d8e0f8" : "transparent",
            borderRadius: "8px",
            transition: "all 0.6s ease",
            display: "inline-block",
          }}
        >
          {selectedSection}
        </h1>

        <div
          style={{
            width: "72px",
            height: "4px",
            backgroundColor: "#aac8f7",
            borderRadius: "999px",
            marginBottom: "36px",
          }}
        />

        <div
          style={{
            fontSize: "16px",
            lineHeight: "1.9",
            color: "#35475f",
          }}
        >
          {docs[selectedSection]}
        </div>
      </div>
    </main>
  );
}
