import React from "react";
import { Link } from "react-router-dom";

export default function CardWhite() {
  return (
    <Link to="/cerpen">
      <div
        className="max-w-sm p-6 bg-white rounded-2xl shadow-md space-y-4 cursor-pointer transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
      >
        {/* Judul */}
        <h2 className="text-xl font-semibold text-gray-800">cerpen 3</h2>

        {/* Deskripsi */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Sudah lebih satu setengah tahun ia merasa kesepian setiap malam
          menjemputnya. Kesunyian dan keheningan hanya itu yang ia rasakan.
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex text-purple-400 text-xl space-x-1">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <span className="text-sm text-purple-600 border border-purple-300 px-3 py-1 rounded-full">
            1056 Reviews
          </span>
        </div>

        {/* Penulis */}
        <div className="flex items-center space-x-3 pt-2">
          <div className="bg-gray-100 p-2 rounded-full">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0v0a4 4 0 00-8 0M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Jane Copper</p>
            <p className="text-xs text-gray-500">Penulis</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
