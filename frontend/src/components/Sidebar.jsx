const sections = [
  "Introduction",
  "Core Concepts",
  "Retrieval Mechanism",
  "Why TF-IDF",
  "Architecture",
  "Design Decisions",
  "Limitations",
  "API Reference",
  "Error Handling",
];

export default function Sidebar({
  selectedSection,
  setSelectedSection,
  sectionSource, // 🔑 source of navigation
}) {
  return (
    <aside
      style={{
        width: "280px",
        height: "100vh",
        position: "sticky",
        top: 0,

        // 🌊 Soft blue sidebar base
        backgroundColor: "#eef4fa",

        borderRight: "1px solid #e2e8f0",
        padding: "28px 16px",
        boxSizing: "border-box",

        // Clear separation from content
        boxShadow: "inset -1px 0 0 #dbeafe",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#1e3a8a", // 🔵 stronger blue
          marginBottom: "18px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Documentation
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {sections.map((section) => {
          const isActive = selectedSection === section;
          const shouldPulse =
            isActive && sectionSource === "chat";

          return (
            <div
              key={section}
              onClick={() => setSelectedSection(section)}
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                cursor: "pointer",

                fontSize: "14px",
                fontWeight: isActive ? 600 : 500,

                // 🔵 Text color
                color: isActive ? "#1e3a8a" : "#334155",

                // 🔵 Active background
                backgroundColor: isActive
                  ? "#e0e7ff"
                  : "transparent",

                // 🔵 Left indicator
                borderLeft: isActive
                  ? "4px solid #2563eb"
                  : "4px solid transparent",

                // ✨ Chat-triggered pulse
                boxShadow: shouldPulse
                  ? "0 0 0 4px rgba(37,99,235,0.25)"
                  : "none",

                transition:
                  "background-color 0.2s ease, box-shadow 0.6s ease, transform 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#f1f5ff";
                  e.currentTarget.style.transform = "translateX(3px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }
              }}
            >
              {section}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
