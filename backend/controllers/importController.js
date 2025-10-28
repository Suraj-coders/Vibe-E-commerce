import axios from "axios";
import Product from "../models/Product.js";

export const importProducts = async (req, res) => {
  try {
    // Fetch from external API
    const { data } = await axios.get(
      "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
    );

   
    const formatted = data.map((item) => ({
      title: item.title,
      price: item.price,
      description: item.description || "",
      images:
        Array.isArray(item.images) && item.images.length
          ? item.images
          : ["https://via.placeholder.com/400x400?text=No+Image"],
    }));

   
    await Product.deleteMany({});

    
    const inserted = await Product.insertMany(formatted);

    res.status(201).json({
      message: "Products imported successfully!",
      count: inserted.length,
      products: inserted,
    });
  } catch (err) {
    console.error("Import Error Details:", err);
    res.status(500).json({
      error: "Failed to import products",
      details: err.message,
    });
  }
};
