const BASE_URL = "http://localhost:5000/api";

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}

export async function fetchCart() {
  const res = await fetch(`${BASE_URL}/cart`);
  return res.json();
}

export async function addToCart(product, qty = 1) {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: product._id, qty }),
  });
  return res.json();
}

export async function removeFromCart(id) {
  const res = await fetch(`${BASE_URL}/cart/${id}`, { method: "DELETE" });
  return res.json();
}

export async function checkout(cartItems, customer) {
  const res = await fetch(`${BASE_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  return res.json();
}
