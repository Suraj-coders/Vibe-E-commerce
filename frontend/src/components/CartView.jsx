

export default function CartView({ cart, onRemove }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Your Cart</h2>

      {!cart.items.length ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <ul className="space-y-3">
          {cart.items.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
              <button
                onClick={() => onRemove(item._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 text-right font-bold text-emerald-700">
        Total: ${cart.total?.toFixed(2) || 0}
      </div>
    </div>
  );
}
