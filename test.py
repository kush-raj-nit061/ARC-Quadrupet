import base64
import json
import re
import requests
from pathlib import Path
from datetime import datetime

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "gemma3:12b"

# 🔹 Path to dashboard JSON
DATA_FILE = Path(
    "/home/arc02/ARC-Quadrupet/frontend/public/pressure_data.json"
)

def encode_image(image_path: str) -> str:
    return base64.b64encode(Path(image_path).read_bytes()).decode("utf-8")

def extract_json(text: str) -> dict:
    match = re.search(r"\{[\s\S]*\}", text)
    if not match:
        raise ValueError(f"No JSON found in model output:\n{text}")
    return json.loads(match.group())

def load_existing_data() -> dict:
    if DATA_FILE.exists():
        return json.loads(DATA_FILE.read_text())
    return {"readings": []}

def save_pressure_reading(pressure: int):
    data = load_existing_data()

    entry = {
        "pressure": pressure,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "source": "gemma3-vision"
    }

    data["readings"].append(entry)

    # 🔹 Keep only last 50 readings (optional)
    data["readings"] = data["readings"][-50:]

    DATA_FILE.write_text(json.dumps(data, indent=2))
    print(f"✔ Saved pressure {pressure} PSI")

def read_gauge(image_path: str) -> dict:
    image_b64 = encode_image(image_path)

    prompt = """
You are a vision-based analog gauge reader.

The image shows a SEMI-CIRCULAR pressure gauge.

Follow these rules STRICTLY:
1. The gauge is half-circle (180 degrees).
2. The leftmost end is MIN = 0.
3. The rightmost end is MAX = 100.
4. The needle pivots from the center.
5. Estimate the needle angle relative to the left end.
6. Interpolate linearly between 0 and 100.
7. Do NOT guess. If needle is unclear, choose the closest visible tick.
8. Ignore text, reflections, shadows, and colors.
9. Output ONLY valid JSON. No explanation. No extra text.

Output format:
{
  "readings": [
    { "pressure": <integer from 0 to 100> }
  ]
}

"""

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": prompt,
                "images": [image_b64]
            }
        ],
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload, timeout=120)
    response.raise_for_status()

    content = response.json()["message"]["content"]
    print("Model output:\n", content)

    return extract_json(content)

if __name__ == "__main__":
    image_path = "image.png"

    result = read_gauge(image_path)

    # 🔹 Extract pressure safely
    pressure = result["readings"][0]["pressure"]

    save_pressure_reading(pressure)
