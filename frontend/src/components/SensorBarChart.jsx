import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

export default function SensorBarChart({ readings }) {
  if (!readings?.length) return <p>No data</p>;

  const data = readings.map((r, i) => ({
    name: i + 1,
    value: r.pressure,
  }));

  const getBarColor = (value) => {
    if (value < 30) return "var(--green)";
    if (value <= 40) return "var(--yellow)";
    if (value <= 50) return "#f97316";
    return "var(--red)";
  };

  return (
    <div className="telemetry-chart">
      <h3 className="telemetry-section-title">
        Pressure History
      </h3>

      <BarChart width={500} height={260} data={data}>
        <CartesianGrid stroke="var(--border)" />
        <XAxis stroke="var(--textdim)" />
        <YAxis stroke="var(--textdim)" />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell key={index} fill={getBarColor(entry.value)} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
