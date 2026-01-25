export default function Header() {
  return (
    <header
      style={{
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "default",
          animation: "fadeIn 0.8s ease-out",
        }}
      >
        {/* Robot Icon */}
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            backgroundColor: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "rotate(-8deg) scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "rotate(0deg) scale(1)";
          }}
        >
          🤖
        </div>

        {/* Product Name */}
        <div
          style={{
            fontSize: "20px",
            fontWeight: "700",
            letterSpacing: "0.02em",
            color: "#111827",
          }}
        >
          DOCARG
        </div>
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes fadeIn {
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
