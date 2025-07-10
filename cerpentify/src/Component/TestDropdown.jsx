import React, { useState } from "react";

export default function CategoryDropdown() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ["Horor", "Romantis", "Komedi", "Drama", "Petualangan"];

  const toggleCategory = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const removeCategory = (categoryToRemove) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== categoryToRemove));
  };

  return (
    <div className="j w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
      </label>

      <select
        className="w-37 border border-purple-300 rounded-3xl p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onChange={(e) => toggleCategory(e.target.value)}
        value="" // prevent auto-selecting
      >
        <option value="" disabled>
          Pilih Kategori
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((category, index) => (
          <span
            key={index}
            className="flex bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
          >
            {category}
            <button
              type="button"
              className="ml-2 text-indigo-500 hover:text-indigo-700"
              onClick={() => removeCategory(category)}
              aria-label={`Remove ${category}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
