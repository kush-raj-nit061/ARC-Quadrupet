// export default function AlertDialog({ open, message, onClose }) {
//   if (!open) return null;

//   return (
//     <div style={{
//       position: "fixed",
//       inset: 0,
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center"
//     }}>
//       <div style={{
//         background: "#fff",
//         padding: "25px",
//         borderRadius: "10px",
//         textAlign: "center"
//       }}>
//         <h2 style={{ color: "red" }}>⚠ EMERGENCY</h2>
//         <p>{message}</p>
//         <button onClick={onClose}>Acknowledge</button>
//       </div>
//     </div>
//   );
// }


export default function AlertDialog({ open, message, onClose }) {
  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(255,0,0,0.15)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "#111",
        padding: 30,
        borderRadius: 12,
        border: "2px solid red",
        textAlign: "center"
      }}>
        <h2 style={{ color: "red" }}>⚠ SYSTEM ALERT</h2>
        <p>{message}</p>
        <button onClick={onClose}>ACKNOWLEDGE</button>
      </div>
    </div>
  );
}
