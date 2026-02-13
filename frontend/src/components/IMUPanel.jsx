import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

function deg(rad) {
  return (rad * 180 / Math.PI).toFixed(1);
}

export default function IMUPanel() {
  const [imu, setImu] = useState(null);

  useEffect(() => {
    const imuRef = ref(database, "go2/imu");

    const unsubscribe = onValue(imuRef, (snapshot) => {
      setImu(snapshot.val());
    });

    return () => unsubscribe();
  }, []);

  if (!imu) return <p>Loading...</p>;

  const roll  = imu?.rpy?.[0] ?? 0;
  const pitch = imu?.rpy?.[1] ?? 0;
  const yaw   = imu?.rpy?.[2] ?? 0;

  const accelX = imu?.accel?.[0] ?? 0;
  const accelY = imu?.accel?.[1] ?? 0;
  const accelZ = imu?.accel?.[2] ?? 0;

  const rollDeg  = deg(roll);
  const pitchDeg = deg(pitch);
  const yawDeg   = deg(yaw);

  const tiltDanger =
    Math.abs(rollDeg) > 30 || Math.abs(pitchDeg) > 30;

  return (
    <div className="imu-layout">

      {/* Orientation */}
      <div className="imu-orientation">

        <div className={`imu-box ${tiltDanger ? "imu-warning" : ""}`}>
          <div className="metric-small">ROLL</div>
          <div className="metric-medium">{rollDeg}°</div>
        </div>

        <div className={`imu-box ${tiltDanger ? "imu-warning" : ""}`}>
          <div className="metric-small">PITCH</div>
          <div className="metric-medium">{pitchDeg}°</div>
        </div>

        <div className="imu-box">
          <div className="metric-small">YAW</div>
          <div className="metric-medium">{yawDeg}°</div>
        </div>

      </div>

      {/* Acceleration */}
      <div className="imu-accel">

        <div className="imu-accel-box">
          <div className="metric-small">Accel X</div>
          <div className="metric-medium">{accelX.toFixed(2)}</div>
        </div>

        <div className="imu-accel-box">
          <div className="metric-small">Accel Y</div>
          <div className="metric-medium">{accelY.toFixed(2)}</div>
        </div>

        <div className="imu-accel-box">
          <div className="metric-small">Accel Z</div>
          <div className="metric-medium">{accelZ.toFixed(2)}</div>
        </div>

      </div>

    </div>
  );
}
