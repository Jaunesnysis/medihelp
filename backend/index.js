import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import searchRoutes from "./routes/search.js";
import savedRoutes from "./routes/saved.js";

dotenv.config();
// console.log("API KEY:", process.env.GEMINI_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/medicines", searchRoutes);
app.use("/medicines/saved", savedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
