export default function TelemetryPanel({ title, children }) {
  return (
    <div className="telemetry-panel">
      <div className="telemetry-title">{title}</div>
      {children}
    </div>
  );
}
