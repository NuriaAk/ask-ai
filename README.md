# Ask AI

Full-stack app for GraphRAG chat using Neo4j Aura and Groq Llama 3.1 8B.

## Prerequisites

- Python 3.12+
- Node.js 18+
- A Neo4j Aura instance
- A Groq API key

## Backend setup

```bash
source .venv/bin/activate
pip install -r backend/requirements.txt
```

Create `backend/.env` (not committed) with:

```
NEO4J_URI=neo4j+s://<instance-id>.databases.neo4j.io
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your-password
NEO4J_DATABASE=neo4j
NEO4J_TEXT_PROPERTIES=text,description
NEO4J_FULLTEXT_INDEX=keyword,entities
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=llama-3.1-8b-instant
GROQ_API_BASE=https://api.groq.com/openai/v1
```

Start the backend:

```bash
PYTHONPATH=backend python -m uvicorn app.main:app --host 0.0.0.0 --port 3000
```

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Optional `frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:3000
```

## Run both together

From repo root:

```bash
source .venv/bin/activate
npm install
npm run dev
```

## Notes

- The backend loads `backend/.env` on startup.
- Ensure `GROQ_MODEL` matches a model available in your Groq account.
