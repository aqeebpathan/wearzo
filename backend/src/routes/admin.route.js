import { Router } from "express";

import {
  createProduct,
  createUser,
  deleteOrder,
  deleteUser,
  getAdminOverview,
  getOrders,
  getProducts,
  getUsers,
  updateOrderStatus,
  updateProduct,
  updateUserRole,
} from "../controllers/admin.controller.js";
import { uploadProductImages } from "../middleware/upload.middleware.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);

// User management
router.get("/users", getUsers);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/role", updateUserRole);

// Product management
router.patch("/:id", updateProduct);
router.get("/products", getProducts);
router.post("/products", uploadProductImages, createProduct);

// Order management
router.get("/orders", getOrders);
router.delete("/orders/:id", deleteOrder);
router.patch("/orders/:id/status", updateOrderStatus);

router.get("/stats/overview", getAdminOverview);

export default router;
