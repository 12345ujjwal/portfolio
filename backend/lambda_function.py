import json
import os

import boto3

bedrock = boto3.client("bedrock-runtime")
MODEL_ID = os.environ["MODEL_ID"]
with open(os.path.join(os.path.dirname(__file__), "knowledge.txt"), encoding="utf-8") as f:
    SYSTEM = f.read()


def respond(code, body):
    return {"statusCode": code, "headers": {"Content-Type": "application/json"}, "body": json.dumps(body)}


def lambda_handler(event, context):
    try:
        data = json.loads(event.get("body") or "{}")
    except ValueError:
        return respond(400, {"error": "Invalid JSON"})

    raw = data.get("messages")
    if not isinstance(raw, list):
        return respond(400, {"error": "messages must be a list"})

    messages = []
    for m in raw[-6:]:  # keep only the last few turns
        role = m.get("role") if isinstance(m, dict) else None
        text = str(m.get("text", ""))[:400].strip() if isinstance(m, dict) else ""
        if role in ("user", "assistant") and text:
            messages.append({"role": role, "content": [{"text": text}]})
    while messages and messages[0]["role"] != "user":
        messages.pop(0)
    if not messages or messages[-1]["role"] != "user":
        return respond(400, {"error": "Last message must be from the user"})

    try:
        r = bedrock.converse(
            modelId=MODEL_ID,
            system=[{"text": SYSTEM}],
            messages=messages,
            inferenceConfig={"maxTokens": 300, "temperature": 0.3},
        )
        text = r["output"]["message"]["content"][0]["text"]
    except Exception as e:
        print("bedrock error:", repr(e))
        return respond(502, {"error": "The assistant is unavailable right now."})
    return respond(200, {"reply": text})
