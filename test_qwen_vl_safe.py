import torch
from transformers import Qwen2_5_VLForConditionalGeneration, AutoProcessor
from PIL import Image

# ----------------------------
# 1. Model & Processor
# ----------------------------
MODEL_ID = "Qwen/Qwen2.5-VL-7B-Instruct"

print("Loading model and processor...")

processor = AutoProcessor.from_pretrained(
    MODEL_ID,
    trust_remote_code=True
)

model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
    MODEL_ID,
    device_map="auto",          # uses GPU + CPU offload if needed
    torch_dtype=torch.float16,
    trust_remote_code=True
)

model.eval()

# ----------------------------
# 2. Load image
# ----------------------------
IMAGE_PATH = "image.png"   # <-- your image here

image = Image.open(IMAGE_PATH).convert("RGB")

# ----------------------------
# 3. Qwen REQUIRED message format
# ----------------------------
messages = [
    {
        "role": "user",
        "content": [
            {"type": "image"},
            {
                "type": "text",
                "text": (
                    "Analyze this dashboard image. "
                    "Extract visible readings of gauge and return ONLY valid JSON.\n\n"
                    
                )
            }
        ]
    }
]

# ----------------------------
# 4. Apply chat template (CRITICAL)
# ----------------------------
text = processor.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True
)

# ----------------------------
# 5. Prepare inputs
# ----------------------------
inputs = processor(
    text=text,
    images=image,
    return_tensors="pt"
).to(model.device)

# ----------------------------
# 6. Generate output
# ----------------------------
with torch.no_grad():
    output = model.generate(
        **inputs,
        max_new_tokens=512,
        do_sample=False
    )

# ----------------------------
# 7. Decode result
# ----------------------------
result = processor.batch_decode(
    output,
    skip_special_tokens=True
)[0]

print("\n===== MODEL OUTPUT =====\n")
print(result)
