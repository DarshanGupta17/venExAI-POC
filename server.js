import express from "express";
import dotenv from "dotenv";
import zohoRoutes from "./routes/zohoRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/zoho", zohoRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
);
