"""
loader.py — Document Loader for DipeshBot RAG Pipeline
======================================================
Loads documents from disk and converts them into LangChain Document objects.
Supports: .txt, .pdf, .csv files
"""

import os
import logging
from pathlib import Path
from typing import List

from langchain_core.documents import Document
from langchain_community.document_loaders import (
    TextLoader,
    PyPDFLoader,
    CSVLoader,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.FileHandler("logs/rag_pipeline.log"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger(__name__)


def load_documents(data_dir: str = "data") -> List[Document]:
    """
    Load all supported documents from the given directory.
    """
    data_path = Path(data_dir)

    if not data_path.exists():
        raise FileNotFoundError(
            f"Data directory '{data_dir}' not found. "
            "Please create it and add your knowledge base documents."
        )

    documents: List[Document] = []

    txt_files = list(data_path.glob("*.txt"))
    for txt_file in txt_files:
        try:
            logger.info(f"Loading text file: {txt_file.name}")
            loader = TextLoader(str(txt_file), encoding="utf-8")
            docs = loader.load()
            documents.extend(docs)
            logger.info(f"  [OK] Loaded {len(docs)} document(s) from {txt_file.name}")
        except Exception as e:
            logger.warning(f"  [ERR] Failed to load {txt_file.name}: {e}")

    pdf_files = list(data_path.glob("*.pdf"))
    for pdf_file in pdf_files:
        try:
            logger.info(f"Loading PDF file: {pdf_file.name}")
            loader = PyPDFLoader(str(pdf_file))
            docs = loader.load()
            documents.extend(docs)
            logger.info(f"  [OK] Loaded {len(docs)} page(s) from {pdf_file.name}")
        except Exception as e:
            logger.warning(f"  [ERR] Failed to load {pdf_file.name}: {e}")

    csv_files = list(data_path.glob("*.csv"))
    for csv_file in csv_files:
        try:
            logger.info(f"Loading CSV file: {csv_file.name}")
            loader = CSVLoader(str(csv_file))
            docs = loader.load()
            documents.extend(docs)
            logger.info(f"  [OK] Loaded {len(docs)} row(s) from {csv_file.name}")
        except Exception as e:
            logger.warning(f"  [ERR] Failed to load {csv_file.name}: {e}")

    if not documents:
        logger.warning(
            f"No documents found in '{data_dir}'. "
            "Make sure you have .txt, .pdf, or .csv files in that folder."
        )
    else:
        logger.info(f"Total documents loaded: {len(documents)}")

    return documents
