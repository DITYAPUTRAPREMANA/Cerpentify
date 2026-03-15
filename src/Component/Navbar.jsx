import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import Profil from "./Profil.jsx";
import { db } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";  // Import useLocation untuk mengecek URL

const Navbar = ({ onSearch }) => {
  const [showProfil, setShowProfil] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();  // Mendapatkan lokasi halaman saat ini

  const toggleProfil = () => {
    setShowProfil(!showProfil);
  };

  // Mengambil kategori dari Firestore
  const fetchCategories = async () => {
    try {
      const cerpenCollection = collection(db, "cerpen");
      const cerpenSnapshot = await getDocs(cerpenCollection);
      const categorySet = new Set();

      cerpenSnapshot.docs.forEach((doc) => {
        const category = doc.data().category;
        if (category) categorySet.add(category);
      });

      setCategories(Array.from(categorySet));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value, selectedCategory); // Kirimkan search term berdasarkan judul ke Dashboard
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onSearch(searchTerm, event.target.value); // Kirimkan kategori yang dipilih ke Dashboard
  };

  // Mengecek apakah kita sedang berada di halaman Dashboard atau Koleksi
  const isDashboardOrKoleksiPage = location.pathname === "/dashboard" || location.pathname === "/koleksi" || location.pathname === "/cerpenku" ;

  return (
    <>
      <nav className="flex justify-between items-center p-5 bg-white/70 backdrop-blur-lg mx-auto max-w-7xl shadow-lg rounded-[50px] mt-6 z-50 fixed top-0 left-0 right-0">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-7 w-auto" />
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8">
          <a
            href="/dashboard"
            className="text-gray-800 text-lg font-medium hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Beranda
          </a>
          <a
            href="/koleksi"
            className="text-gray-800 text-lg font-medium hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Koleksi
          </a>
          <a
            href="/kontak"
            className="text-gray-800 text-lg font-medium hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Kontak
          </a>
          <a
            href="/cerpenku"
            className="text-gray-800 text-lg font-medium hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cerpenku
          </a>
        </div>

        {/* Search and Account Section */}
        <div className="flex items-center gap-6">
          {/* Category Dropdown */}
          {isDashboardOrKoleksiPage && (  // Menampilkan kategori hanya di Dashboard dan Koleksi
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-3 py-2 text-sm rounded-[100px] bg-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 transform"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category, idx) => (
                <option key={idx} value={category}>{category}</option>
              ))}
            </select>
          )}

          {/* Search Bar */}
          {isDashboardOrKoleksiPage && (  // Menampilkan search bar hanya di Dashboard dan Koleksi
            <div className="flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Cari Cerpen"
                className="px-3 py-2 text-sm rounded-[100px] w-[200px] bg-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 transform"
              />
            </div>
          )}

          {/* Language and Account */}
          <div className="flex items-center gap-4">
            <span className="text-red-500 text-sm">IDN</span>
            <button 
              onClick={toggleProfil}
              className="px-4 py-2 text-sm bg-gray-300 rounded-[100px] hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Akun
            </button>
          </div>
        </div>
      </nav>

      {showProfil && (
        <Profil onClose={() => setShowProfil(false)} />
      )}
    </>
  );
};

export default Navbar;
