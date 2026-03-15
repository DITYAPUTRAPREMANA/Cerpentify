/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BackgroundPattern from "../Component/Background.jsx";
import Navbar from "../Component/Navbar.jsx";
import CardWhite from "../Component/Whitecard.jsx";
import FloatButton from "../Component/FloatingAdd.jsx";
import { db } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";

export default function Dashboard() {
  const [cerpenList, setCerpenList] = useState([]);
  const [filteredCerpen, setFilteredCerpen] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fungsi untuk mengambil data cerpen dan kategori dari Firestore
const fetchCerpenData = async () => {
      try {
        // Ambil cerpen dari koleksi cerpen
        const cerpenCollection = collection(db, "cerpen");
        const cerpenSnapshot = await getDocs(cerpenCollection);
        const cerpenData = cerpenSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        

        // Ambil jumlah ulasan untuk setiap cerpen
        const cerpenWithUlasanCount = await Promise.all(
          cerpenData.map(async (cerpen) => {
            const ulasanQuery = query(
              collection(db, "ulasan"),
              where("cerpenID", "==", cerpen.id)
            );
            const ulasanSnapshot = await getDocs(ulasanQuery);
            return {
              ...cerpen,
              jumlahUlasan: ulasanSnapshot.size,
            };
          })
        );

        setCerpenList(cerpenWithUlasanCount);
        setFilteredCerpen(cerpenWithUlasanCount);

        // Ambil kategori dari koleksi categories
        const categoryCollection = collection(db, "categories");
        const categorySnapshot = await getDocs(categoryCollection);
        const categoryData = categorySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };




  // Fungsi untuk menangani pencarian cerpen berdasarkan judul dan kategori
  const handleSearch = (searchTerm, selectedCategory) => {
    let filtered = cerpenList;

    // Filter berdasarkan judul
    if (searchTerm) {
      filtered = filtered.filter(
        (cerpen) =>
          cerpen.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cerpen.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter berdasarkan kategori
    if (selectedCategory) {
      filtered = filtered.filter((cerpen) => cerpen.category === selectedCategory);
    }

    setFilteredCerpen(filtered); // Menampilkan hasil pencarian berdasarkan kategori dan judul
  };

  // Mengambil data cerpen ketika komponen pertama kali dimuat
  useEffect(() => {
    fetchCerpenData();
  }, []); // Hanya sekali saat mount

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Navbar onSearch={handleSearch} />
      <div className="fixed">
        <BackgroundPattern />
      </div>
      <div
        style={{
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
        {/* Render Cerpen berdasarkan hasil pencarian */}
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
            {filteredCerpen.slice(rowIdx * 5, rowIdx * 5 + 5).map((cerpen, cardIdx) => (
              <CardWhite
                key={cardIdx}
                id={cerpen.id}
                title={cerpen.title}
                author={cerpen.author}
                content={cerpen.content}
                category={cerpen.category}
                jumlahUlasan={cerpen.jumlahUlasan}
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
