import express from "express";
import { importProducts } from "../controllers/importController.js";

const router = express.Router();

router.get("/import", importProducts);

export default router;
