# DipeshBot README

## 🤖 DipeshBot - Portfolio AI Assistant

DipeshBot is an AI-powered chatbot that answers questions about Dipesh Padole's portfolio, skills, projects, and achievements using Retrieval-Augmented Generation (RAG).

## Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set Up Environment
```bash
cp .env.example .env
```

Edit `.env` and add your Groq API key:
```
GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key from [Groq Console](https://console.groq.com)

### 3. Run the Server (Recommended)

For frontend integration:
```bash
python main.py --server --warmup
```

This starts an HTTP API server on `http://localhost:8002`

### 4. API Usage

**Health Check:**
```bash
curl http://localhost:8002/health
```

**Ask a Question:**
```bash
curl -X POST http://localhost:8002/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What are Dipesh skills?"}'
```

**Response:**
```json
{
  "answer": "...",
  "sources": [
    {
      "source": "about_me.txt",
      "snippet": "..."
    }
  ]
}
```

## CLI Usage (Optional)

**Interactive mode:**
```bash
python main.py --cli
```

**Single question:**
```bash
python main.py -q "Tell me about Dipesh's projects"
```

## Architecture

- **Loader** (`loader.py`): Loads documents from `data/` folder
- **Splitter** (`splitter.py`): Chunks documents for efficient retrieval
- **Embeddings** (`embeddings.py`): Converts text to vectors (HF or offline fallback)
- **VectorStore** (`vectorstore.py`): Stores and retrieves chunks (FAISS or local JSON)
- **RAG Chain** (`rag_chain.py`): Retrieves relevant chunks + generates response via Groq LLM
- **Pipeline** (`pipeline.py`): Orchestrates the entire flow
- **API Server** (`api_server.py`): FastAPI HTTP server

## Features

✅ RAG-based Q&A system  
✅ Multiple embedding backends (HuggingFace + offline fallback)  
✅ Vector store with FAISS or local JSON storage  
✅ Groq LLM integration (fast and free)  
✅ CORS-enabled API for frontend integration  
✅ Logging and monitoring  
✅ Hot-reload support

## Troubleshooting

**"GROQ_API_KEY not set"**
- Add your API key to `.env`
- Or export: `export GROQ_API_KEY=your_key`

**"No documents found"**
- Ensure `.txt`, `.pdf`, or `.csv` files are in `data/` folder
- Run: `python main.py --rebuild`

**Model decommissioned error**
- Set `GROQ_MODEL=llama-3.1-70b-versatile` in `.env`
- Models available: `llama-3.1-8b-instant`, `llama-3.1-70b-versatile`, `mixtral-8x7b-32768`

## Files

```
DipeshBot/
├── data/
│   └── about_me.txt          # Knowledge base content
├── vector_store/             # Cached embeddings
├── logs/                      # Log files
├── main.py                    # Entry point
├── api_server.py              # FastAPI server
├── pipeline.py                # Pipeline orchestration
├── rag_chain.py               # RAG chain implementation
├── loader.py                  # Document loader
├── splitter.py                # Text splitter
├── embeddings.py              # Embedding models
├── vectorstore.py             # Vector store
├── requirements.txt           # Python dependencies
├── .env.example               # Environment template
└── README.md                  # This file
```

## Performance Notes

- First run: ~5-10s (embedding documents)
- Subsequent runs: <1s (using cached embeddings)
- API response time: ~2-3s (Groq inference)

## License

This project is part of Dipesh Padole's portfolio.
