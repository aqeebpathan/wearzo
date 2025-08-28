import { Router } from "express";

import {
  getBestSellerProduct,
  getNewArrivalProducts,
  getProductById,
  getProducts,
  getSimilarProducts,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);

router.get("/best-seller", getBestSellerProduct);
router.get("/new-arrivals", getNewArrivalProducts);

router.get("/:id", getProductById);
router.get("/similar/:id", getSimilarProducts);

export default router;
