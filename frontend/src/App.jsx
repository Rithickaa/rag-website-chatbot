import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Header from "./components/Header";
import AskAIPanel from "./components/AskAIPanel";

export default function App() {
  const [selectedSection, setSelectedSection] = useState("Introduction");
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <>
      <Header />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 72px)",
          backgroundColor: "#f9fafb",
        }}
      >
        {/* Sidebar */}
        <Sidebar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />

        {/* Main area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* Documentation content */}
          <div
            style={{
              flex: aiOpen ? "0 0 calc(100% - 360px)" : "1",
              transition: "flex 0.3s ease",
            }}
          >
            <Content selectedSection={selectedSection} />
          </div>

          {/* Ask AI Panel */}
          <AskAIPanel open={aiOpen} onClose={() => setAiOpen(false)} />
        </div>
      </div>

      {/* Ask AI Button */}
      <button
        onClick={() => setAiOpen(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          padding: "12px 20px",
          borderRadius: "999px",
          backgroundColor: "#111827",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          zIndex: 1000,
        }}
      >
        🤖 Ask AI
      </button>
    </>
  );
}
