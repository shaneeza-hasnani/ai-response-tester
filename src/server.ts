import express from "express";
import path from "node:path";

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve the browser interface
app.use(express.static(path.join(process.cwd(), "public")));

// Handle questions
app.post("/api/ask", (req, res) => {
  const { question } = req.body ?? {};

  if (typeof question !== "string" || !question.trim()) {
    return res.status(400).json({
      error: "Please enter a question."
    });
  }

  return res.json({
    answer: `You asked: ${question}`
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});