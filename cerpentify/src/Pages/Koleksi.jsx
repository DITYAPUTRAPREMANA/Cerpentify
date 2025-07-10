// Koleksi.jsx
import React, { useState, useEffect } from "react";
import BackgroundBlue from "../Component/Backgroundblue.jsx";
import Navbar from "../Component/Navbar.jsx";
import CardWhite from "../Component/Whitecard.jsx";
<<<<<<< HEAD
import FloatButton from "../Component/FloatingAdd.jsx";
import { db } from "../Firebase/firebase";
=======
import { db } from "../Firebase/firebase"; // Import db dari file firebase.js
>>>>>>> 1aa3aed73dfde182ce511c087e4f4e6146fd5c71
import { collection, getDocs } from "firebase/firestore";

export default function Koleksi() {
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
        <BackgroundBlue />
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
              justifyContent: "center",
              alignItems: "center",
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
      <div className="relative min-h-screen">
        <FloatButton />
        </div>
    </div>
  );
}
