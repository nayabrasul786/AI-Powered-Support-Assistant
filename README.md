AI Powered Support Assistant

A full-stack AI-powered support chat application built with React, Node.js, and SQLite.

The assistant answers user queries strictly based on provided documentation using LLM integration while maintaining session-based conversation history stored in SQLite.

👨‍💻 Author

Shaik Nayab Rasul
🔗 GitHub: https://github.com/nayabrasul786

📁 Repository: https://github.com/nayabrasul786/AI-Powered-Support-Assistant.git

🚀 Tech Stack

Frontend: React.js (Vite)

Backend: Node.js (Express)

Database: SQLite

LLM: OpenAI / Gemini (Document-Based Prompting)

Security: express-rate-limit

Storage: LocalStorage + SQLite

🏗️ Project Architecture
Frontend (React)
        ↓
Backend API (Express)
        ↓
SQLite Database
        ↓
LLM (Prompt with Docs + Context)
📂 Project Structure
AI-Powered-Support-Assistant/
│
├── frontend/      → React UI (Chat Interface, Session Handling)
├── backend/       → Express API (LLM, DB, Rate Limiting)
│   ├── docs.json
│   ├── server.js
│   └── database.sqlite (auto-created)
│
└── README.md
🗄️ Database Schema
sessions
Column	Type	Description
id	TEXT	Primary Key (sessionId)
created_at	DATETIME	Created timestamp
updated_at	DATETIME	Last activity timestamp
messages
Column	Type	Description
id	INTEGER	Auto Increment
session_id	TEXT	FK → sessions
role	TEXT	"user" / "assistant"
content	TEXT	Message text
created_at	DATETIME	Timestamp
✨ Core Features

✔ Strict Document-Based Question Answering
✔ Context Memory (Last 5 message pairs from SQLite)
✔ Persistent Sessions using LocalStorage
✔ Rate Limiting for API Protection
✔ Clean JSON Error Handling
✔ Responsive Chat UI

📄 Document-Based Answering

The assistant uses docs.json as the only source of truth.

Example:

[
  {
    "title": "Reset Password",
    "content": "Users can reset password from Settings > Security."
  },
  {
    "title": "Refund Policy",
    "content": "Refunds are allowed within 7 days of purchase."
  }
]
🔒 Strict AI Rules

The assistant:

Uses ONLY content from docs.json

Uses last 5 user + assistant message pairs from SQLite

Does NOT hallucinate

Does NOT guess

If answer not found:

Sorry, I don’t have information about that.

🧠 Prompt Construction

The backend builds a structured prompt:

You are a support assistant.
Only answer using the provided documentation.
If the answer is not found, say:
"Sorry, I don’t have information about that."

Documentation:
{relevant_docs}

Conversation History:
{last_5_pairs}

User Question:
{current_question}
🔌 API Endpoints
1️⃣ POST /api/chat

Request:

{
  "sessionId": "abc123",
  "message": "How can I reset my password?"
}

Response:

{
  "reply": "Users can reset password from Settings > Security.",
  "tokensUsed": 123
}
2️⃣ GET /api/conversations/:sessionId

Returns conversation history in chronological order.

3️⃣ GET /api/sessions

Returns all active sessions with last updated timestamp.

⚙️ Setup Instructions
🔧 Prerequisites

Node.js v18+

npm

Git

📥 Clone Repository
git clone https://github.com/nayabrasul786/AI-Powered-Support-Assistant.git
cd AI-Powered-Support-Assistant
🖥️ Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
OPENAI_API_KEY=your_api_key_here
CORS_ORIGIN=http://localhost:5173

Start backend:

npm run dev

Backend runs at:

http://localhost:5000
🌐 Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🚦 Rate Limiting

Implemented using express-rate-limit.

If exceeded:

{
  "error": "Too many requests. Please try again later."
}
📱 Responsive UI

Mobile-first layout

Scrollable chat history

Loading indicator

Session persistence

Clean minimal UI

🎯 Evaluation Coverage

✔ Frontend UX + Session Handling
✔ Backend API Design
✔ SQLite Persistence
✔ LLM Document-Based Accuracy
✔ Error Handling + Rate Limiting

🏁 Conclusion

This project demonstrates:

Full-stack architecture

LLM integration with strict guardrails

Persistent session management

Clean, scalable backend structure

Production-ready project organization
