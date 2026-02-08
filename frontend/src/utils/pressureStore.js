const KEY = "pressure_data";

export function getPressureData() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : { readings: [] };
}

export function addPressureReading(value) {
  const data = getPressureData();

  const entry = {
    pressure: value,
    timestamp: new Date().toISOString(),
    status: value > 90 ? "EMERGENCY" : "NORMAL"
  };

  data.readings.push(entry);

  // keep last 10 readings
  data.readings = data.readings.slice(-10);

  localStorage.setItem(KEY, JSON.stringify(data));
  return data;
}
