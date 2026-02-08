import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const EMERGENCY_PRESSURE = 60;

export default function PressureGauge({ latest }) {
  if (!latest) {
    return (
      <div style={{ background: "var(--bg-card)", padding: 20, borderRadius: 12 }}>
        <h3>Pressure</h3>
        <p>No data</p>
      </div>
    );
  }

  const pressure = latest.pressure;
  const isEmergency = pressure > EMERGENCY_PRESSURE;

  return (
    <div
      style={{
        background: isEmergency ? "#2a0f14" : "var(--bg-card)",
        padding: 20,
        borderRadius: 12,
        width: 260,
        textAlign: "center",
        border: isEmergency ? "2px solid #ff0000" : "1px solid #1f2a44",
        boxShadow: isEmergency
          ? "0 0 25px rgba(255,0,0,0.7)"
          : "0 0 10px rgba(0,180,255,0.2)",
      }}
    >
      <h3 style={{ color: isEmergency ? "#ff4d4f" : "#00b4ff" }}>
        Pressure Gauge
      </h3>

      {/* Semi-circular gauge */}
      <div style={{ width: "100%", height: 140 }}>
        <CircularProgressbar
          value={pressure}
          maxValue={120}
          circleRatio={0.5}
          styles={buildStyles({
            rotation: 0.75,
            pathColor: isEmergency ? "#ff0000" : "#00b4ff",
            textColor: isEmergency ? "#ff0000" : "#e6f1ff",
            trailColor: "#1f2a44",
          })}
          text={`${pressure} PSI`}
        />
      </div>

      <p style={{ marginTop: 12, fontSize: 12, color: "#94a3b8" }}>
        Last update: {new Date(latest.timestamp).toLocaleTimeString()}
      </p>

      {isEmergency && (
        <p style={{ color: "#ff4d4f", fontWeight: "bold" }}>
          ⚠ EMERGENCY
        </p>
      )}
    </div>
  );
}
