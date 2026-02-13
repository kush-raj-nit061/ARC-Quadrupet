import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

function Card({ title, value, color }) {
  return (
    <div className="telemetry-card">
      <p className="telemetry-card-title">{title}</p>
      <h2 style={{ color }}>{value}</h2>
    </div>
  );
}

export default function StatusCards() {
  const [battery, setBattery] = useState("--");

  useEffect(() => {
    const batteryRef = ref(database, "go2/battery/soc");

    const unsubscribe = onValue(batteryRef, (snapshot) => {
      const value = snapshot.val();
      if (value !== null) {
        setBattery(value);
      }
    });

    return () => unsubscribe();
  }, []);

  const batteryColor =
    battery < 20 ? "var(--red)" :
    battery < 50 ? "var(--yellow)" :
    "var(--green)";

  return (
    <div className="telemetry-card-row">
      <Card title="Robot Status" value="ONLINE" color="var(--accent)" />
      <Card title="Battery" value={`${battery}%`} color={batteryColor} />
      <Card title="Mode" value="AUTONOMOUS" color="var(--accent)" />

      <button
        className="telemetry-button"
        onClick={async () => {
          try {
            await fetch("http://localhost:8000/run-fetch", {
              method: "POST",
            });
          } catch (error) {
            console.error("Error running script:", error);
          }
        }}
      >
        SEND GO2
      </button>
    </div>
  );
}
