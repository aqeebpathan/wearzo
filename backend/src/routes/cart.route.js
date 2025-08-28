import { Router } from "express";

import {
  getCart,
  mergeCart,
  addProduct,
  removeProduct,
  updateProductQuantity,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", getCart);
router.post("/", addProduct);
router.delete("/", removeProduct);
router.put("/", updateProductQuantity);

router.post("/merge", mergeCart);

export default router;
