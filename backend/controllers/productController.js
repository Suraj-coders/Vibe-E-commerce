import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      // seed mock data if empty
      const seed = await Product.insertMany([
        { name: "Wireless Mouse", price: 999, image: "/img/mouse.jpg" },
        { name: "Bluetooth Headphones", price: 2999, image: "/img/headphones.jpg" },
        { name: "USB Keyboard", price: 1499, image: "/img/keyboard.jpg" },
        { name: "Laptop Stand", price: 1299, image: "/img/stand.jpg" },
        { name: "HD Webcam", price: 2499, image: "/img/webcam.jpg" },
      ]);
      return res.json(seed);
    }
    res.json(products);
  } catch (err) {
    next(err);
  }
};
