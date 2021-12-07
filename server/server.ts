import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import https from "https";
import fs from "fs";

dotenv.config();

import "./controllers/strategies/jwtStrategy";
import "./controllers/strategies/facebookStrategy";
import "./controllers/strategies/googleStrategy";
import "./controllers/strategies/LocalStrategy";

import sampleRoutes from "./routes/sampleRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import collectionRoutes from "./routes/collectionRoutes";

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(
  cors({
    origin: "*", // will be changed later?
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/api/sample", sampleRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/collections", collectionRoutes);

const PORT = process.env.PORT || 5000;

const credentials = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
};

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
