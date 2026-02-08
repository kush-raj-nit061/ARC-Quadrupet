import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SensorBarChart({ readings }) {
  if (!readings || readings.length === 0) {
    return <p>No data</p>;
  }

  const data = readings.map((r, index) => ({
    name: index + 1,
    value: r.pressure,
  }));

  return (
    <div style={{ background: "var(--bg-card)", padding: 16, borderRadius: 12 }}>
      <h3>Pressure History</h3>
      <BarChart width={350} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
}
