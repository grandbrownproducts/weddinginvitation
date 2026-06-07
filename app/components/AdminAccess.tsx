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
        bottom: 32,
        left: 32,
        zIndex: 200,
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.9)",
        border: "2px solid rgba(201,169,110,0.5)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        cursor: "pointer",
        fontSize: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      🔒
    </button>
  );
}
