# DipeshBot Integration Setup Guide

## Overview
DipeshBot is an AI-powered chatbot that answers questions about Dipesh's portfolio using RAG (Retrieval-Augmented Generation) with Groq LLM.

## Quick Start

### Backend Setup (DipeshBot)

1. **Navigate to DipeshBot folder:**
   ```bash
   cd DipeshBot
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   DIPESHBOT_PORT=8002
   DIPESHBOT_WARMUP=true
   ```

4. **Get Groq API Key:**
   - Go to [Groq Console](https://console.groq.com)
   - Sign up for free
   - Copy your API key to `.env`

5. **Start the API server:**
   ```bash
   python main.py --server --warmup
   ```
   
   The server will start on `http://localhost:8002`

### Frontend Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Verify API URL:**
   ```
   VITE_DIPESHBOT_API=http://localhost:8002
   ```
   For production, set it to your Render backend URL:
   ```
   VITE_DIPESHBOT_API=https://dipesh-padole.onrender.com
   ```

3. **Run the frontend:**
   ```bash
   bun dev
   ```

## How It Works

1. **User clicks "Chat with DipeshBot" button** on the Contact section
2. **Chat modal opens** with DipeshBot greeting
3. **User asks a question** about Dipesh's portfolio
4. **Frontend sends request** to `http://localhost:8002/chat`
5. **DipeshBot backend:**
   - Retrieves relevant chunks from `about_me.txt`
   - Sends to Groq LLM with context
   - Returns AI-generated response
6. **Response displayed** in chat UI

## Knowledge Base

The bot uses content from `DipeshBot/data/about_me.txt` which includes:
- About Dipesh
- Skills and tech stack
- Projects with descriptions
- Education and experience
- Achievements
- Contact information

To update the knowledge base:
1. Edit `DipeshBot/data/about_me.txt`
2. Restart the server with `--rebuild` flag:
   ```bash
   python main.py --server --rebuild
   ```

## API Endpoints

**Health Check:**
```bash
curl http://localhost:8002/health
```

**Chat:**
```bash
curl -X POST http://localhost:8002/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What are Dipesh skills?"}'
```

## Troubleshooting

### "Failed to connect to DipeshBot API"
- Ensure DipeshBot server is running on port 8002
- Check firewall/network access
- Verify `VITE_DIPESHBOT_API` in `.env.local`

### "GROQ_API_KEY not set"
- Add your API key to `DipeshBot/.env`
- Restart the server
- Get free key from [Groq Console](https://console.groq.com)

### No response from bot
- Check DipeshBot logs: `DipeshBot/logs/rag_pipeline.log`
- Verify `data/about_me.txt` exists
- Try rebuilding: `python main.py --server --rebuild`

### Port 8002 already in use
- Change port in `DipeshBot/.env`:
  ```
  DIPESHBOT_PORT=8003
  ```
- Update frontend `.env.local`:
  ```
   VITE_DIPESHBOT_API=http://localhost:8003
   ```

## Deploying on Render

### Deploy DipeshBot (Backend)

- Create a **Python Web Service**
- Root directory: `DipeshBot`
- Build: `pip install -r requirements.txt`
- Start: `uvicorn api_server:app --host 0.0.0.0 --port $PORT`
- Env vars: `GROQ_API_KEY`, `DIPESHBOT_CORS_ORIGINS`

### Deploy Frontend

This project uses TanStack Start, so deploy the frontend as a **Node Web Service** (not a Static Site).

- Root directory: *(blank)*
- Build: `npm install && npm run build`
- Start: `npm run start` (runs `node .output/server/index.mjs`)
- Env vars: `VITE_DIPESHBOT_API=https://dipesh-padole.onrender.com`

## Performance Notes

- **First startup:** ~5-10s (building embeddings)
- **Subsequent requests:** <1s (cached embeddings)
- **Chat response time:** ~2-3s (Groq API)

## Architecture

```
Frontend (React)
    ↓
DipeshBot Chat Component
    ↓
API Server (FastAPI) - Port 8002
    ↓
RAG Pipeline:
  1. Document Loader → Reads about_me.txt
  2. Text Splitter → Chunks content (500 chars)
  3. Embeddings → Converts to vectors
  4. Vector Store → FAISS/JSON storage
  5. RAG Chain → Retrieval + LLM response
    ↓
Groq LLM
    ↓
Response → Chat UI
```

## Files Structure

```
project/
├── DipeshBot/                    # Backend RAG system
│   ├── data/
│   │   └── about_me.txt         # Knowledge base
│   ├── vector_store/             # Cached embeddings
│   ├── api_server.py             # FastAPI server
│   ├── main.py                   # Entry point
│   ├── rag_chain.py              # RAG implementation
│   ├── pipeline.py               # Pipeline orchestration
│   ├── loader.py                 # Document loader
│   ├── splitter.py               # Text chunking
│   ├── embeddings.py             # Embedding models
│   ├── vectorstore.py            # Vector storage
│   ├── requirements.txt          # Dependencies
│   ├── .env.example              # Environment template
│   └── README.md                 # Detailed docs
│
├── src/
│   ├── components/portfolio/
│   │   ├── Contact.tsx           # Contact section (integrated)
│   │   ├── DipeshBotChat.tsx    # Chat modal component
│   │   └── ...
│   └── ...
│
└── .env.example                  # Frontend env template
```

## Next Steps

1. Start DipeshBot server: `cd DipeshBot && python main.py --server --warmup`
2. Start frontend: `bun dev`
3. Navigate to Contact section
4. Click "Chat with DipeshBot" button
5. Ask questions about Dipesh's portfolio!

## Support

For issues or questions:
- Check DipeshBot logs: `DipeshBot/logs/rag_pipeline.log`
- Review API responses in browser DevTools
- Verify all dependencies are installed
- Ensure Groq API key is valid

Enjoy! 🚀
