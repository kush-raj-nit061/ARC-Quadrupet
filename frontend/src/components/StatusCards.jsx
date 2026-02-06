// function Card({ title, value }) {
//   return (
//     <div style={{
//       background: "#fff",
//       padding: "15px",
//       borderRadius: "10px",
//       width: "180px",
//       boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
//     }}>
//       <h4>{title}</h4>
//       <h2>{value}</h2>
//     </div>
//   );
// }

// export default function StatusCards() {
//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       <Card title="Robot Status" value="Online" />
//       <Card title="Battery" value="78%" />
//       <Card title="Mode" value="Autonomous" />
//     </div>
//   );
// }

function Card({ title, value }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      borderRadius: "12px",
      padding: "18px",
      width: "180px",
      boxShadow: "0 0 15px rgba(0,180,255,0.15)"
    }}>
      <p style={{ color: "var(--text-muted)" }}>{title}</p>
      <h2 style={{ color: "var(--accent-blue)" }}>{value}</h2>
    </div>
  );
}

export default function StatusCards() {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Card title="Robot Status" value="ONLINE" />
      <Card title="Battery" value="78%" />
      <Card title="Mode" value="AUTONOMOUS" />
    </div>
  );
}
