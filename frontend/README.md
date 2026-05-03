🎨 Athena Frontend — AI Search Interface

Athena Frontend is a modern, minimal UI for interacting with the Athena AI backend. It is designed to behave like a Perplexity-style search interface, focusing on clarity, speed, and structured responses.

🚀 Features
🔍 Clean search interface
⚡ Fast query submission
🧠 Displays structured AI responses (XML → UI)
🔁 Follow-up question interaction
💬 Conversation-based UI (WIP)
🌙 Modern dark theme (inspired by Apple/Perplexity)
📱 Responsive design
🏗️ Architecture
User Input
   ↓
API Call → /ask-Athena
   ↓
Receive XML Response
   ↓
Parse XML → JSON
   ↓
Render Answer + Follow-ups
📁 Project Structure
.
├── components/        # UI components
├── pages/             # Routes / views
├── services/          # API calls
├── utils/             # XML parsing, helpers
├── styles/            # Theme & design
└── README.md
⚙️ Tech Stack
Framework: React / Next.js (recommended)
Styling: Tailwind CSS
State: React hooks / Zustand (optional)
API: Fetch / Axios
🔧 Setup
npm install
npm run dev
📡 API Integration
Main Endpoint
POST /ask-Athena
Example Call
const res = await fetch("/ask-Athena", {
  method: "POST",
  body: JSON.stringify({ query }),
});
🧠 Response Handling

Backend returns XML:

<ANSWER>...</ANSWER>
<FOLLOW_UPS>
  <QUESTION>...</QUESTION>
</FOLLOW_UPS>

Frontend must:

Parse XML
Extract:
Answer
Follow-up questions
⚠️ Limitations
No streaming yet
No authentication UI
No persistent chat memory
Basic error states
🔮 Future Improvements
💬 Chat history UI
⚡ Streaming responses (typing effect)
🧾 Source citations UI
🔐 Auth pages (signup/signin)
📊 Query history dashboard
🎯 Goal

Provide a simple, fast, and elegant interface for interacting with Athena AI.