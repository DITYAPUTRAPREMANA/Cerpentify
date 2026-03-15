/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useRef, useEffect } from 'react';
import BackgroundBlue from "../Component/Backgroundblue.jsx";
import Navbar from "../Component/Navbar.jsx";
import FloatButton from "../Component/FloatingAdd.jsx";
import { db } from "../Firebase/firebase";
import { useAuth } from '../Firebase/authContext';
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { Timestamp } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { updateDoc, doc as firestoreDoc, arrayUnion } from "firebase/firestore";




export const Cerpen = () => {
    const [text, setText] = useState('');
    const textareaRef = useRef(null);
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [jumlahUlasan, setJumlahUlasan] = useState(0);
    const { currentUser, userProfile } = useAuth();

    const { id } = useParams(); 
    const [cerpen, setCerpen] = useState(null);

    const fetchReviewsByCerpenId = async (cerpenId) => {
    try {
        const reviewQuery = query(
        collection(db, "ulasan"),
        where("cerpenID", "==", cerpenId)
        );
        const reviewSnapshot = await getDocs(reviewQuery);
        setJumlahUlasan(reviewSnapshot.size);
        const reviewData = reviewSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
        }));
        setReviews(reviewData);
    } catch (error) {
        console.error("Gagal mengambil ulasan:", error);
    }
    };
        useEffect(() => {
        const fetchCerpenById = async () => {
        try {
            const cerpenRef = doc(db, "cerpen", id);
            const cerpenSnap = await getDoc(cerpenRef);
            if (cerpenSnap.exists()) {
            const data = cerpenSnap.data();
            let scraped_at;

            if (data.scraped_at && typeof data.scraped_at.toDate === "function") {
            scraped_at = data.scraped_at.toDate();
            } else if (typeof data.scraped_at === "string" || typeof data.scraped_at === "number") {
            scraped_at = new Date(data.scraped_at);
            } else {
            scraped_at = null;
            }

            setCerpen({ id: cerpenSnap.id, tanggal: scraped_at?.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }) || "Tanggal tidak tersedia", ...cerpenSnap.data() });
            } else {
            console.log("Cerpen tidak ditemukan");
            }
            fetchReviewsByCerpenId(cerpenSnap.id);
            
        } catch (error) {
            console.error("Gagal mengambil cerpen:", error);
            }
        };

        fetchCerpenById();
    }, [id]);


    const handleUploadUlasan = async () => {
        if (!text.trim()) return; // validasi kosong
        if (!currentUser) {
            alert("Kamu harus login untuk memberi ulasan.");
            return;
        }

        try {
            const newUlasan = {
            cerpenID: cerpen.id,               // id cerpen dari halaman yang sedang dibuka
            konten_komen: text.trim(),
            userID: currentUser.uid,
            username_ulas: userProfile?.username || "Anonim",           // dari auth
            };
            await addDoc(collection(db, "ulasan"), newUlasan);

            // Kosongkan textarea
            setText("");

            // Refresh list ulasan (kalau perlu panggil fetchReviewsByCerpenId)
            fetchReviewsByCerpenId(cerpen.id);

        } catch (error) {
            console.error("Gagal upload ulasan:", error);
            alert("Terjadi kesalahan saat mengupload ulasan.");
        }
        };

        const handleAddToCollection = async () => {
            if (!currentUser) {
                alert("Kamu harus login untuk menambahkan ke koleksi.");
                return;
            }

            try {
                const userRef = firestoreDoc(db, "users", currentUser.uid);
                await updateDoc(userRef, {
                liked_cn: arrayUnion(cerpen.id),
                });
                alert("Berhasil ditambahkan ke koleksimu!");
            } catch (error) {
                console.error("Gagal menambahkan ke koleksi:", error);
                alert("Terjadi kesalahan saat menambahkan ke koleksi.");
            }
            };

  
    // Adjust height automatically
    useEffect(() => {
        const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = "auto"; // Reset height
                textarea.style.height = `${textarea.scrollHeight}px`; // Set to content height
            }
        }, [text]);

        if (!cerpen) {
    return <p className="text-center mt-20">Memuat cerpen...</p>;
        }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <BackgroundBlue />
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100 }}>
        <Navbar />
      </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "50px", position: "absolute", top: "5%", zIndex: 5, width: "100%", height: "auto", marginTop: "100px", boxSizing: "border-box" }}>
            <div style={{display:"flex", flexDirection: "column", gap:"10px", justifyContent: "center", alignItems: "center"}}>
                <div class="w-270 bg-white rounded-xl py-8 px-50 shadow-md">
                    <h1 
                    class="text-5xl w-full font-bold p-3 pb-5 rounded-lg mb-4"
                    >{cerpen.title}</h1>

                    <div className="flex flex-wrap gap-2 pb-4">
                        <span
                            className="flex bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                            >
                                {cerpen.category}
                        </span>
                       
                    </div>
                    <p className="text-indigo-700 pl-3 pb-5">Penulis: {cerpen.author} | Tanggal Upload: {cerpen.tanggal}</p>
                    <button
                        onClick={handleAddToCollection}
                        className="bg-[#857EE6] text-white px-6 py-2 mb-6 rounded-full shadow-md hover:bg-[#6f66d0] transition"
                        >
                        Masukkan ke Koleksiku
                    </button>
                <p
                  class="w-full min-h-60 p-4 border border-gray-200 rounded-lg shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400 mb-6" 
                  
                >{cerpen.content}</p>
          </div>
        </div>
        <section className="w-270 mx-auto px-4 py-1">
            <h2 className="text-3xl text-center font-bold text-gray-800 mb-6"> Ulasan & Rating</h2>
            <div className="w-200 h-full bg-white p-4 mb-5 border border-gray-200 rounded-4xl shadow-md mx-auto">
                    <input
                        id="ulasan"
                        placeholder="Tinggalkan ulasan!"
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-6 mb-0 p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400"
                        style={{ overflow: "hidden", resize: "none" }}
                    ></input>

                    {/* Tombol hanya muncul jika sedang mengetik */}
                    {text.trim() !== "" && (
                        <div className="flex justify-end mt-4">
                        <button onClick={handleUploadUlasan} className="bg-[#857EE6] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#6f66d0] transition">
                            Upload Ulasan
                        </button>
                        </div>
                    )}
                    </div>
            <div className=" bg-white rounded-2xl shadow-md p-10 space-y-8 px-40">
                <p className="text-gray-400">{jumlahUlasan} ulasan</p>
                {reviews.length > 0 ? (
                reviews.map((ulasan, index) => (
                    <div key={ulasan.id || index} className="w-full bg-white rounded-xl border-2 border-indigo-300 py-4 px-8 shadow-lg">
                    <div className="divide-x divide-indigo-400 w-270 flex items-start gap-4">
                        {/* Kolom Kiri: Rating dan Nama */}
                        <div className="flex flex-col pr-15 items-left min-w-[80px]">
                        <p className="text-sm text-gray-600 mt-1">oleh </p>
                        <p className="text-lg text-gray-600 mt-1">{ulasan.username_ulas}</p>
                        </div>
                        {/* Kolom Kanan: Komentar */}
                        <div className="flex-1 pl-4">
                        <p className="text-base text-gray-700 leading-relaxed">"{ulasan.konten_komen}"</p>
                        </div>
                    </div>
                    </div>
                ))
                ) : (
                <p className="text-center text-gray-500">Belum ada ulasan.</p>
                )}

            </div>
        </section>
      </div>
      <div className="relative min-h-screen">
        <FloatButton />
      </div>
    </div>
  );
};
