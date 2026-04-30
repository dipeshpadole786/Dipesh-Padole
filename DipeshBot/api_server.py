"""
api_server.py - DipeshBot API Server
====================================
FastAPI wrapper around the RAG pipeline for frontend integration.

Run:
  python api_server.py --port 8002

Env:
  GROQ_API_KEY=...
  GROQ_MODEL=llama-3.1-8b-instant (optional)
"""

from __future__ import annotations

import argparse
import logging
import os
import threading
from typing import Any

try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from pipeline import initialise_pipeline
from rag_chain import query_rag

logger = logging.getLogger("dipeshbot.api")
os.environ.setdefault("DIPESHBOT_NO_PROMPT", "1")

app = FastAPI(title="DipeshBot API", version="1.0.0", description="Portfolio AI Assistant for Dipesh Padole")
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("DIPESHBOT_CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_chain_lock = threading.Lock()
_chain: Any | None = None
_chain_data_dir: str | None = None


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=2000)
    rebuild: bool = False
    data_dir: str = "data"


class SourceOut(BaseModel):
    source: str
    snippet: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceOut] = []


def _get_chain(*, data_dir: str, rebuild: bool) -> Any:
    global _chain, _chain_data_dir
    with _chain_lock:
        if rebuild or _chain is None or _chain_data_dir != data_dir:
            logger.info("Initialising pipeline (data_dir=%s, rebuild=%s)", data_dir, rebuild)
            _chain = initialise_pipeline(data_dir=data_dir, rebuild=rebuild)
            _chain_data_dir = data_dir
    return _chain


@app.on_event("startup")
def _startup() -> None:
    warmup = (os.getenv("DIPESHBOT_WARMUP") or "").strip().lower() in ("1", "true", "yes", "y")
    rebuild = (os.getenv("DIPESHBOT_REBUILD") or "").strip().lower() in ("1", "true", "yes", "y")
    data_dir = (os.getenv("DIPESHBOT_DATA_DIR") or "data").strip() or "data"
    if not warmup:
        return
    try:
        _get_chain(data_dir=data_dir, rebuild=rebuild)
    except Exception:
        logger.exception("Startup warmup failed.")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "DipeshBot"}


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    question = (req.question or "").strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    chain = _get_chain(data_dir=req.data_dir, rebuild=req.rebuild)
    result = query_rag(question, chain)

    sources = []
    if result.get("sources"):
        for source_doc in result["sources"]:
            content = source_doc.page_content if hasattr(source_doc, "page_content") else str(source_doc)
            snippet = content[:150] + "..." if len(content) > 150 else content
            sources.append(SourceOut(source=source_doc.metadata.get("source", "unknown") if hasattr(source_doc, "metadata") else "unknown", snippet=snippet))

    return ChatResponse(answer=result["answer"], sources=sources)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "service": "DipeshBot API",
        "version": "1.0.0",
        "description": "Portfolio AI Assistant for Dipesh Padole",
        "endpoints": {
            "/health": "Health check",
            "/chat": "POST - Ask a question about Dipesh's portfolio",
        },
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="DipeshBot API Server")
    parser.add_argument("--host", type=str, default=os.getenv("DIPESHBOT_HOST", "127.0.0.1"))
    parser.add_argument("--port", type=int, default=int(os.getenv("DIPESHBOT_PORT", "8002")))
    parser.add_argument("--reload", action="store_true", help="Enable auto-reload on code changes.")
    args = parser.parse_args()

    import uvicorn

    logger.info(f"Starting DipeshBot API on {args.host}:{args.port}")
    uvicorn.run(
        "api_server:app",
        host=args.host,
        port=args.port,
        reload=args.reload,
        log_level="info",
    )
