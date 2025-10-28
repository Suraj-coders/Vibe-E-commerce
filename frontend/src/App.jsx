import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchCart,
  addToCart,
  removeFromCart,
  checkout,
} from "./api";
import ProductsGrid from "./components/ProductsGrid.jsx";
import CartView from "./components/CartView.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";

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
    try {
      const [productsData, cartData] = await Promise.all([
        fetchProducts(),
        fetchCart(),
      ]);
      setProducts(productsData);
      setCart(cartData);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = async (product) => {
    await addToCart(product);
    setCart(await fetchCart());
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    setCart(await fetchCart());
  };

  const handleCheckout = async (customer) => {
    try {
      const res = await checkout(cart.items, customer);
      setReceipt(res.receipt); // show receipt
      setIsCheckoutOpen(false);
      setCart(await fetchCart()); // clear cart
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
   
      <header className="bg-white shadow p-3 px-6 lg:px-20 flex justify-between items-center sticky top-0 left-0 right-0 z-50">
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

     
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart.items}
        onCheckoutSuccess={handleCheckout}
      />

     
      {receipt && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-fadeIn text-center">
            <h3 className="text-xl font-bold text-emerald-600 mb-2">
              Checkout Successful!
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Thank you for your order, {receipt.customer?.name}!
            </p>

            <div className="text-left border-t pt-2 mb-3">
              <p>
                <strong>Order ID:</strong> {receipt.id}
              </p>
              <p>
                <strong>Email:</strong> {receipt.customer?.email}
              </p>
              <p>
                <strong>Total:</strong> ${receipt.total?.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(receipt.timestamp).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => setReceipt(null)}
              className="mt-3 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
