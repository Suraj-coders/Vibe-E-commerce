const API_BASE = "http://localhost:5000/api";


export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
}

export async function fetchCart() {
  const res = await fetch(`${API_BASE}/cart`);
  return res.json();
}


export async function addToCart(product) {
  await fetch(`${API_BASE}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}


export async function removeFromCart(id) {
  await fetch(`${API_BASE}/cart/${id}`, { method: "DELETE" });
}


export async function checkout(items, customer) {
  const res = await fetch(`${API_BASE}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, customer }),
  });
  if (!res.ok) throw new Error("Checkout failed");
  return res.json();
}