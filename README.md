# 🧠 Athena — AI Search Assistant (Perplexity-style)

Athena is a context-aware AI backend that combines **real-time web search** with **LLM reasoning** to generate structured, reliable answers. It is designed to behave like a simplified version of Perplexity, with extensibility for conversations, memory, and intelligent query handling.

---

## 🚀 Features

* 🔍 Real-time web search (Tavily)
* 🧠 LLM-powered answers (OpenRouter)
* 📦 Structured XML output (easy frontend parsing)
* 🛡️ Input validation (Zod)
* ⚡ Optimized context trimming (token-efficient)
* 🎯 Follow-up question generation
* 🧼 Response fallback handling
* 🗄️ Database integration (Prisma)
* 💬 Conversation system (WIP)

---

## 🏗️ Architecture

```
User Query
   ↓
Tavily Search API
   ↓
Context Filtering (formatContext)
   ↓
Prompt Construction
   ↓
LLM (OpenRouter)
   ↓
Structured XML Response
   ↓
Frontend Rendering / Storage
```

---

## 📁 Project Structure

```
.
├── index.ts            # Main server + routes
├── prompt.ts           # System + template prompts
├── db/                 # Prisma setup
├── prisma/             # Schema & migrations
├── package.json
└── README.md
```

---

## ⚙️ Tech Stack

* **Backend:** Node.js + Express
* **Validation:** Zod
* **Search:** Tavily API
* **LLM:** OpenRouter (LLaMA 3 / Mixtral)
* **Database:** PostgreSQL (Supabase)
* **ORM:** Prisma

---

## 🔧 Setup Instructions

### 1. Install dependencies

```bash
npm install
```

---

### 2. Environment Variables

Create `.env`:

```env
PORT=3000
OPEN_ROUTER_API=your_openrouter_api_key
API_KEY=your_tavily_api_key
DATABASE_URL=your_database_url
```

---

### 3. Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev
```

---

### 4. Run Server

```bash
npx ts-node index.ts
```

---

## 📡 API Routes

### 🧠 Core AI

#### `POST /ask-Athena`

Main query endpoint.

**Request:**

```json
{
  "query": "What is artificial intelligence?"
}
```

**Response:**

```xml
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

### 🔄 Follow-up Queries (WIP)

#### `POST /ask-Athena/follow-on`

Planned:

* Fetch previous conversation
* Send full history to LLM
* Generate contextual response
* Stream output

---

### 👤 Auth (Planned)

#### `POST /signup`

* Create new user

#### `POST /signin`

* Authenticate user

---

### 💬 Conversations (Planned)

#### `GET /Athena/convresations`

* Fetch user conversations

#### `POST /Athena/conversation/:id`

* Add message to a conversation

---

## 🧠 Core Logic

### Context Optimization

```ts
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

👉 Reduces token usage and improves answer quality.

---

### Prompt Flow

1. Inject search results into template
2. Add strict system prompt
3. Force XML output
4. Send to LLM

---

### Output Guard

If LLM breaks format:

```xml
<ANSWER>
Fallback response triggered.
</ANSWER>
```

---

## ⚠️ Limitations

* No streaming yet
* No memory (stateless queries)
* XML format may break occasionally
* No ranking of search results
* Basic error handling

---

## 🔮 Future Improvements

* 🔄 Streaming responses (SSE)
* 🧾 Source citations (Perplexity-style)
* 🧠 Conversation memory
* 📊 Result reranking
* 🛡️ Prompt injection defense
* 💳 Credit system per user
* ⚡ Response caching (same query reuse)
* 🔍 Semantic search (vector DB)

---

## 🧪 Example Flow

1. User sends query
2. Athena fetches web results
3. Filters + trims context
4. Sends to LLM
5. Returns structured XML

---

## 💥 Current Status

Athena is at:

> **v1 — functional AI search backend**

Not yet:

> full Perplexity-level system (missing memory, ranking, citations)

---

## 👨‍💻 Author

Built by divi

---

## 📄 License

MIT
