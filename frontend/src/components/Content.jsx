/* ---------- Styles ---------- */

const listStyle = {
  paddingLeft: "22px",
  margin: "18px 0",
};

const noteBox = {
  backgroundColor: "#f9fafb",
  borderLeft: "4px solid #60a5fa",
  padding: "16px 18px",
  borderRadius: "8px",
  margin: "24px 0",
  fontSize: "14.5px",
};

const warningBox = {
  backgroundColor: "#fff7ed",
  borderLeft: "4px solid #fb923c",
  padding: "16px 18px",
  borderRadius: "8px",
  margin: "24px 0",
  fontSize: "14.5px",
};

const codeBlock = {
  backgroundColor: "#0f172a",
  color: "#e5e7eb",
  padding: "16px 18px",
  borderRadius: "10px",
  fontFamily: "ui-monospace, monospace",
  fontSize: "13.5px",
  margin: "22px 0",
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
      <p>
        DOCARG is designed to fail safely and transparently.
      </p>

      <ul style={listStyle}>
        <li>No retrieval → no generation</li>
        <li>Missing docs → explicit refusal</li>
        <li>Errors are logged for traceability</li>
      </ul>
    </>
  ),
};

/* ---------- Component ---------- */

export default function Content({ selectedSection }) {
  return (
    <main
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        lineHeight: "1.8",
        color: "#111827",
        boxSizing: "border-box",
      }}
    >
      {/* Centered readable container */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "64px 72px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "32px",
          }}
        >
          {selectedSection}
        </h1>

        <div style={{ fontSize: "15.8px", color: "#374151" }}>
          {docs[selectedSection]}
        </div>
      </div>
    </main>
  );
}
