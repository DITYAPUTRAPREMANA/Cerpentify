import React from "react";
import { useState, useRef, useEffect } from 'react';
import BackgroundBlue from "../Component/Backgroundblue.jsx";
import Navbar from "../Component/Navbar.jsx";
import FloatButton from "../Component/FloatingAdd.jsx";


export const Cerpen = () => {
    const [text, setText] = useState('');
    const textareaRef = useRef(null);
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
  
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
                <div class="w-270 bg-white rounded-xl py-8 px-50 shadow-md">
                    <h1 
                    class="text-5xl w-full font-bold p-3 pb-5 rounded-lg mb-4"
                    >Kancil dan Buaya</h1>
                    <div className="flex flex-wrap gap-2 pb-4">
                        <span
                            className="flex bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                            >
                                Horror
                        </span>
                        <span
                            className="flex bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                            >
                                Romantis
                        </span>
                        <span
                            className="flex bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                            >
                                Drama
                        </span>
                    </div>
                    <p className="text-indigo-700 pl-3 pb-5">Penulis: Manik Ambarawan | Tanggal Upload: 17 Agustus 1945</p>
                <p
                  class="w-full min-h-60 p-4 border border-gray-200 rounded-lg shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400 mb-6" 
                  
                >Suatu hari yang biasa; siang terang dan wanita berwajah penyok tengah keliling kampung sendiri saat anak-anak kecil sepulang sekolah itu mulai mengekori dan menyambut punggungnya di belakang.

                Maka, wanita berwajah penyok mengambil sebongkah batu. Tangannya yang dekil melemparkan batu itu ke arah anak-anak. Seorang anak bengal berkepala peyang terkena timpukannya. Membuat jidatnya terluka. Darah segar mengucur dari situ, mengubah seragam putihnya menjadi merah. Dia pulang ke rumah mengadu kepada ibunya, sementara anak-anak lain menjadi takut dan bubar satu-satu.

                Dengan terpaksa, keluarga wanita berwajah penyok akhirnya memutuskan untuk memasung dirinya pada sebuah ruangan kecil yang tak bisa disebut manusiawi dekat tanah pekuburan. Sejak itu wanita berwajah penyok tinggal di dalamnya. Bulan berganti tahun, tanpa tahu itu malam atau siang.

                Seperti apakah rasanya hidup dalam sepi? Tanyakan pertanyaan ini kepadanya. Maka, yakinlah jika dia bisa berkata-kata, dia akan melancarkan jawabannya. Tak ada yang benar benar tahu apa yang dia kerjakan di dalam sana walau kadang terdengar suaranya berteriak untuk berontak. Ini hanya menambah ngeri tanah pekuburan.

                Orang-orang mengira itu suara kuntilanak jejadian penghuni kuburan. Tak pernah ada orang yang benar-benar mendekat. Wanita berwajah penyok telah lupa bahasa tanpa ia pernah benar-benar menguasainya.

                Andaikata suatu saat dia bisa terbebas dari pasungnya, orang akan bertanya bagaimana ia bisa bertahan hidup? Sebab ia telah menjadi sendiri.

                Pada malam yang biasanya kelam nan pekat, kini wanita berwajah penyok bisa mendapat segaris cahaya dari celah lubang tadi. Kepalanya didongakkan ke atas, dia bisa melihat rembulan. Bertahun dia tidak melihat rembulan hingga ia lupa bahwa yang dilihatnya adalah rembulan.

                Untuk pertama kalinya dalam periode tahunan pasungnya, ia merasa bahwa dirinya punya teman. Dia mulai berkenalan. Dengan bahasa yang hanya ia mengerti, ia bercakap-cakap dengan bulan. Dia selalu menunggu teman barunya untuk berkunjung dan bercakap-cakap dengannya setiap malam.

                Namun, semakin hari bentuk wajah rembulan semakin sempit dan cekung. Mengecil dan terus mengecil hingga hanya menjadi sabit. Air muka rembulan juga semakin pasi.

                Semakin hari sabit rembulan jadi kembali membulat walaupun wajahnya masih pasi. Saat bulan bulat penuh, wanita berwajah penyok girang sekali sebab ini berarti dirinya berhasil menghibur teman baiknya. Tapi suatu hari rembulan kembali menyabit dan seperti yang sudah-sudah, wanita berwajah penyok tak pernah bosan menghiburnya dengan bahasanya sendiri hingga rembulan bulat penuh. Terus seperti itu.</p>
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
                        <button className="bg-[#857EE6] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#6f66d0] transition">
                            Upload Ulasan
                        </button>
                        </div>
                    )}
                    </div>
            <div className=" bg-white rounded-2xl shadow-md p-10 space-y-8 px-40">
                <p className="text-gray-400">1000 Review</p>
                {[  
                { name: "Manik", comment: "Jelek banget Babi" },
                { name: "Bangsat", comment: "Hidden talent, keep it hidden 11111" },
                { name: "Bangsat", comment: "hapus aj" }
                ].map((review, index) => (
                <div class="w-full bg-white rounded-xl border-2 border-indigo-300 py-4 px-8 shadow-lg">
                <div key={index} className="divide-x divide-indigo-400 w-270 flex items-start gap-4">
                    {/* Kolom Kiri: Rating dan Nama */}
                    <div className="flex flex-col pr-15 items-left min-w-[80px]">
                        <p className="text-sm text-gray-600 mt-1">oleh </p>
                        <p className="text-lg text-gray-600 mt-1">{review.name}</p>
                    </div>
                    {/* Kolom Kanan: Komentar */}
                    <div className="flex-1">
                    <p className="text-base text-gray-700 leading-relaxed">"{review.comment}"</p>
                    </div>
                </div>
                </div>
                ))}
            </div>
        </section>

      </div>
       <div className="relative min-h-screen">
        <FloatButton />
        </div>
    </div>
  )
}

