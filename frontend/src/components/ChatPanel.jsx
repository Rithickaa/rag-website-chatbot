import { useDocargChat } from "../hooks/useDocargChat";

export default function ChatPanel() {
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

          {sources.length > 0 && (
            <div style={{ marginTop: "8px" }}>
              <strong>Sources</strong>
              <ul style={{ fontSize: "12px" }}>
                {sources.map((src, idx) => (
                  <li key={idx}>
                    {src.section} ({src.score.toFixed(2)})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
