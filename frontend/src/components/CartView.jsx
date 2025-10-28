export default function CartView({ cart, onRemove }) {
  const items = cart.items || [];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">Cart is empty</p>
      ) : (
        <ul className="divide-y">
          {items.map((it) => (
            <li key={it._id} className="flex justify-between py-2 items-center">
              <div>
                <div className="font-medium">{it.product.name}</div>
                <div className="text-sm text-gray-500">
                  ${it.product.price} × {it.qty}
                </div>
              </div>
              <button
                onClick={() => onRemove(it._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="text-right mt-3 font-semibold text-emerald-600">
        Total: ${cart.total?.toFixed(2)}
      </div>
    </div>
  );
}
