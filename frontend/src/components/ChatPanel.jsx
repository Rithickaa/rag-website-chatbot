import { useDocargChat } from "../hooks/useDocargChat";

export default function ChatPanel({ onSeeSection }) {
  const {
    question,
    setQuestion,
    answer,
    sources,
    loading,
    error,
    submitQuestion,
  } = useDocargChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuestion();
  };

  const primarySource = sources && sources.length > 0 ? sources[0] : null;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask about this documentation..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        />
      </form>

      {loading && <p>Thinking...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {answer && (
        <div style={{ fontSize: "14px" }}>
          <p>{answer}</p>

          {/* 🔥 See section action */}
          {primarySource && (
            <button
              onClick={() => onSeeSection(primarySource.section)}
              style={{
                marginTop: "8px",
                background: "none",
                border: "none",
                padding: 0,
                color: "#2563eb",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              📘 See section: <strong>{primarySource.section}</strong>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
