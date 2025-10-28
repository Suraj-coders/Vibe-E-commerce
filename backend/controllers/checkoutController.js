import CartItem from "../models/CartItem.js";
import Order from "../models/Order.js";
import { validationResult } from "express-validator";

export const checkout = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email } = req.body;
    const cartItems = await CartItem.find().populate("product");

    if (!cartItems.length)
      return res.status(400).json({ message: "Cart is empty" });

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );

    const order = await Order.create({
      name,
      email,
      items: cartItems.map((i) => ({
        product: i.product.toObject(),
        qty: i.qty,
      })),
      total,
    });

    await CartItem.deleteMany();

    res.json({
      message: "Checkout successful",
      receipt: {
        id: order._id,
        total,
        timestamp: order.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};
