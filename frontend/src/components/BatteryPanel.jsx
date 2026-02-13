import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

export default function BatteryPanel() {
  const [battery, setBattery] = useState(null);

  useEffect(() => {
    const batteryRef = ref(database, "go2/battery");

    const unsubscribe = onValue(batteryRef, (snapshot) => {
      setBattery(snapshot.val());
    });

    return () => unsubscribe();
  }, []);

  if (!battery) return <p>Loading...</p>;

  const {
    soc = 0,
    voltage = 0,
    current_a = 0,
    pack_current = 0,
    cell_vol = [],
  } = battery;

  const isCharging = pack_current > 0;

  const avgCell =
    cell_vol.length > 0
      ? cell_vol.reduce((a, b) => a + b, 0) / cell_vol.length
      : 0;

  const imbalance =
    cell_vol.length > 0
      ? Math.max(...cell_vol) - Math.min(...cell_vol)
      : 0;

  return (
    <div className="battery-layout">

      <div className="battery-top">
        <div className="metric-large">{soc}%</div>
        <div className="metric-small">State of Charge</div>
      </div>

      <div className="battery-grid">

        <div className="battery-box">
          <div className="metric-small">Voltage</div>
          <div className="metric-medium">
            {voltage.toFixed(2)} V
          </div>
        </div>

        <div className="battery-box">
          <div className="metric-small">Current</div>
          <div className="metric-medium">
            {current_a.toFixed(2)} A
          </div>
        </div>

        <div className="battery-box">
          <div className="metric-small">Cell Avg</div>
          <div className="metric-medium">
            {avgCell.toFixed(3)} V
          </div>
        </div>

        <div className="battery-box">
          <div className="metric-small">Imbalance</div>
          <div className="metric-medium">
            {imbalance.toFixed(3)} V
          </div>
        </div>

      </div>

      <div className="metric-small" style={{ marginTop: 10 }}>
        Status: {isCharging ? "Charging" : "Discharging"}
      </div>

    </div>
  );
}
