// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  images: { type: [String], required: true }, 
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
