import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
// import https from "https";
// import fs from "fs";

dotenv.config();

import "./controllers/strategies/jwtStrategy";
// import "./controllers/strategies/facebookStrategy";
// import "./controllers/strategies/googleStrategy";
import "./controllers/strategies/LocalStrategy";

import sampleRoutes from "./routes/sampleRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import collectionRoutes from "./routes/collectionRoutes";
import adminGameRoutes from "./routes/adminGameRoutes";
import vocherRoutes from "./routes/vocherRoutes";

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(
  cors({
    origin: [
      "https://penguin.149311cb.tech",
      "https://localhost:3000",
      "https://localhost:3001",
      "https://149311cb.tech",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://duties-designing-garcia-periodically.trycloudflare.com",
      "https://web-shop-ban-game-next.vercel.app",
    ], // will be changed later?
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
app.use("/api/games", adminGameRoutes);
app.use("/api/vochers", vocherRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// const credentials = {
//   key: fs.readFileSync("./localhost-key.pem"),
//   cert: fs.readFileSync("./localhost.pem"),
// };

// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(PORT, () =>
//   console.log(`Server is running on port ${PORT}`)
// );

// httpsServer.on("clientError", (err, socket) => {
//   console.log(err);
//   socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
// });
