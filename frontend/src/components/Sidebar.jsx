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

export default function Sidebar({ selectedSection, setSelectedSection }) {
  return (
    <aside
      style={{
        width: "280px",
        height: "100vh",
        position: "sticky",
        top: 0,
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        padding: "24px 16px",
        boxSizing: "border-box",
      }}
    >
      {/* Sidebar Title */}
      <div
        style={{
          fontSize: "13px",
          fontWeight: "600",
          color: "#6b7280",
          marginBottom: "16px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Documentation
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {sections.map((section) => {
          const isActive = selectedSection === section;

          return (
            <div
              key={section}
              onClick={() => setSelectedSection(section)}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: isActive ? "600" : "500",
                color: isActive ? "#1d4ed8" : "#374151",
                backgroundColor: isActive ? "#eff6ff" : "transparent",
                borderLeft: isActive
                  ? "3px solid #2563eb"
                  : "3px solid transparent",
                transition:
                  "background-color 0.2s ease, color 0.2s ease, transform 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.transform = "translateX(2px)";
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
