import express from "express";
import { fetchMedicineData } from "../services/fdaService.js";
import {
  summarizeMedicine,
  getInteractions,
} from "../services/geminiService.js";

const router = express.Router();

router.post("/search", async (req, res) => {
  const { name, lang = "en" } = req.body;
  try {
    const raw = await fetchMedicineData(name);
    const summary = await summarizeMedicine(raw, lang);
    res.json({ name, lang, ...summary });
  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ error: "Medicine not found or API error" });
  }
});

router.get("/:name/interactions", async (req, res) => {
  const { name } = req.params;
  const lang = req.query.lang || "en";
  try {
    const raw = await fetchMedicineData(name);
    const interactions = await getInteractions(raw, name, lang);
    res.json({ name, interactions });
  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ error: "Could not fetch interactions" });
  }
});

export default router;
