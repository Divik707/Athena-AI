🧠 Athena Backend — AI Search Engine

Athena Backend is the core engine that powers the AI assistant. It combines web search + LLM reasoning + structured output to deliver accurate answers.

🚀 Features
🔍 Real-time web search (Tavily)
🧠 LLM processing (OpenRouter)
📦 Structured XML responses
🛡️ Input validation (Zod)
⚡ Context optimization (token control)
🧼 Response fallback handling
🗄️ Database integration (Prisma)
💬 Conversation system (WIP)
🏗️ Architecture
User Query
   ↓
Tavily Search
   ↓
Context Formatting
   ↓
Prompt Injection
   ↓
LLM (OpenRouter)
   ↓
XML Response
   ↓
Client
📁 Project Structure
.
├── index.ts           # Express server
├── prompt.ts          # System + template prompts
├── db/                # Prisma client
├── prisma/            # Schema & migrations
└── README.md
⚙️ Tech Stack
Runtime: Node.js
Framework: Express
Validation: Zod
Search API: Tavily
LLM: OpenRouter
Database: PostgreSQL (Supabase)
ORM: Prisma
🔧 Setup
npm install
npx prisma generate
npx prisma migrate dev
npx ts-node index.ts
📡 API Routes
🧠 AI Query
POST /ask-Athena
Takes user query
Fetches web context
Sends to LLM
Returns XML response
🔄 Follow-up (WIP)
POST /ask-Athena/follow-on
Will support conversation continuity
Will include chat history
👤 Auth (Planned)
POST /signup
POST /signin
💬 Conversations (Planned)
GET /Athena/convresations
POST /Athena/conversation/:id
🧠 Core Logic
Context Optimization
function formatContext(results) {
  return results.slice(0, 5).map((r) => ({
    title: r.title,
    content: r.content?.slice(0, 500),
    url: r.url,
  }));
}
Prompt Strategy
Inject real-time context
Force XML structure
Prevent hallucination
⚠️ Limitations
No streaming
No reranking
No caching
No vector search
🔮 Future Improvements
🧾 Source citations
⚡ Streaming responses
🧠 Memory (chat history)
🔍 Semantic search (vector DB)
💳 Credit system
🛡️ Prompt injection protection
💥 Current Status

v1 — functional AI backend (search + LLM)

🎯 Goal

Build a Perplexity-like AI engine with full control and extensibility.