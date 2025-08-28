import { Router } from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = Router();

router.use(protectRoute);

router.get("/profile", getUserProfile);

export default router;
