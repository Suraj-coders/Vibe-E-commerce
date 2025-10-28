import { useState } from "react";

export default function CheckoutModal({ isOpen, onClose, onCheckoutSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckoutSuccess({ name, email });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h3 className="text-lg font-semibold mb-4">Checkout</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md w-full px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md w-full px-3 py-2 text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-3 py-1.5 rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-500 text-white px-3 py-1.5 rounded-md hover:bg-emerald-600 text-sm"
            >
              Pay (Mock)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
