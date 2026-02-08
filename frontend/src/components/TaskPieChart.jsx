import { PieChart, Pie, Tooltip } from "recharts";

export default function TaskPieChart({ latest }) {
  if (!latest) return <p>No data</p>;

  const data = [
    { name: "Pressure", value: latest.pressure },
    { name: "Remaining", value: 120 - latest.pressure },
  ];

  return (
    <div style={{ background: "var(--bg-card)", padding: 16, borderRadius: 12 }}>
      <h3>Latest Pressure</h3>
      <PieChart width={280} height={220}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={80}
          fill="#00b4ff"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
}
