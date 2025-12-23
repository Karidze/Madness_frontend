import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Отдаём статику из dist
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback — любой маршрут возвращает index.html
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
