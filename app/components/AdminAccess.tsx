"use client";

export default function AdminAccess() {
  const goToAdmin = () => {
    const pass = window.prompt("Enter admin password:");
    if (pass === null) return;
    if (pass === "123") {
      window.location.href = "/admin";
    } else {
      window.alert("Incorrect password.");
    }
  };

  return (
    <button
      onClick={goToAdmin}
      title="Admin"
      style={{
        position: "fixed",
        bottom: 6,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.15)",
        border: "1px solid rgba(255,255,255,0.15)",
        cursor: "pointer",
        fontSize: 11,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.25,
        transition: "opacity 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.25")}
    >
      🔒
    </button>
  );
}
