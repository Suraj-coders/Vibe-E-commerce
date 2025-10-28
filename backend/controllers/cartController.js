import Product from "../models/Product.js";

let cart = [];

export const getCart = (req, res) => {
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  res.json({ items: cart, total });
};

export const addToCart = async (req, res) => {
  try {
    const { _id } = req.body;
    const product = await Product.findById(_id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    cart.push(product);
    res.json({ message: "Added to cart", cart });
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

export const removeFromCart = (req, res) => {
  const { id } = req.params;
  cart = cart.filter((i) => i._id.toString() !== id);
  res.json({ message: "Item removed", cart });
};
