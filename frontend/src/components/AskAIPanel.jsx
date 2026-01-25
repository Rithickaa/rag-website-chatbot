import ChatPanel from "./ChatPanel";

export default function AskAIPanel({ open, onClose }) {
  return (
    <div
      style={{
        width: "360px",
        height: "100%",
        backgroundColor: "#ffffff",
        borderLeft: "1px solid #e5e7eb",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease",
        boxShadow: "-10px 0 30px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "600",
          fontSize: "14px",
        }}
      >
        🤖 Ask DOCARG
        <span
          onClick={onClose}
          style={{
            cursor: "pointer",
            fontSize: "18px",
            color: "#6b7280",
          }}
        >
          ✕
        </span>
      </div>

      {/* Chat Body */}
      <div
        style={{
          flex: 1,
          padding: "16px",
          overflowY: "auto",
          backgroundColor: "#f9fafb",
        }}
      >
        <ChatPanel />
      </div>
    </div>
  );
}
