// import { useState } from "react";
// import StatusCards from "../components/StatusCards";
// import TaskPieChart from "../components/TaskPieChart";
// import SensorBarChart from "../components/SensorBarChart";
// import PressureGauge from "../components/PressureGauge";
// import AlertDialog from "../components/AlertDialog";

// export default function Dashboard() {
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertMsg, setAlertMsg] = useState("");

//   const triggerAlert = (msg) => {
//     setAlertMsg(msg);
//     setAlertOpen(true);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Robotics Control Dashboard</h1>

//       <StatusCards />

//       <div style={{
//         display: "flex",
//         gap: "30px",
//         marginTop: "30px",
//         flexWrap: "wrap"
//       }}>
//         <TaskPieChart />
//         <SensorBarChart />
//         <PressureGauge onAlert={triggerAlert} />
//       </div>

//       <AlertDialog
//         open={alertOpen}
//         message={alertMsg}
//         onClose={() => setAlertOpen(false)}
//       />
//     </div>
//   );
// }

import { useState } from "react";
import StatusCards from "../components/StatusCards";
import TaskPieChart from "../components/TaskPieChart";
import SensorBarChart from "../components/SensorBarChart";
import PressureGauge from "../components/PressureGauge";
import AlertDialog from "../components/AlertDialog";

export default function Dashboard() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ color: "#00b4ff" }}>⚙ Robotics Control Dashboard</h1>

      <StatusCards />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "24px",
        marginTop: "30px"
      }}>
        <TaskPieChart />
        <SensorBarChart />
        <PressureGauge onAlert={(msg) => {
          setAlertMsg(msg);
          setAlertOpen(true);
        }} />
      </div>

      <AlertDialog
        open={alertOpen}
        message={alertMsg}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
}
