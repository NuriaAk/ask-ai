import os
import sys
from pathlib import Path

from fastapi.testclient import TestClient
import pytest

sys.path.append(str(Path(__file__).resolve().parents[1]))

from app.main import app  # noqa: E402


client = TestClient(app)

if not all(
    [
        os.environ.get("NEO4J_URI"),
        os.environ.get("NEO4J_USERNAME"),
        os.environ.get("NEO4J_PASSWORD"),
    ]
):
    pytest.skip(
        "Neo4j environment not configured for integration tests.",
        allow_module_level=True,
    )


def test_send_message_technical() -> None:
    payload = {"question": "How do agents coordinate tasks?", "mode": "technical"}
    response = client.post("/chat/messages", json=payload)

    assert response.status_code == 200
    body = response.json()
    assert body["role"] == "assistant"
    assert body["content"].startswith("GraphRAG response (technical):")
    assert "coordination patterns" in body["content"]
    assert "timestamp" in body
    assert "id" in body


def test_send_message_non_technical() -> None:
    payload = {"question": "What is an AI agent?", "mode": "non-technical"}
    response = client.post("/chat/messages", json=payload)

    assert response.status_code == 200
    body = response.json()
    assert body["role"] == "assistant"
    assert body["content"].startswith("GraphRAG response (simple):")
    assert "AI agents" in body["content"]


def test_send_message_empty_question() -> None:
    payload = {"question": "   ", "mode": "technical"}
    response = client.post("/chat/messages", json=payload)

    assert response.status_code == 400
    body = response.json()
    assert body["error"] == "bad_request"
    assert "Question must not be empty" in body["message"]
