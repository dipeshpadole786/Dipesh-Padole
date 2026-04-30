"""
main.py - DipeshBot entrypoint
=============================

Default (recommended for Frontend integration):
  python main.py --server --warmup

Interactive CLI (optional):
  python main.py --cli

Single question (debug):
  python main.py -q "What are Dipesh's skills?"
"""

from __future__ import annotations

import argparse
import logging
import os
import sys

os.makedirs("logs", exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.FileHandler("logs/rag_pipeline.log", mode="a", encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
logger = logging.getLogger(__name__)

try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    logger.warning("python-dotenv not installed; skipping .env loading.")

from pipeline import initialise_pipeline
from rag_chain import query_rag

BANNER = """
============================================================
        DIPESHBOT - Portfolio AI Assistant
  Type 'quit' or 'exit' to stop.
============================================================
"""

EXAMPLE_QUESTIONS = [
    "What are Dipesh's main skills?",
    "Tell me about Dipesh's projects",
    "What is Dipesh's educational background?",
    "What experience does Dipesh have?",
    "What are Dipesh's achievements?",
    "How can I contact Dipesh?",
]


def run_interactive(chain) -> None:
    print(BANNER)
    print("Example questions you can try:")
    for i, q in enumerate(EXAMPLE_QUESTIONS, 1):
        print(f"  {i}. {q}")
    print()

    while True:
        try:
            question = input("Your question: ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n\nThanks for chatting with DipeshBot!")
            break

        if not question:
            print("  Please type a question.\n")
            continue

        if question.lower() in ("quit", "exit", "q"):
            print("\nThanks for chatting with DipeshBot!")
            break

        result = query_rag(question, chain)
        print("-" * 60)
        print(f"Answer:\n{result['answer']}")
        print("-" * 60)
        print()


def main() -> None:
    parser = argparse.ArgumentParser(description="DipeshBot (Portfolio AI Assistant)")
    parser.add_argument("--cli", action="store_true", help="Run interactive CLI chatbot.")
    parser.add_argument("--server", action="store_true", help="Run HTTP API server (default).")
    parser.add_argument("--host", type=str, default=os.getenv("DIPESHBOT_HOST", "127.0.0.1"))
    parser.add_argument("--port", type=int, default=int(os.getenv("DIPESHBOT_PORT", "8002")))
    parser.add_argument("--warmup", action="store_true", help="Warm up pipeline at server startup.")
    parser.add_argument("--rebuild", action="store_true", help="Rebuild vector store (server/cli).")
    parser.add_argument("--data-dir", type=str, default=os.getenv("DIPESHBOT_DATA_DIR", "data"))
    parser.add_argument(
        "--question",
        "-q",
        type=str,
        help="Ask a single question and exit.",
    )

    args = parser.parse_args()

    logger.info("Initializing DipeshBot pipeline...")
    chain = initialise_pipeline(data_dir=args.data_dir, rebuild=args.rebuild)

    if args.question:
        result = query_rag(args.question, chain)
        print(f"\nQuestion: {args.question}\n")
        print(f"Answer:\n{result['answer']}\n")
        if result.get("sources"):
            print(f"Sources: {len(result['sources'])} document(s) consulted")
        return

    if args.server or not args.cli:
        logger.info(f"Starting HTTP API server on {args.host}:{args.port}")
        try:
            import uvicorn
            uvicorn.run(
                "api_server:app",
                host=args.host,
                port=args.port,
                log_level="info",
                reload=False,
            )
        except KeyboardInterrupt:
            logger.info("Server stopped by user.")
        except Exception as e:
            logger.error(f"Failed to start server: {e}")
            sys.exit(1)
    elif args.cli:
        run_interactive(chain)


if __name__ == "__main__":
    main()
