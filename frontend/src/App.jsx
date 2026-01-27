import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Header from "./components/Header";
import AskAIPanel from "./components/AskAIPanel";

export default function App() {
  const [selectedSection, setSelectedSection] = useState("Introduction");
  const [aiOpen, setAiOpen] = useState(false);
  const [sectionSource, setSectionSource] = useState("sidebar");

  return (
    <>
      <Header />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 88px)",
          backgroundColor: "#f9fafb",
        }}
      >
        <Sidebar
          selectedSection={selectedSection}
          setSelectedSection={(section) => {
            setSectionSource("sidebar");
            setSelectedSection(section);
          }}
          sectionSource={sectionSource}
        />

        <div style={{ flex: 1, overflow: "auto" }}>
          <Content
            selectedSection={selectedSection}
            sectionSource={sectionSource}
          />
        </div>
      </div>

      <AskAIPanel
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onSeeSection={(section) => {
          setSectionSource("chat");
          setSelectedSection(section);
        }}
      />

      {/* 🌊 Floating Ask AI Button */}
      {!aiOpen && (
        <button
          onClick={() => setAiOpen(true)}
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",

            padding: "14px 22px",
            borderRadius: "999px",

            backgroundColor: "#294687",
            color: "#ffffff",

            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.02em",

            border: "none",
            cursor: "pointer",

            boxShadow:
              "0 12px 30px rgba(37,99,235,0.35)",

            zIndex: 1000,

            animation: "askAiPulse 2.5s ease-in-out infinite",
            transition:
              "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-3px)";
            e.currentTarget.style.boxShadow =
              "0 18px 40px rgba(37,99,235,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 12px 30px rgba(37,99,235,0.35)";
          }}
        >
          🤖 Ask AI
        </button>
      )}

      {/* Button animation */}
      <style>
        {`
          @keyframes askAiPulse {
            0% {
              box-shadow: 0 0 0 0 rgba(37,99,235,0.35);
            }
            70% {
              box-shadow: 0 0 0 14px rgba(37,99,235,0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(37,99,235,0);
            }
          }
        `}
      </style>
    </>
  );
}
