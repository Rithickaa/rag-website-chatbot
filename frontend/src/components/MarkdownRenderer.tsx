import ReactMarkdown from "react-markdown";
import "../styles/markdown.css";

type MarkdownRendererProps = {
  content: string;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content || typeof content !== "string") {
    return null;
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
