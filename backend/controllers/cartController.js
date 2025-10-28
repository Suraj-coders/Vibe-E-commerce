import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import { validationResult } from "express-validator";

export const getCart = async (req, res, next) => {
  try {
    const cartItems = await CartItem.find().populate("product");
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );
    res.json({ items: cartItems, total });
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { productId, qty } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let existing = await CartItem.findOne({ product: productId });
    if (existing) {
      existing.qty += qty;
      await existing.save();
      return res.json(existing);
    }

    const item = await CartItem.create({ product: productId, qty });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const item = await CartItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item removed" });
  } catch (err) {
    next(err);
  }
};
