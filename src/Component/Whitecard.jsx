import React from "react";
import { useNavigate } from "react-router-dom";

const getShortContent = (text, maxChars = 120) => {
  if (!text) return "";

  // Hilangkan karakter spesial jika perlu
  const cleanText = text.replace(/[^\w\s.,!?'"()\-]/g, "");

  // Jika teks lebih pendek dari batas, tampilkan apa adanya
  if (cleanText.length <= maxChars) {
    return cleanText;
  }

  // Potong hingga batas karakter, lalu tambahkan "..."
  return cleanText.slice(0, maxChars).trim() + "...";
};

const getShortTitle = (title, minWords = 2, maxWords = 3) => {
  if (!title || typeof title !== "string") return "";

  const cleanTitle = title.replace(/[^\w\s]/g, "");
  const words = cleanTitle.trim().split(/\s+/); // hindari split kosong

  if (words.length <= maxWords) {
    return title;
  }

  return words.slice(0, Math.max(minWords, maxWords)).join(" ") + "..."; 
};

const getShortWriter = (title, minWords = 1, maxWords = 2) => {
  const cleanTitle = title.replace(/[^\w\s]/g, "");
  const words = cleanTitle.split(" ");

  if (words.length <= maxWords) {
    return title; 
  }

  return words.slice(0, Math.max(minWords, maxWords)).join(" ") + "..."; 
};

export default function CardWhite({ id, title, author, content, category, jumlahUlasan}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/cerpen/${id}`); // Navigate to the cerpen page with the id
  };

  return (
    <div
      className="max-w-xs w-75 h-82 p-9 mb-10 bg-white rounded-2xl shadow-md space-y-1 cursor-pointer transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
      onClick={handleCardClick}
    >
      {/* Judul */}
      <h2 className="text-xl font-semibold text-gray-800 break-words whitespace-nowrap overflow-hidden text-ellipsis">{getShortTitle(title)}</h2> {/* Menampilkan title yang sudah dipotong */}

      {/* Kategori Cerpen */}
      <p className="text-sm text-indigo-700">{getShortTitle(category)}</p>

      {/* Deskripsi */}
      <p className="text-sm pt-2 mb-10 text-gray-600 leading-relaxed break-word word-break overflow-hidden text-ellipsis h-24">{getShortContent(content)}</p> {/* Menampilkan konten yang sudah dipotong */}

      {/* Rating */}
      <span className="text-sm  text-purple-600 border border-purple-300 px-3 py-1 rounded-full">
        {jumlahUlasan} Ulasan
      </span>

      {/* Penulis */}
      <div className="flex items-center pt-4 space-x-3">
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
          <p className="text-sm break-words whitespace-nowrap overflow-wrap text-ellipsis font-semibold text-gray-800">{getShortWriter(author)}</p>
          <p className="text-xs text-gray-500">Penulis</p>
        </div>
      </div>
    </div>
  );
}