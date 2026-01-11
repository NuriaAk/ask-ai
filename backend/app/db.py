import os
from dataclasses import dataclass, field
from typing import Dict, Iterable, List

from neo4j import GraphDatabase


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

    def search(self, question: str, mode: str, limit: int = 10) -> List[GraphNode]:
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
                if len(hits) >= limit:
                    break

        return hits


class Neo4jGraphDB:
    def __init__(
        self,
        uri: str,
        username: str,
        password: str,
        database: str,
        text_properties: Iterable[str],
        fulltext_index: str | None = None,
        instance_name: str | None = None,
    ) -> None:
        self.driver = GraphDatabase.driver(uri, auth=(username, password))
        self.database = database
        self.text_properties = [prop for prop in text_properties if prop]
        self.fulltext_index = fulltext_index
        self.instance_name = instance_name or "Instance01"

    def _extract_text(self, node: object) -> str | None:
        for prop in self.text_properties:
            value = node.get(prop)
            if isinstance(value, str) and value.strip():
                return value
        return None

    def search(self, question: str, mode: str, limit: int = 10) -> List[GraphNode]:
        query = question.strip()
        if not query:
            return []

        nodes: List[GraphNode] = []
        seen_ids: set[str] = set()

        with self.driver.session(database=self.database) as session:
            if self.fulltext_index:
                indexes = [idx.strip() for idx in self.fulltext_index.split(",") if idx.strip()]
                for index_name in indexes:
                    records = session.run(
                        """
                        CALL db.index.fulltext.queryNodes($index, $search_text)
                        YIELD node, score
                        RETURN node, score
                        ORDER BY score DESC
                        LIMIT $limit
                        """,
                        index=index_name,
                        search_text=query,
                        limit=limit,
                    )
                    for record in records:
                        node = record["node"]
                        text = self._extract_text(node)
                        if not text:
                            continue
                        node_id = str(node.id)
                        if node_id in seen_ids:
                            continue
                        label = next(iter(node.labels), "Node")
                        nodes.append(GraphNode(node_id=node_id, label=label, text=text))
                        seen_ids.add(node_id)
                        if len(nodes) >= limit:
                            break
                    if len(nodes) >= limit:
                        break
            else:
                for prop in self.text_properties:
                    records = session.run(
                        """
                        MATCH (n)
                        WHERE n[$prop] CONTAINS $search_text
                        RETURN n
                        LIMIT $limit
                        """,
                        prop=prop,
                        search_text=query,
                        limit=limit,
                    )
                    for record in records:
                        node = record["n"]
                        text = self._extract_text(node)
                        if not text:
                            continue
                        node_id = str(node.id)
                        if node_id in seen_ids:
                            continue
                        label = next(iter(node.labels), "Node")
                        nodes.append(GraphNode(node_id=node_id, label=label, text=text))
                        seen_ids.add(node_id)
                        if len(nodes) >= limit:
                            break
                    if len(nodes) >= limit:
                        break

        return nodes


_mock_db: MockNeo4jAura | None = None
_neo4j_db: Neo4jGraphDB | None = None


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


def _get_text_properties() -> List[str]:
    props = os.getenv("NEO4J_TEXT_PROPERTIES")
    if props:
        return [prop.strip() for prop in props.split(",") if prop.strip()]
    return ["text", "description"]


def get_graph_db() -> MockNeo4jAura | Neo4jGraphDB:
    use_mock = os.getenv("USE_MOCK_NEO4J", "").lower() in {"1", "true", "yes"}
    uri = os.getenv("NEO4J_URI")
    username = os.getenv("NEO4J_USERNAME")
    password = os.getenv("NEO4J_PASSWORD")
    database = os.getenv("NEO4J_DATABASE", "neo4j")

    if use_mock or not (uri and username and password):
        global _mock_db
        if _mock_db is None:
            _mock_db = _build_mock_graph()
        return _mock_db

    global _neo4j_db
    if _neo4j_db is None:
        _neo4j_db = Neo4jGraphDB(
            uri=uri,
            username=username,
            password=password,
            database=database,
            text_properties=_get_text_properties(),
            fulltext_index=os.getenv("NEO4J_FULLTEXT_INDEX", "keyword,entities"),
            instance_name=os.getenv("AURA_INSTANCENAME"),
        )
    return _neo4j_db
