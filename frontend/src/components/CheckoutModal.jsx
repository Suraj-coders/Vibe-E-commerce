import React, { useState } from "react";

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onCheckoutSuccess,
}) {
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.email) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);
      await onCheckoutSuccess(customer);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative animate-fadeIn">
        <h3 className="text-lg font-semibold mb-4">Checkout</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={customer.name}
            onChange={(e) =>
              setCustomer({ ...customer, name: e.target.value })
            }
            className="w-full border p-2 rounded-md"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
            className="w-full border p-2 rounded-md"
            required
          />

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Order Summary</h4>
            <ul className="max-h-24 overflow-y-auto text-sm text-gray-700 border rounded-md p-2">
              {cartItems.map((item) => (
                <li key={item._id} className="flex justify-between">
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md"
            >
              {submitting ? "Processing..." : "Confirm Checkout"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
