import React from "react";
import { useState, useRef, useEffect } from 'react';
import BackgroundBlue from "../Component/Backgroundblue.jsx";
import Navbar from "../Component/Navbar.jsx";
import CategoryDropdown from "../Component/TestDropdown.jsx";


const TambahCerpen = () => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Adjust height automatically
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to content height
    }
  }, [text]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <BackgroundBlue />
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100 }}>
        <Navbar />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "50px", position: "absolute", top: "5%", zIndex: 5, width: "100%", height: "auto", marginTop: "100px", boxSizing: "border-box" }}>
        <div style={{display:"flex", flexDirection: "column", gap:"10px", justifyContent: "center", alignItems: "center"}}>
            <p class="text-xs text-purple-500 uppercase tracking-wide">Upload Cerpen Kreasimu</p>
            <h1 class="text-3xl font-semibold text-gray-900">Upload Cerpen</h1>
            <p class="text-m pb-10 text-gray-600 mt-1">Kembangkan kreativitasmu dan terus berkreasi bersama cerpenify</p>{/* Form isi cerpern */}
            <div class="w-270 bg-white rounded-xl py-8 px-50 shadow-md">
                <input
                  maxLength={60}
                  type="text"
                  placeholder="Masukkan Judulmu"
                  class="text-3xl w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400"
                />
                <div className="mb-6 align-left"> <CategoryDropdown/> </div>
                <textarea id="cerpen" maxlength="2300" placeholder="Tuliskan cerpen terbaikmu!"
                  ref={textareaRef}
                  value = {text}
                  onChange={(e) => setText(e.target.value)}
                  class="w-full min-h-60 p-4 border border-gray-200 rounded-lg shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400 mb-6" 
                  style={{ overflow: "hidden", resize: "none" }}
                ></textarea>
                <div class="flex flex-row justify-between text-left">
                  <button class="bg-[#857EE6] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#6f66d0] transition">
                      Upload Cerpen
                  </button>
                  <p class="text-right text-sm text-gray-500 mt-1">
                      <span id="charCount">{text.length}</span><span>/2300</span>
                  </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default TambahCerpen