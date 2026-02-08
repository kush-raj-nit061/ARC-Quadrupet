import { useEffect, useState } from "react";

import StatusCards from "../components/StatusCards";
import TaskPieChart from "../components/TaskPieChart";
import SensorBarChart from "../components/SensorBarChart";
import PressureGauge from "../components/PressureGauge";
import AlertDialog from "../components/AlertDialog";

export default function Dashboard() {
  const [readings, setReadings] = useState([]);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertShown, setAlertShown] = useState(false);

  // 🔹 Load pressure JSON on page load
  useEffect(() => {
    fetch("/pressure_data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load pressure_data.json");
        return res.json();
      })
      .then((data) => {
        setReadings(data.readings || []);
      })
      .catch((err) => {
        console.error("Error loading pressure data:", err);
      });
  }, []);

  // 🔹 Latest pressure reading
  const latestReading =
    readings.length > 0 ? readings[readings.length - 1] : null;

  // 🚨 ALERT LOGIC (threshold = 50 PSI)
  useEffect(() => {
    if (!latestReading) return;

    if (latestReading.pressure > 65 && !alertShown) {
      setAlertMsg(
        `⚠ WARNING: Pressure exceeded 50 PSI\nCurrent: ${latestReading.pressure} PSI`
      );
      setAlertOpen(true);
      setAlertShown(true);
    }

    // Reset alert when pressure returns to safe range
    if (latestReading.pressure <= 50) {
      setAlertShown(false);
    }
  }, [latestReading, alertShown]);

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ color: "#00b4ff" }}>⚙ Robotics Control Dashboard</h1>

      {/* STATUS CARDS */}
      <StatusCards />

      {/* MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "24px",
          marginTop: "30px",
        }}
      >
        {/* PIE CHART → latest reading */}
        <TaskPieChart latest={latestReading} />

        {/* BAR CHART → historical readings */}
        <SensorBarChart readings={readings} />

        {/* GAUGE → latest reading */}
        <PressureGauge latest={latestReading} />
      </div>

      {/* ALERT DIALOG */}
      <AlertDialog
        open={alertOpen}
        message={alertMsg}
        onClose={() => setAlertOpen(false)}
      />

      {/* DEBUG JSON VIEW (optional – remove later) */}
      <pre
        style={{
          marginTop: 30,
          background: "#0b1220",
          padding: 12,
          borderRadius: 8,
          fontSize: 12,
          color: "#7dd3fc",
          maxHeight: 220,
          overflow: "auto",
        }}
      >
        {JSON.stringify(readings, null, 2)}
      </pre>
    </div>
  );
}
