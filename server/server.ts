import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import cors from "cors";

import sampleRoutes from "./routes/sampleRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
import paymentRoutes from "./routes/paymentRoutes";

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
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
