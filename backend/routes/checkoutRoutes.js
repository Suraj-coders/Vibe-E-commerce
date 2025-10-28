import express from "express";
import { body } from "express-validator";
import { checkout } from "../controllers/checkoutController.js";

const router = express.Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
  ],
  checkout
);

export default router;
