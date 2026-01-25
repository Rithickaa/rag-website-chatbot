import { useEffect, useState } from "react";
import loadMarkdown from "../utils/loadMarkdown";

export function useMarkdownDocs(path: string) {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMarkdown(path)
      .then(setContent)
      .catch((err) => setError(err.message));
  }, [path]);

  return { content, error };
}
