import React, { useEffect, useState } from "react";
import BackgroundPattern from "../Component/Background.jsx";
import NavbarLanding from "../Component/NavbarLanding.jsx";
import BackgroundBlue from "../Component/Backgroundblue.jsx";

const animatedWords = [
  "Cerita Pendek",
  "Cerpen Romantis",
  "Cerpen Dongeng",
  "Cerpen Inspiratif",
  "Cerpen Fabel Lucu",
  "Cerpen Misteri",
  "Cerpen  Petualangan",
  "Cerpen Motivasi",
];

function useTypewriter(words, typingSpeed = 60 , pause = 1200) {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let timeout;
    const currentWord = words[wordIdx];
    if (!isDeleting) {
      if (displayed.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pause);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length - 1));
        }, typingSpeed / 1.5);
      } else {
        setIsDeleting(false);
        setWordIdx((idx) => (idx + 1) % words.length);
      }
    }
    setWidth(currentWord.length);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIdx, words, typingSpeed, pause]);

  return {displayed, width, isDeleting};
}

export default function Landing() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const {displayed, width, isDeleting} = useTypewriter(animatedWords, 60, 1200);

  return (
    <div style={{ position: "relative", width: "100vw", minHeight: "100vh" }}>
      <BackgroundPattern />
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100 }}>
        <NavbarLanding />
      </div>
      {/* Gabungan Hero + Fitur */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center pt-15 pb-20">
        {/* Hero */}
        <span
          className="inline-block mb-4 px-4 py-1 rounded-full bg-pink-100 text-pink-400 text-xs font-semibold border border-pink-200 cursor-pointer transition-all duration-300 hover:bg-pink-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-300"
          tabIndex={0}
        >
          Website Kumpulan Cerpen Terbaik
        </span>
        <div
          className={`flex flex-col justify-center items-center w-full transition-all duration-500`}
          style={{ minHeight: '7.5rem' }}
        >
          <h1
            className={`text-4xl md:text-5xl text-center font-medium mb-4 leading-tight transition-all duration-700 ${animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            style={{ fontSize: '4rem', transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)', width: `calc(${width + 18}ch)` }}
          >
            Jelajahi Dunia{' '}
            <span
              className={`inline-block text-[#EFACA7] border-r-2 border-[#EFACA7] animate-pulse transition-all duration-300 ${isDeleting ? 'blur-sm opacity-60' : 'blur-0 opacity-100'}`}
              style={{ minWidth: '10ch', fontFamily: 'inherit', fontWeight: 500 }}
            >
              {displayed}
            </span>{' '}
            di
            <br />
            <span className=""style={{ color: "#7F81C8" }}>Cerpentify</span>!
          </h1>
        </div>
        <p
          className={`text-base md:text-md text-gray-700 text-center mb-8 max-w-xl mx-auto transition-all duration-700 delay-100 ${animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          Baca, bagikan, dan temukan cerita pendek terbaik dari penulis berbakat. Mulai petualangan literasi Anda sekarang – gratis, instan, dan penuh inspirasi!
        </p>
        <div className={`flex flex-col md:flex-row gap-4 justify-center transition-all duration-700 delay-200 ${animate ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
          <a
            href="/koleksi"
            className="inline-flex items-center justify-center px-7 py-3 bg-black text-white text-base font-semibold rounded-full shadow-lg hover:bg-gray-900 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-black"
            tabIndex={0}
          >
            Mulai Membaca Gratis
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a
            href="/register"
            className="inline-flex items-center justify-center px-7 py-3 border-2 border-black text-black text-base font-semibold rounded-full bg-white hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-black"
            tabIndex={0}
          >
            Daftar Akun
          </a>
        </div>
        </section>
        <section id="fiturutama" className="relative overflow-hidden py-70">
          <BackgroundBlue />
          {/* Fitur Unggulan */}
          <div className="w-full max-w-6xl px-4 mx-auto mt-10 relative z-10">
            <h2 className="text-2xl md:text-4xl font-semibold mb-2 text-gray-900 text-center">Apa yang Bisa Kamu Lakukan di Cerpenify?</h2>
            <p className="text-gray-600 mb-10 text-center">Di Cerpenify kalian bisa melakukan berbagai hal untuk menelusuri cerpen lho!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer">
                <div className="text-2xl">🔍</div>
                <h3 className="font-bold text-lg text-gray-900">Cerdas & Cepat</h3>
                <p className="text-gray-600 text-sm">Temukan cerpen favoritmu dalam 3 klik! Cari berdasarkan judul, kategori, atau kata kunci. Sistem rekomendasi kami akan membantumu menemukan cerita yang sesuai selera.</p>
                <div className="flex gap-1 mt-2">{[...Array(5)].map((_,i)=>(<span key={i} className="text-blue-400">★</span>))}</div>
              </div>
              {/* Card 2 */}
              <div className="bg-[#AEB8FF] rounded-2xl shadow p-6 flex flex-col gap-3 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer">
                <div className="text-2xl">📚</div>
                <h3 className="font-bold text-lg text-white">Kategori Berlimpah</h3>
                <p className="text-white text-sm">Pilih dari 15+ genre: Horor, Romantis, Fantasi, Misteri, hingga Cerpen Anak. Update kategori setiap minggu.</p>
                <div className="flex gap-1 mt-2">{[...Array(5)].map((_,i)=>(<span key={i} className="text-white">★</span>))}</div>
              </div>
              {/* Card 3 */}
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer">
                <div className="text-2xl">🥗</div>
                <h3 className="font-bold text-lg text-gray-900">Unggah & Bagikan</h3>
                <p className="text-gray-600 text-sm">Punya cerita untuk dibagikan? Unggah karyamu dalam 2 langkah! Dapatkan feedback langsung dari pembaca melalui rating dan komentar.</p>
                <div className="flex gap-1 mt-2">{[...Array(5)].map((_,i)=>(<span key={i} className="text-blue-400">★</span>))}</div>
              </div>
            </div>
          </div>
        </section>
        {/* New Section */}
        <section className="w-full bg-[#18181B] flex justify-center items-center relative py-40 px-4">
          <div className="max-w-5xl w-full bg-[#7F81C8] rounded-3xl p-10 md:p-16 text-center shadow-lg relative z-10 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95">
            {/* Zigzag SVG Dekoratif */}
            <svg className="absolute top-0 left-0 w-full h-full z-0" viewBox="0 0 900 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 60 Q 150 120 300 60 T 600 60 T 900 60" stroke="#F6C7A2" strokeWidth="8" fill="none"/>
              <path d="M0 220 Q 150 160 300 220 T 600 220 T 900 220" stroke="#B3B6F7" strokeWidth="60" fill="none" opacity="0.18"/>
            </svg>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Cerpenify: Di Mana Setiap Cerita<br className="hidden md:block" />Menemukan Pembacanya
              </h2>
              <p className="text-base md:text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
                Memberdayakan penulis melalui teknologi, melestarikan budaya baca, dan menciptakan ekosistem sastra yang berkelanjutan.
              </p>
              <a
                href="/koleksi"
                className="inline-flex items-center px-8 py-3 bg-white text-[#7F81C8] text-base font-semibold rounded-full shadow-md hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Mulai Membaca Gratis
                <svg className="ml-2 w-5 h-5" fill="none" stroke="#7F81C8" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </section>
    </div>
  );
}