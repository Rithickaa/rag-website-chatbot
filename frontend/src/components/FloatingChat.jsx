import { useState } from "react";
import ChatPanel from "./ChatPanel";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Ask AI Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          padding: "12px 20px",
          borderRadius: "999px",
          backgroundColor: "#2563eb",
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          zIndex: 1000,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.backgroundColor = "#1d4ed8";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.backgroundColor = "#2563eb";
        }}
      >
        🤖 <span>Ask AI</span>
      </button>

      {/* Chat Window */}
      <div
        style={{
          position: "fixed",
          bottom: "90px",
          right: "24px",
          width: "380px",
          maxHeight: "520px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          zIndex: 1000,
          opacity: open ? 1 : 0,
          transform: open
            ? "translateY(0) scale(1)"
            : "translateY(10px) scale(0.95)",
          pointerEvents: open ? "auto" : "none",
          transition: "all 0.35s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "14px 16px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          Ask DOCARG
          <span
            style={{
              cursor: "pointer",
              fontSize: "16px",
              opacity: 0.9,
            }}
            onClick={() => setOpen(false)}
          >
            ✕
          </span>
        </div>

        {/* Chat Content */}
        <div
          style={{
            flex: 1,
            padding: "14px",
            overflowY: "auto",
            backgroundColor: "#f8fafc",
          }}
        >
          <ChatPanel />
        </div>
      </div>
    </>
  );
}
