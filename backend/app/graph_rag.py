from typing import List, Protocol

from app.db import GraphNode
from app.llm import generate_with_groq


class GraphDB(Protocol):
    def search(self, question: str, mode: str, limit: int = 5) -> List[GraphNode]:
        ...


def _format_context(nodes: List[GraphNode]) -> str:
    if not nodes:
        return ""
    return " ".join(node.text for node in nodes)


def generate_answer(question: str, mode: str, graph_db: GraphDB) -> str:
    nodes = graph_db.search(question=question, mode=mode)
    context = _format_context(nodes)

    llm_answer = generate_with_groq(question=question, mode=mode, context=context)
    if llm_answer:
        return llm_answer

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
