import express from "express";
import { body, param } from "express-validator";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCart);

router.post(
  "/",
  [
    body("productId").notEmpty().withMessage("Product ID is required"),
    body("qty").isInt({ min: 1 }).withMessage("Quantity must be >= 1"),
  ],
  addToCart
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid cart item ID")],
  removeFromCart
);

export default router;
