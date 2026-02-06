// import { useEffect, useState } from "react";

// export default function PressureGauge({ onAlert }) {
//   const [pressure, setPressure] = useState(40);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const value = Math.floor(Math.random() * 120);
//       setPressure(value);

//       if (value > 90) {
//         onAlert(`Emergency! Pressure exceeded: ${value} PSI`);
//       }
//     }, 3000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div style={{
//       background: "#fff",
//       padding: "15px",
//       borderRadius: "10px",
//       width: "200px",
//       boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
//     }}>
//       <h3>Pressure Gauge</h3>
//       <h1>{pressure} PSI</h1>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function PressureGauge({ onAlert }) {
  const [pressure, setPressure] = useState(40);

  useEffect(() => {
    const interval = setInterval(() => {
      const value = Math.floor(Math.random() * 120);
      setPressure(value);

      if (value > 90) {
        onAlert(`EMERGENCY: Pressure exceeded ${value} PSI`);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: "var(--bg-card)",
      padding: 20,
      borderRadius: 12,
      width: 250,
      textAlign: "center"
    }}>
      <h3>Pressure</h3>

      <CircularProgressbar
        value={pressure}
        maxValue={120}
        text={`${pressure} PSI`}
        styles={buildStyles({
          pathColor: pressure > 90 ? "#ff4d4f" : "#00b4ff",
          textColor: "#e6f1ff",
          trailColor: "#1f2a44"
        })}
      />
    </div>
  );
}

