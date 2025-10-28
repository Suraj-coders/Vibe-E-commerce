import Order from "../models/Order.js";

export const checkout = async (req, res) => {
  try {
    const { items, customer } = req.body;

    if (!items?.length || !customer?.name || !customer?.email) {
      return res.status(400).json({ error: "Invalid checkout data" });
    }

    const total = items.reduce(
      (sum, i) => sum + (i.price || i.product?.price || 0),
      0
    );

  
    const order = new Order({
      name: customer.name,
      email: customer.email,
      items: items.map((i) => ({
        product: i.product || i,
      })),
      total,
    });

    await order.save();

    res.json({
      message: "Checkout successful",
      receipt: {
        id: order._id,
        total,
        customer,
        timestamp: order.createdAt,
      },
    });
  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).json({ error: "Failed to checkout" });
  }
};
