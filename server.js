import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Логируем содержимое dist
try {
  const distPath = path.join(__dirname, "dist");
  console.log("Dist contents:", fs.readdirSync(distPath));
} catch (err) {
  console.error("Dist folder not found:", err);
}

// Отдаём статику из dist
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
