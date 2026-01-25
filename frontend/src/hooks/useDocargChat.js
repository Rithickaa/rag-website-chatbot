import { useState } from "react";
import { askDocarg } from "../api";

export function useDocargChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");
    setSources([]);

    try {
      const data = await askDocarg(question);
      setAnswer(data.answer);
      setSources(data.sources || []);
    } catch {
      setError("Failed to fetch answer from backend");
    } finally {
      setLoading(false);
    }
  };

  return {
    question,
    setQuestion,
    answer,
    sources,
    loading,
    error,
    submitQuestion,
  };
}
