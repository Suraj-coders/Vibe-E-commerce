import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchCart,
  addToCart,
  removeFromCart,
  checkout,
} from "./api";
import ProductsGrid from "./components/ProductsGrid";
import CartView from "./components/CartView";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    const products = await fetchProducts();
    const cart = await fetchCart();
    setProducts(products);
    setCart(cart);
    setLoading(false);
  }

  const handleAdd = async (p) => {
    await addToCart(p);
    setCart(await fetchCart());
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    setCart(await fetchCart());
  };

  const handleCheckout = async (customer) => {
    const res = await checkout(cart.items, customer);
    setReceipt(res.receipt);
    setIsCheckoutOpen(false);
    setCart(await fetchCart());
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 left-0 right-0 z-50">
        <h1 className="text-2xl font-bold text-emerald-600">Vibe Shop</h1>
        <div className="flex gap-4 items-center">
          <div className="text-gray-700">
            {cart.items?.length || 0} items |{" "}
            <span className="font-semibold">${cart.total?.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            disabled={!cart.items.length}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row p-6 gap-6 max-w-6xl mx-auto w-full flex-1">
        <section className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ProductsGrid products={products} onAdd={handleAdd} />
          )}
        </section>

        <aside className="w-full lg:w-1/3">
          <CartView cart={cart} onRemove={handleRemove} />
        </aside>
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart.items}
        onCheckoutSuccess={handleCheckout}
      />

      {/* Receipt */}
      {receipt && (
        <div className="fixed bottom-5 right-5 bg-gray-900 text-white p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold">Receipt</h3>
          <p>ID: {receipt.id}</p>
          <p>Total: ${receipt.total}</p>
          <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
          <button
            onClick={() => setReceipt(null)}
            className="mt-2 text-sm underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
