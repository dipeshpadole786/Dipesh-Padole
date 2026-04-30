"""
splitter.py — Text Splitter for DipeshBot RAG Pipeline
======================================================
Breaks large documents into smaller, overlapping chunks.
"""

import logging
from typing import List

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

logger = logging.getLogger(__name__)

CHUNK_SIZE = 500
CHUNK_OVERLAP = 100
SEPARATORS = [
    "\n\n",
    "\n",
    ". ",
    " ",
    "",
]


def split_documents(
    documents: List[Document],
    chunk_size: int = CHUNK_SIZE,
    chunk_overlap: int = CHUNK_OVERLAP,
) -> List[Document]:
    """
    Split a list of LangChain Documents into smaller overlapping chunks.
    """
    if not documents:
        logger.warning("split_documents received an empty document list.")
        return []

    logger.info(
        f"Splitting {len(documents)} document(s) -> "
        f"chunk_size={chunk_size}, overlap={chunk_overlap}"
    )

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=SEPARATORS,
        length_function=len,
        add_start_index=True,
    )

    chunks: List[Document] = splitter.split_documents(documents)
    chunks = [c for c in chunks if c.page_content.strip()]

    logger.info(f"  [OK] Produced {len(chunks)} chunk(s) after splitting.")

    if chunks:
        sample = chunks[0].page_content[:200].replace("\n", " ")
        logger.debug(f"  Sample chunk[0]: '{sample}...'")

    return chunks


def get_chunk_stats(chunks: List[Document]) -> dict:
    """Return basic statistics about the chunk lengths."""
    if not chunks:
        return {"count": 0, "min": 0, "max": 0, "avg": 0}

    lengths = [len(c.page_content) for c in chunks]
    stats = {
        "count": len(chunks),
        "min_chars": min(lengths),
        "max_chars": max(lengths),
        "avg_chars": sum(lengths) / len(lengths),
    }
    return stats
