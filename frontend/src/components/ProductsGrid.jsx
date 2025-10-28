export default function ProductsGrid({ products, onAdd }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col"
        >
          <div className="aspect-square bg-gray-100 flex items-center justify-center rounded-md mb-3">
            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover rounded-md"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image</span>
            )}
          </div>
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-sm text-gray-500 flex-1">{p.description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="font-semibold text-emerald-600">
              ${p.price.toFixed(2)}
            </span>
            <button
              onClick={() => onAdd(p)}
              className="bg-emerald-500 text-white px-3 py-1.5 rounded hover:bg-emerald-600"
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
