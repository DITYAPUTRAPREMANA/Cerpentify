/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BackgroundPattern from "../Component/Background.jsx";
import Navbar from "../Component/Navbar.jsx";
import CardWhite from "../Component/Whitecard.jsx";
import FloatButton from "../Component/FloatingAdd.jsx";
import { db } from "../Firebase/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { useAuth } from "../Firebase/authContext.jsx";
import { doc, getDoc  } from "firebase/firestore";


export default function Cerpenku() {
const { currentUser } = useAuth();
const [cerpenList, setCerpenList] = useState([]);
const [filteredCerpen, setFilteredCerpen] = useState([]);
const [categories, setCategories] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");

// Ambil cerpen yang ada di liked_cn user
const fetchCerpenData = async () => {
  try {
    if (!currentUser) return;

    // Ambil liked_cn dari dokumen user
    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    const likedCn = userSnap.exists() ? userSnap.data().cerpenku || [] : [];

    // Ambil semua cerpen
    const cerpenCollection = collection(db, "cerpen");
    const cerpenSnapshot = await getDocs(cerpenCollection);
    const cerpenData = cerpenSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Filter hanya cerpen yang masuk koleksi user
    const koleksiCerpen = cerpenData.filter((cerpen) => likedCn.includes(cerpen.id));

    // Hitung jumlah ulasan tiap cerpen
    const cerpenWithUlasanCount = await Promise.all(
      koleksiCerpen.map(async (cerpen) => {
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

    // Ambil semua kategori yang muncul dalam koleksi user
    const categorySet = new Set();
    koleksiCerpen.forEach((cerpen) => {
      if (cerpen.category) categorySet.add(cerpen.category);
    });
    setCategories(Array.from(categorySet));
  } catch (error) {
    console.error("Error fetching koleksi data:", error);
  }
};

// Filter berdasarkan search term dan kategori
const handleSearch = (search, category) => {
  let filtered = cerpenList;

  if (search) {
    filtered = filtered.filter(
      (cerpen) =>
        cerpen.title.toLowerCase().includes(search.toLowerCase()) ||
        cerpen.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter((cerpen) => cerpen.category === category);
  }

  setFilteredCerpen(filtered);
};

// Ambil koleksi cerpen saat komponen mount
useEffect(() => {
  if (currentUser) {
    fetchCerpenData();
  }
}, [currentUser]);

// Update filteredCerpen saat filter berubah
useEffect(() => {
  handleSearch(searchTerm, selectedCategory);
}, [searchTerm, selectedCategory, cerpenList]);

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
