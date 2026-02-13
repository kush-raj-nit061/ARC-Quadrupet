import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

export default function MotorHeatmap() {
  const [motors, setMotors] = useState([]);

  useEffect(() => {
    const motorRef = ref(database, "go2/motors");

    const unsubscribe = onValue(motorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMotors(Object.values(data));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 10,
      }}
    >
      {motors.map((m, i) => {
        const temp = m.temperature;

        const color =
          temp > 70
            ? "var(--red)"
            : temp > 50
            ? "var(--yellow)"
            : "var(--green)";

        return (
          <div
            key={i}
            style={{
              padding: 10,
              borderRadius: 8,
              background: "#111827",
              border: `1px solid ${color}`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 12 }}>M{i}</div>
            <div style={{ color, fontSize: 18 }}>
              {temp}°C
            </div>
          </div>
        );
      })}
    </div>
  );
}
