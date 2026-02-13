export default function StatusPill({ connected }) {
  const color = connected ? "#39ff14" : "#ff1744";

  return (
    <div
      style={{
        fontSize: "12px",
        padding: "6px 14px",
        borderRadius: "20px",
        border: `1px solid ${color}`,
        color: color,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "monospace",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 6px ${color}`,
        }}
      />
      {connected ? "CONNECTED" : "DISCONNECTED"}
    </div>
  );
}
