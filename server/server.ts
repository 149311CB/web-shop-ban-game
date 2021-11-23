import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import cors from "cors";

import sampleRoutes from "./routes/sampleRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" })); // will be changed later?

app.get("/", (_, res) => {
  res.send("API is running");
});

app.use("/api/sample", sampleRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
