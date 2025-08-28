import { Router } from "express";

import {
  createOneTimePromotion,
  createPromotion,
  getCurrentPromotion,
} from "../controllers/promotion.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.post("/", createPromotion);
router.get("/seed", createOneTimePromotion);
router.get("/current", getCurrentPromotion);

export default router;
