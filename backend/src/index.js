import cors from "cors";
import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.config.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import cartRoutes from "./routes/cart.route.js";
import adminRoutes from "./routes/admin.route.js";
import orderRoutes from "./routes/order.route.js";
import productRoutes from "./routes/product.route.js";
import checkoutRoutes from "./routes/checkout.route.js";
import promotionRoutes from "./routes/promotion.route.js";
import errorHandler from "./middleware/error.middleware.js";

configDotenv();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(cookieParser());

// Connect to DB before processing requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/promotions", promotionRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use(errorHandler);

// Start server in development mode
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
  });
}

export default app;
