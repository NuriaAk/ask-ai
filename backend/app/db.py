import os
from dataclasses import dataclass
from typing import Iterable, List

from neo4j import GraphDatabase


@dataclass
class GraphNode:
    node_id: str
    label: str
    text: str


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


_neo4j_db: Neo4jGraphDB | None = None


def _get_text_properties() -> List[str]:
    props = os.getenv("NEO4J_TEXT_PROPERTIES")
    if props:
        return [prop.strip() for prop in props.split(",") if prop.strip()]
    return ["text", "description"]


def get_graph_db() -> Neo4jGraphDB:
    uri = os.getenv("NEO4J_URI")
    username = os.getenv("NEO4J_USERNAME")
    password = os.getenv("NEO4J_PASSWORD")
    database = os.getenv("NEO4J_DATABASE", "neo4j")

    if not (uri and username and password):
        missing = [name for name, value in {
            "NEO4J_URI": uri,
            "NEO4J_USERNAME": username,
            "NEO4J_PASSWORD": password,
        }.items() if not value]
        missing_list = ", ".join(missing) if missing else "unknown"
        raise RuntimeError(f"Missing required Neo4j environment variables: {missing_list}")

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
