import React from "react";

export default function ProductsGrid({ products, onAdd }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white rounded-lg shadow hover:shadow-lg p-4 flex flex-col"
        >
          <img
            src={p.images?.[0] || "https://via.placeholder.com/200"}
            alt={p.title}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
          <p className="text-gray-500 flex-1">{p.description?.slice(0, 60)}...</p>
          <div className="flex justify-between items-center mt-3">
            <span className="font-bold text-emerald-600">${p.price}</span>
            <button
              onClick={() => onAdd(p)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-md text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
