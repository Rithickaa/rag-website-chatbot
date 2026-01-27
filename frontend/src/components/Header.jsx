export default function Header() {
  return (
    <header
      style={{
        height: "88px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        // 🌊 Soft blue header background
        backgroundColor: "#f5f8ff",

        // Separation from content
        borderBottom: "1px solid #e2e8f0",

        // Brand anchor (keep)
        borderTop: "3px solid #2563eb",

        position: "sticky",
        top: 0,
        zIndex: 100,

        // Very subtle depth
        boxShadow: "0 1px 0 rgba(15,23,42,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          cursor: "default",
          animation: "headerFade 0.8s ease-out",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",

            // Slightly stronger blue than background
            backgroundColor: "#e0e7ff",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          🤖
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            lineHeight: 1.1,
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.04em",

              // 🔵 Primary blue title
              color: "#1e3a8a",
            }}
          >
            DOCARG
          </div>

          <div
            style={{
              fontSize: "12px",

              // Muted slate-blue subtitle
              color: "#475569",

              marginTop: "4px",
              letterSpacing: "0.02em",
            }}
          >
            Documentation-Oriented Argumentation & Retrieval Generation
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes headerFade {
            from {
              opacity: 0;
              transform: translateY(-6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </header>
  );
}
