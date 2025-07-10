import React from "react";
import BackgroundBlue from "../Component/Backgroundblue.jsx";
import Navbar from "../Component/Navbar.jsx";
import CardWhite from "../Component/Whitecard.jsx";

export default function Koleksi() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <BackgroundBlue />
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100 }}>
        <Navbar />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "50px", position: "absolute", top: "5%", left: "50%", transform: "translate(-50%, 0)", zIndex: 5, width: "100%", height: "auto", marginTop: "100px", paddingLeft: "5vw", paddingRight: "5vw", boxSizing: "border-box" }}>
        {[...Array(2)].map((_, rowIdx) => (
          <div key={rowIdx} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "50px", width: "100%" }}>
            {[...Array(5)].map((_, cardIdx) => (
              <CardWhite key={cardIdx} />
            ))}
          </div>
        ))}
      </div>
      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-20 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center z-[200] border border-gray-200 hover:shadow-2xl transition duration-200 transform hover:scale-110 active:scale-95"
        style={{ boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)" }}
        aria-label="Tambah File"
      >
        <span className="relative flex items-center justify-center w-full h-full">
          {/* File Icon */}
          <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 48 48">
            <rect x="12" y="10" width="24" height="28" rx="6" fill="currentColor" />
            <rect x="18" y="16" width="12" height="2.5" rx="1" fill="#fff" />
            <rect x="18" y="22" width="12" height="2.5" rx="1" fill="#fff" />
            <rect x="18" y="28" width="8" height="2.5" rx="1" fill="#fff" />
          </svg>
          {/* Plus Icon */}
          <span className="absolute bottom-2 right-2 bg-white rounded-full border border-gray-200 w-7 h-7 flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 5v10M5 10h10" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </span>
      </button>
    </div>
  );
}
