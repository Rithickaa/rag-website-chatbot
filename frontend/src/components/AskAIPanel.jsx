import { useState, useEffect } from "react";

const SAMPLE_QUESTIONS = [
  "What is DOCARG?",
  "Why does DOCARG use TF-IDF?",
  "How does the retrieval mechanism work?",
  "What happens if documentation is missing?",
];

export default function AskAIPanel({ open, onClose, onSeeSection }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  if (!open) return null;

  const sendMessage = async (overrideQuestion) => {
    const question = (overrideQuestion ?? input).trim();
    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: data.answer,
          sources: data.sources || [],
          isError: false,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "I don’t know based on the available documentation.",
          sources: [],
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSeeSection = (section) => {
    onClose();
    setTimeout(() => onSeeSection(section), 120);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(14, 39, 39, 0.25)",
          zIndex: 999,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Chat Panel */}
      <div
        style={{
          position: "fixed",
          right: "24px",
          bottom: "88px",
          width: "360px",
          height: "520px",
          backgroundColor: "#f8fbff",
          borderRadius: "16px",
          boxShadow: "0 30px 60px rgba(37,99,235,0.25)",
          display: "flex",
          flexDirection: "column",
          zIndex: 1000,
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateY(0) scale(1)"
            : "translateY(12px) scale(0.97)",
          transition:
            "opacity 0.25s ease-out, transform 0.25s ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px 16px",
            backgroundColor: "#eef2ff",
            borderBottom: "1px solid #dbeafe",
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            color: "#1e3a8a",
          }}
        >
          🤖 Ask DOCARG
          <button
            onClick={onClose}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            padding: "16px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            fontSize: "14px",
          }}
        >
          {messages.length === 0 && !loading && (
            <div
              style={{
                marginTop: "20px",
                color: "#475569",
                fontSize: "13px",
                lineHeight: "1.6",
              }}
            >
              <p style={{ fontWeight: 600, color: "#1e3a8a" }}>
                Welcome to DOCARG
              </p>

              <p style={{ marginBottom: "8px" }}>
                <strong>
                  Document-Oriented Argumentation & Retrieval Generation
                </strong>
              </p>

              <p>
                Ask questions about the{" "}
                <strong>visible documentation</strong>.
              </p>

              <div style={{ marginTop: "14px" }}>
                <p style={{ fontWeight: 500, marginBottom: "6px" }}>
                  Try asking:
                </p>

                <ul
                  style={{
                    paddingLeft: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {SAMPLE_QUESTIONS.map((q) => (
                    <li
                      key={q}
                      onClick={() => sendMessage(q)}
                      style={{
                        cursor: "pointer",
                        color: "#1345b0",
                        textDecoration: "underline",
                      }}
                    >
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              <p style={{ marginTop: "14px", fontSize: "12px" }}>
                📘 DOCARG does not answer beyond the documentation.
              </p>
            </div>
          )}

          {messages.map((msg, idx) => {
            const primarySource =
              msg.role === "ai" && msg.sources?.length > 0
                ? msg.sources[0]
                : null;

            return (
              <div
                key={idx}
                style={{
                  alignSelf:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.isError
                    ? "#fee2e2"
                    : msg.role === "user"
                    ? "#0a3ca9"
                    : "#e5f1fd",
                  color:
                    msg.role === "user" ? "#fff" : "#1e293b",
                  padding: "10px 12px",
                  borderRadius: "12px",
                  maxWidth: "90%",
                }}
              >
                <div>{msg.content}</div>

                {primarySource && (
                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "12px",
                      color: "#1e3a8a",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#e0e7ff",
                      padding: "6px 8px",
                      borderRadius: "8px",
                    }}
                  >
                    📍 Found in: {primarySource.section}
                    <button
                      onClick={() =>
                        handleSeeSection(primarySource.section)
                      }
                      style={{
                        marginLeft: "6px",
                        backgroundColor: "#123b94",
                        color: "#fff",
                        border: "none",
                        borderRadius: "999px",
                        padding: "4px 10px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      See section
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div style={{ color: "#475569", fontSize: "13px" }}>
              DOCARG is thinking…
            </div>
          )}
        </div>

        {/* Input */}
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid #dbeafe",
            display: "flex",
            gap: "8px",
            backgroundColor: "#f1f5ff",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about this documentation…"
            style={{
              flex: 1,
              height: "40px",
              padding: "0 12px",
              borderRadius: "8px",
              border: "1px solid #bfdbfe",
            }}
            disabled={loading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: "#1a3e97",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
