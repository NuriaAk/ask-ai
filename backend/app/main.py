import asyncio
from datetime import datetime, timezone
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.db import get_graph_db
from app.graph_rag import generate_answer
from app.models import ChatMessage, ChatRequest

app = FastAPI(title="Ask AI Backend API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(HTTPException)
async def http_exception_handler(
    request: Request,  # noqa: ARG001
    exc: HTTPException,
) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": "bad_request", "message": str(exc.detail)},
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(
    request: Request,  # noqa: ARG001
    exc: Exception,
) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={"error": "server_error", "message": "Unexpected server error."},
    )


@app.post("/chat/messages", response_model=ChatMessage)
async def send_chat_message(payload: ChatRequest) -> ChatMessage:
    if not payload.question.strip():
        raise HTTPException(status_code=400, detail="Question must not be empty.")

    # Small delay to make the loading state visible in UI tests.
    await asyncio.sleep(0.3)

    db = get_graph_db()
    answer = generate_answer(
        question=payload.question,
        mode=payload.mode,
        graph_db=db,
    )

    return ChatMessage(
        id=str(uuid4()),
        role="assistant",
        content=answer,
        timestamp=datetime.now(timezone.utc),
    )
