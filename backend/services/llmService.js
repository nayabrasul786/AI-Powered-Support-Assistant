const OpenAI = require("openai");
const fs = require("fs");
const db = require("../db");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const docs = JSON.parse(fs.readFileSync("./docs.json"));

const generateReply = async (sessionId, message) => {

  // Fetch last 10 messages
  const history = await new Promise((resolve, reject) => {
    db.all(
      `SELECT role, content FROM messages 
       WHERE session_id = ?
       ORDER BY created_at DESC
       LIMIT 10`,
      [sessionId],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows.reverse());
      }
    );
  });

  const docsText = docs.map(d => `${d.title}: ${d.content}`).join("\n");

  const prompt = `
You MUST answer only using the provided documentation.
If answer not found, reply:
"Sorry, I don’t have information about that."

Documentation:
${docsText}

Chat History:
${history.map(h => `${h.role}: ${h.content}`).join("\n")}

User Question:
${message}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  const reply = completion.choices[0].message.content;

  // Save assistant reply
  db.run(
    `INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)`,
    [sessionId, "assistant", reply]
  );

  return {
    reply,
    tokensUsed: completion.usage.total_tokens
  };
};

module.exports = { generateReply };