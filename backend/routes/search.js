import express from "express";
import { fetchMedicineData } from "../services/fdaService.js";
import { summarizeMedicine } from "../services/geminiService.js";

const router = express.Router();

// POST /medicines/search
router.post("/search", async (req, res) => {
  const { name, lang = "en" } = req.body;

  try {
    const raw = await fetchMedicineData(name);
    const summary = await summarizeMedicine(raw, lang);
    res.json({ name, lang, ...summary });
  } catch (err) {
    console.log("ERROR:", err.message); // add this
    res.status(500).json({ error: "Medicine not found or API error" });
  }
});

// GET /medicines/:name
router.get("/:name", async (req, res) => {
  const { name } = req.params;
  const lang = req.query.lang || "en";

  try {
    const raw = await fetchMedicineData(name);
    const summary = await summarizeMedicine(raw, lang);
    res.json({ name, lang, ...summary });
  } catch (err) {
    res.status(500).json({ error: "Medicine not found or API error" });
  }
});

export default router;
