from typing import List

from app.db import MockNeo4jAura


def _format_context(nodes: List[object]) -> str:
    if not nodes:
        return ""
    return " ".join(node.text for node in nodes)


def generate_answer(question: str, mode: str, graph_db: MockNeo4jAura) -> str:
    nodes = graph_db.search(question=question, mode=mode)
    context = _format_context(nodes)

    if mode == "technical":
        return (
            "GraphRAG response (technical): "
            f"{context} "
            "If you want, I can expand with architecture patterns or code examples."
        )

    return (
        "GraphRAG response (simple): "
        f"{context} "
        "Ask another question and I will keep it friendly and clear."
    )
