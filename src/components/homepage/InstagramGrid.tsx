import React from "react";

const InstagramGrid: React.FC = () => {
  const items = new Array(6).fill(0);

  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 py-12">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900">Nativa en Instagram</h3>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {items.map((_, idx) => (
          <div
            key={idx}
            className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square group"
          >
            <div className="w-full h-full bg-[linear-gradient(180deg,#f3f4f6, #e5e7eb)] flex items-center justify-center">
              <div className="text-gray-400">Imagen {idx + 1}</div>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
            <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-white/80 rounded-full p-1">
              {/* Placeholder for icon */}
              <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0122 9.618V17a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h11" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramGrid;

