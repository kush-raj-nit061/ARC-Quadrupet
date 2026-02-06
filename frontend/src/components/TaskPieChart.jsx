// import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

// const data = [
//   { name: "Completed", value: 65 },
//   { name: "Running", value: 25 },
//   { name: "Pending", value: 10 }
// ];

// export default function TaskPieChart() {
//   return (
//     <div>
//       <h3>Task Status</h3>
//       <PieChart width={300} height={250}>
//         <Pie data={data} dataKey="value" outerRadius={80} label>
//           {data.map((_, i) => <Cell key={i} />)}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// }


import { PieChart, Pie, Tooltip } from "recharts";

const data = [
  { name: "Completed", value: 65 },
  { name: "Running", value: 25 },
  { name: "Pending", value: 10 }
];

export default function TaskPieChart() {
  return (
    <div style={{ background: "var(--bg-card)", padding: 16, borderRadius: 12 }}>
      <h3>Task Status</h3>
      <PieChart width={280} height={220}>
        <Pie data={data} dataKey="value" outerRadius={80} fill="#00b4ff" label />
        <Tooltip />
      </PieChart>
    </div>
  );
}
