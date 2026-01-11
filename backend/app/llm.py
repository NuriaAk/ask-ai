import os
from typing import Optional

import httpx


def _build_messages(mode: str, context: str, question: str) -> list[dict[str, str]]:
    if mode == "technical":
        system = (
            "You are a precise technical assistant. Use the provided context to answer. "
            "If context is insufficient, say what is missing."
        )
    else:
        system = (
            "You are a friendly assistant for non-technical users. Use the context to answer "
            "clearly and simply. If context is insufficient, say what is missing."
        )

    user = (
        "Context:\n"
        f"{context}\n\n"
        "Question:\n"
        f"{question}\n"
    )

    return [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]


def generate_with_groq(
    question: str,
    mode: str,
    context: str,
    timeout_s: float = 20.0,
) -> Optional[str]:
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return None

    model = os.getenv("GROQ_MODEL", "llama-3.1-8b-instruct")
    url = "https://api.groq.com/openai/v1/chat/completions"
    payload = {
        "model": model,
        "messages": _build_messages(mode=mode, context=context, question=question),
        "temperature": 0.2,
        "max_tokens": 512,
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    with httpx.Client(timeout=timeout_s) as client:
        response = client.post(url, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()

    choices = data.get("choices", [])
    if not choices:
        return None
    message = choices[0].get("message", {})
    content = message.get("content")
    if isinstance(content, str) and content.strip():
        return content.strip()
    return None
