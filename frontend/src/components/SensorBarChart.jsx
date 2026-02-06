import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "Temp", value: 32 },
  { name: "Speed", value: 0.9 },
  { name: "Distance", value: 1.3 }
];

export default function SensorBarChart() {
  return (
    <div>
      <h3>Sensor Values</h3>
      <BarChart width={350} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
}
