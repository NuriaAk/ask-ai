from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class GraphNode:
    node_id: str
    label: str
    text: str


@dataclass
class GraphEdge:
    source: str
    target: str
    relation: str


@dataclass
class MockNeo4jAura:
    instance_name: str = "Instance01"
    nodes: Dict[str, GraphNode] = field(default_factory=dict)
    edges: List[GraphEdge] = field(default_factory=list)

    def search(self, question: str, mode: str) -> List[GraphNode]:
        lowered = question.lower()
        hits = []

        keyword_map = {
            "coordinate": ["coordination", "multi_agent"],
            "together": ["coordination", "multi_agent"],
            "multi": ["coordination", "multi_agent"],
            "tool": ["tool_use"],
            "memory": ["memory"],
            "plan": ["planning"],
            "agent": ["agents_overview"],
        }

        labels = set()
        for key, mapped in keyword_map.items():
            if key in lowered:
                labels.update(mapped)

        if not labels:
            labels.add("agents_overview")

        for node in self.nodes.values():
            if node.label in labels:
                hits.append(node)

        return hits


_mock_db: MockNeo4jAura | None = None


def _build_mock_graph() -> MockNeo4jAura:
    db = MockNeo4jAura()

    db.nodes = {
        "n1": GraphNode(
            node_id="n1",
            label="agents_overview",
            text=(
                "AI agents perceive inputs, reason about goals, and take actions "
                "through tools or workflows. They combine a reasoning engine, memory, "
                "and tool access to complete tasks."
            ),
        ),
        "n2": GraphNode(
            node_id="n2",
            label="coordination",
            text=(
                "Multi-agent coordination patterns include hierarchical managers, "
                "peer-to-peer messaging, and shared blackboards for collaboration."
            ),
        ),
        "n3": GraphNode(
            node_id="n3",
            label="tool_use",
            text=(
                "Tool use lets agents call APIs, execute code, or query databases to "
                "ground responses in external systems."
            ),
        ),
        "n4": GraphNode(
            node_id="n4",
            label="memory",
            text=(
                "Agent memory spans short-term context windows and long-term vector "
                "stores that retain historical interactions."
            ),
        ),
        "n5": GraphNode(
            node_id="n5",
            label="planning",
            text=(
                "Planning decomposes goals into steps, enabling agents to sequence "
                "actions and verify progress."
            ),
        ),
        "n6": GraphNode(
            node_id="n6",
            label="multi_agent",
            text=(
                "GraphRAG can link multiple agents by retrieving related nodes and "
                "edges from a knowledge graph before composing an answer."
            ),
        ),
    }

    db.edges = [
        GraphEdge(source="n1", target="n2", relation="enables"),
        GraphEdge(source="n1", target="n3", relation="uses"),
        GraphEdge(source="n1", target="n4", relation="retains"),
        GraphEdge(source="n1", target="n5", relation="plans"),
        GraphEdge(source="n2", target="n6", relation="retrieves"),
    ]

    return db


def get_graph_db() -> MockNeo4jAura:
    global _mock_db
    if _mock_db is None:
        _mock_db = _build_mock_graph()
    return _mock_db
