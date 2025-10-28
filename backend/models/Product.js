import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    price: { type: Number, required: [true, "Price is required"], min: 0 },
    description: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
