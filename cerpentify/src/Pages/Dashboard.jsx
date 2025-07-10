// Dashboard.jsx
import React, { useState, useEffect } from "react";
import BackgroundPattern from "../Component/Background.jsx";
import Navbar from "../Component/Navbar.jsx";
import CardWhite from "../Component/Whitecard.jsx";
import { db } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [cerpenList, setCerpenList] = useState([]);

  // Fungsi untuk mengambil data cerpen di Firestore
  const fetchCerpenData = async () => {
    try {
      const cerpenCollection = collection(db, "cerpen");
      const cerpenSnapshot = await getDocs(cerpenCollection);
      const cerpenData = cerpenSnapshot.docs.map((doc) => ({
        id: doc.id,  // Menambahkan id dokumen ke data
        ...doc.data(),  // Menambahkan data dokumen
      }));
      setCerpenList(cerpenData);  // Menyimpan data cerpen beserta id ke state
    } catch (error) {
      console.error("Error fetching cerpen data:", error);
    }
  };

  // Mengambil data cerpen ketika komponen pertama kali dimuat
  useEffect(() => {
    fetchCerpenData();
  }, []); // Empty dependency array berarti hanya sekali ketika pertama kali mount

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div className="fixed">
        <BackgroundPattern />
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
        }}
      >
        <Navbar />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translate(-50%, 0)",
          zIndex: 5,
          width: "100%",
          height: "auto",
          marginTop: "100px",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          boxSizing: "border-box",
        }}
      >
        {/* Render Cerpen Data */}
        {[...Array(4)].map((_, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: "flex",
              justifyContent: "center", // Untuk menyejajarkan kartu di tengah
              alignItems: "center", // Untuk menyejajarkan kartu secara vertikal
              gap: "50px",
              width: "100%",
            }}
          >
            {cerpenList.slice(rowIdx * 5, rowIdx * 5 + 5).map((cerpen, cardIdx) => (
              <CardWhite
                key={cardIdx}
                id={cerpen.id}  // Menyertakan id sebagai prop
                title={cerpen.title}
                author={cerpen.author}
                content={cerpen.content}
              />
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
