import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      lowercase: true, 
      trim: true 
    },
    items: [
      {
        product: {
          title: { type: String, required: true },
          price: { type: Number, required: true },
          description: { type: String },
          images: [String],
        },
      },
    ],
    total: { 
      type: Number, 
      required: true,
      min: 0 
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
