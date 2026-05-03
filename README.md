# 🧠 Athena — AI Search Assistant (Perplexity-style)

Athena is a context-aware AI assistant that combines **real-time web search** with **LLM reasoning** to generate structured, reliable answers — inspired by tools like Perplexity.

It retrieves live data, processes it through a language model, and returns responses in a **strict XML format** for easy frontend parsing.

---

## 🚀 Features

* 🔍 **Real-time Web Search** (via Tavily)
* 🧠 **LLM-Powered Answers** (via OpenRouter)
* 📦 **Structured Output (XML)** for predictable parsing
* 🛡️ **Input Validation** using Zod
* ⚡ **Optimized Context Handling** (token-safe)
* 🎯 **Follow-up Question Generation**
* 🧼 **Response Guardrails & Fallback Handling**

---

## 🏗️ Architecture

```
User Query
   ↓
Tavily Search API (fetch context)
   ↓
Context Filtering & Trimming
   ↓
Prompt Construction
   ↓
LLM (OpenRouter)
   ↓
Structured XML Response
   ↓
Frontend Rendering
```

---

## 📁 Project Structure

```
.
├── index.ts        # Main server logic
├── prompt.ts       # System prompt + template
├── package.json
└── README.md
```

---

## ⚙️ Tech Stack

* **Backend:** Node.js + Express
* **Validation:** Zod
* **Search API:** Tavily
* **LLM Provider:** OpenRouter
* **Language Model:** LLaMA 3 (or Mixtral)

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/athena.git
cd athena
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Environment Variables

Create a `.env` file:

```env
PORT=3000
OPEN_ROUTER_API=your_openrouter_api_key
API_KEY=your_tavily_api_key
```

---

### 4. Run the server

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

## 📡 API Usage

### Endpoint

```
POST /ask-Athena
```

### Request Body

```json
{
  "query": "What is artificial intelligence?"
}
```

---

### Response Format (XML)

```xml
<ANSWER>
Artificial Intelligence (AI) refers to the simulation of human intelligence in machines...
</ANSWER>

<FOLLOW_UPS>
  <QUESTION>What are the types of AI?</QUESTION>
  <QUESTION>How is AI used in real-world applications?</QUESTION>
  <QUESTION>What are the risks of AI?</QUESTION>
</FOLLOW_UPS>
```

---

## 🧠 Prompt Design

Athena uses a strict system prompt:

* Forces **context-only answering**
* Prevents hallucination
* Enforces **XML structure**
* Generates follow-up questions

---

## ⚠️ Limitations

* Depends on quality of search results
* XML output may occasionally break (handled with fallback)
* No streaming (yet)
* No conversation memory (stateless)

---

## 🔮 Future Improvements

* 🔄 Streaming responses (SSE)
* 🧾 Citation system (like Perplexity)
* 🧠 Conversation memory
* 📊 Result reranking
* 🛡️ Prompt injection protection
* 🌐 Multi-model routing

---

## 🧪 Example Flow

1. User asks: *"Best programming language to learn?"*
2. Athena fetches web results
3. Filters & trims context
4. Sends to LLM with strict prompt
5. Returns structured XML answer + follow-ups

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 📄 License

MIT License

---

## ✨ Inspiration

Inspired by modern AI search tools like Perplexity, but designed for full customization and control.

---

