# 🧠 Athena Backend — AI Search Engine

Athena Backend is the core engine powering the Athena AI assistant. It combines **real-time web search**, **LLM reasoning**, and **structured response generation** to deliver accurate, context-aware answers.

This backend is designed to be a **Perplexity-style AI system**, with extensibility for conversations, memory, and intelligent query handling.

---

## 🚀 Features

* 🔍 **Real-time Web Search** (Tavily)
* 🧠 **LLM Processing** (OpenRouter)
* 📦 **Structured XML Output** (predictable + frontend-friendly)
* 🛡️ **Input Validation** (Zod)
* ⚡ **Context Optimization** (token-efficient)
* 🧼 **Response Fallback Handling**
* 🗄️ **Database Integration** (Prisma + PostgreSQL)
* 💬 **Conversation System (WIP)**
* 🔐 **Authentication Routes (WIP)**

---

## 🏗️ Architecture

```id="be-arch"
User Request
   ↓
Validate Input (Zod)
   ↓
Fetch Context (Tavily)
   ↓
Format Context (trim + filter)
   ↓
Construct Prompt
   ↓
LLM Call (OpenRouter)
   ↓
Validate XML Output
   ↓
Send Response to Client
```

---

## 📁 Project Structure

```id="be-structure"
.
├── index.ts            # Express server + routes
├── prompt.ts           # System prompt + template
├── db/                 # Prisma client setup
├── prisma/             # Schema & migrations
├── package.json
└── README.md
```

---

## ⚙️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express
* **Validation:** Zod
* **Search API:** Tavily
* **LLM Provider:** OpenRouter
* **Database:** PostgreSQL (Supabase)
* **ORM:** Prisma

---

## 🔧 Setup Instructions

### 1. Install dependencies

```bash id="be-install"
npm install
```

---

### 2. Environment Variables

Create a `.env` file:

```env id="be-env"
PORT=3000
OPEN_ROUTER_API=your_openrouter_api_key
API_KEY=your_tavily_api_key
DATABASE_URL=your_postgres_connection_string
```

---

### 3. Prisma Setup

```bash id="be-prisma"
npx prisma generate
npx prisma migrate dev
```

---

### 4. Run Server

```bash id="be-run"
npx ts-node index.ts
```

Server runs at:

```id="be-url"
http://localhost:3000
```

---

## 📡 API Routes

---

### 🧠 `POST /ask-Athena`

Main AI query endpoint.

#### Flow:

1. Validate input
2. Fetch web results (Tavily)
3. Format context
4. Inject into prompt
5. Call LLM
6. Enforce XML structure
7. Return response

#### Request

```json id="be-req"
{
  "query": "What is artificial intelligence?"
}
```

---

#### Response (XML)

```xml id="be-res"
<ANSWER>
AI is the simulation of human intelligence...
</ANSWER>

<FOLLOW_UPS>
  <QUESTION>What are types of AI?</QUESTION>
  <QUESTION>How is AI used today?</QUESTION>
  <QUESTION>What are AI risks?</QUESTION>
</FOLLOW_UPS>
```

---

---

### 🔄 `POST /ask-Athena/follow-on` (WIP)

Planned functionality:

* Retrieve previous conversation from DB
* Send full chat history to LLM
* Maintain context continuity
* Stream response back to client

---

---

### 👤 Authentication (WIP)

#### `POST /signup`

* Create new user

#### `POST /signin`

* Authenticate user

---

---

### 💬 Conversations (WIP)

#### `GET /Athena/convresations`

* Fetch all conversations for a user

#### `POST /Athena/conversation/:id`

* Add message to a specific conversation

---

## 🧠 Core Logic

---

### 🔹 Context Optimization

```ts id="be-context"
function formatContext(results: any[]) {
  return results
    .slice(0, 5)
    .map((r) => ({
      title: r.title,
      content: r.content?.slice(0, 500),
      url: r.url,
    }));
}
```

👉 Reduces token usage and improves response quality.

---

### 🔹 Prompt Strategy

* Inject real-time web data
* Restrict model to context
* Enforce strict XML output
* Generate follow-up questions

---

### 🔹 Output Guard

If model fails to follow XML format:

```xml id="be-fallback"
<ANSWER>
The model failed to generate a structured response.
</ANSWER>
```

---

## ⚠️ Limitations

* No streaming responses yet
* No conversation memory (stateless)
* No search result reranking
* No caching layer
* Basic error handling

---

## 🔮 Future Improvements

* ⚡ Streaming responses (SSE)
* 🧾 Source citations (Perplexity-style)
* 🧠 Conversation memory (chat history)
* 📊 Result reranking
* 🛡️ Prompt injection protection
* 💳 Credit-based usage system
* 🔍 Semantic search (vector DB)

---

## 🧪 Example Flow

1. User sends query
2. Backend fetches web context
3. Context is trimmed + formatted
4. Prompt is constructed
5. LLM generates XML response
6. Backend validates output
7. Response returned to frontend

---

## 💥 Current Status

> **v1 — Functional AI Search Backend**

Supports:

* Search + LLM reasoning
* Structured output

Missing:

* Memory
* Streaming
* Ranking
* Citations

---

## 🎯 Goal

To build a **fully customizable AI search engine** with capabilities similar to Perplexity, but with full control over logic, prompts, and infrastructure.

---

## 👨‍💻 Author

Built with 🚀 by you.

---

## 📄 License

MIT
