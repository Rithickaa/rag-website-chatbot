import { useState } from "react";
import { askDocarg } from "./api";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");
    setSources([]);

    try {
      const data = await askDocarg(question);
      setAnswer(data.answer);
      setSources(data.sources || []);
    } catch (err) {
      setError("Failed to fetch answer from backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2>Ask DOCARG</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask about the documentation..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            marginBottom: "10px",
          }}
        />
      </form>

      {loading && <p>Thinking...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {answer && (
        <div style={{ marginTop: "20px" }}>
          <h3>Answer</h3>
          <p>{answer}</p>

          {sources.length > 0 && (
            <>
              <h4>Sources</h4>
              <ul>
                {sources.map((src, idx) => (
                  <li key={idx}>
                    {src.section} (score: {src.score.toFixed(2)})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
