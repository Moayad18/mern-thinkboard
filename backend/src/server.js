import express from "express";
import notesRouters from "./routes/notesRoutes.js";
import cors from "cors";

import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/RateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRouters);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
