const db = require("../db");
const { generateReply } = require("../services/llmService");

const handleChat = async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({ error: "Missing sessionId or message" });
    }

    // Session logic
    db.run(`INSERT OR IGNORE INTO sessions (id) VALUES (?)`, [sessionId]);

    db.run(
      `INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)`,
      [sessionId, "user", message]
    );

    const replyData = await generateReply(sessionId, message);

    res.json(replyData);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { handleChat };