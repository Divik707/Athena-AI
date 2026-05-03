# 🎨 Athena Frontend — AI Search Interface

Athena Frontend is a modern, minimal user interface for interacting with the Athena AI backend. It is designed to deliver a **Perplexity-style experience** — fast search, clean answers, and intuitive follow-ups.

---

## 🚀 Features

* 🔍 **Search-first UI** — ask anything instantly
* 🧠 **Structured Answer Rendering** (XML → UI)
* 🔁 **Follow-up Questions** for deeper exploration
* 💬 **Chat-like Experience** (planned)
* 🌙 **Modern Dark Theme** (clean, minimal design)
* 📱 **Responsive Layout** (desktop + mobile)

---

## 🏗️ Architecture

```id="fe-arch"
User Input
   ↓
API Request → Backend (/ask-Athena)
   ↓
Receive XML Response
   ↓
Parse XML → JSON
   ↓
Render Answer + Follow-ups
```

---

## 📁 Project Structure

```id="fe-structure"
.
├── components/        # Reusable UI components
├── pages/             # Main views / routes
├── services/          # API calls (fetch/axios)
├── utils/             # XML parsing helpers
├── hooks/             # Custom React hooks
├── styles/            # Tailwind / global styles
└── README.md
```

---

## ⚙️ Tech Stack

* **Framework:** React / Next.js
* **Styling:** Tailwind CSS
* **State Management:** React Hooks / Zustand (optional)
* **API Handling:** Fetch / Axios

---

## 🔧 Setup Instructions

### 1. Install dependencies

```bash id="fe-install"
npm install
```

---

### 2. Run development server

```bash id="fe-run"
npm run dev
```

App will run at:

```id="fe-url"
http://localhost:3000
```

---

## 📡 API Integration

### Endpoint

```id="fe-endpoint"
POST /ask-Athena
```

---

### Example Request

```ts id="fe-api"
const response = await fetch("http://localhost:3000/ask-Athena", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: "What is artificial intelligence?",
  }),
});

const data = await response.json();
```

---

## 🧠 Handling Backend Response

The backend returns **XML**, not JSON:

```xml id="fe-xml"
<ANSWER>
AI is the simulation of human intelligence...
</ANSWER>

<FOLLOW_UPS>
  <QUESTION>What are types of AI?</QUESTION>
  <QUESTION>How is AI used today?</QUESTION>
  <QUESTION>What are risks of AI?</QUESTION>
</FOLLOW_UPS>
```

---

### 🔄 Convert XML → UI Data

You should:

1. Extract `<ANSWER>`
2. Extract all `<QUESTION>` tags
3. Store them in state

---

### Example Parsing (Basic)

```ts id="fe-parse"
function parseXML(xml: string) {
  const answer = xml.match(/<ANSWER>([\s\S]*?)<\/ANSWER>/)?.[1];
  const questions = [...xml.matchAll(/<QUESTION>(.*?)<\/QUESTION>/g)].map(
    (q) => q[1]
  );

  return { answer, questions };
}
```

---

## 🎯 Core Responsibilities

Frontend is responsible for:

* Sending user queries
* Rendering structured responses
* Handling UI/UX interactions
* Managing client-side state
* Displaying follow-up suggestions

---

## ⚠️ Limitations

* No streaming (responses appear all at once)
* No authentication UI yet
* No persistent chat history
* Basic error handling

---

## 🔮 Future Improvements

* ⚡ Streaming responses (typing effect)
* 💬 Full chat UI with history
* 🧾 Source citations (like Perplexity)
* 🔐 Authentication pages (signup/signin)
* 📊 User dashboard (query history)
* 🎨 Advanced UI animations

---

## 🧪 Example Flow

1. User enters a query
2. Frontend sends request to backend
3. Receives XML response
4. Parses XML
5. Displays answer + follow-ups

---

## 🎨 Design Philosophy

* Minimal
* Fast
* Distraction-free
* Content-focused

---

## 👨‍💻 Author

Built with 🚀 by you.

---

## 📄 License

MIT
