import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../db.json");

const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data || "[]");
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET /medicines/saved
router.get("/", (req, res) => {
  const saved = readDB();
  res.json(saved);
});

// POST /medicines/saved
router.post("/", (req, res) => {
  const medicine = req.body;

  if (!medicine || !medicine.name) {
    return res.status(400).json({ error: "Medicine data is required" });
  }

  const saved = readDB();
  const already = saved.find(
    (m) => m.name.toLowerCase() === medicine.name.toLowerCase(),
  );

  if (already) {
    return res.status(409).json({ error: "Medicine already saved" });
  }

  const entry = { id: Date.now(), ...medicine };
  saved.push(entry);
  writeDB(saved);

  res.status(201).json(entry);
});

// DELETE /medicines/saved/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const saved = readDB();
  const filtered = saved.filter((m) => m.id !== id);

  if (filtered.length === saved.length) {
    return res.status(404).json({ error: "Medicine not found" });
  }

  writeDB(filtered);
  res.json({ message: "Deleted successfully" });
});

export default router;
