import { Router } from "express";

import {
  createCheckout,
  finalizeOrder,
  updatePaymentStatus,
} from "../controllers/checkout.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/", createCheckout);
router.put("/:id/finalize", finalizeOrder);
router.put("/:id/payment", updatePaymentStatus);

export default router;
