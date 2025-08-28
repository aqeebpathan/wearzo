import { Router } from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { getOrderById, getOrders } from "../controllers/order.controller.js";

const router = Router();

router.use(protectRoute);

router.get("/", getOrders);
router.get("/:id", getOrderById);

export default router;
