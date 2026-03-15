// Handle category selectionimport React from "react";
import { useState, useRef, useEffect } from 'react';
import { collection, setDoc, doc, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '../Firebase/authContext';
import { db } from '../Firebase/firebase';
import BackgroundBlue from "../Component/Backgroundblue.jsx";
import Navbar from "../Component/Navbar.jsx";

const TambahCerpen = () => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, userProfile } = useAuth();
  const textareaRef = useRef(null);

  // Set user when auth state changes
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const snapshot = await getDocs(categoriesRef);
        const categoriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Adjust height automatically
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  // Get next cerpen ID by checking all document IDs
  const getNextCerpenId = async () => {
    try {
      const cerpenRef = collection(db, 'cerpen');
      const snapshot = await getDocs(cerpenRef);
      
      if (snapshot.empty) {
        return 'cn1';
      }
      
      // Get all document IDs and find the highest number
      const docIds = snapshot.docs.map(doc => doc.id);
      const cnIds = docIds.filter(id => id.startsWith('cn'));
      
      if (cnIds.length === 0) {
        return 'cn1';
      }
      
      // Extract numbers from IDs like 'cn280', 'cn281', etc.
      const numbers = cnIds.map(id => parseInt(id.replace('cn', ''))).filter(num => !isNaN(num));
      const maxNumber = Math.max(...numbers);
      const nextNumber = maxNumber + 1;
      
      return `cn${nextNumber}`;
    } catch (error) {
      console.error('Error getting next ID:', error);
      return 'cn1';
    }
  };

  // Update user's cerpenku array
  const updateUserCerpenku = async (userId, cerpenId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        cerpenku: arrayUnion(cerpenId),
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Error updating user cerpenku:', error);
      return false;
    }
  };
  const handleCategoryChange = (categoryName, categoryId) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryId);
  };

  // Validate form
  const validateForm = () => {
    if (!title.trim()) {
      alert('Judul cerpen harus diisi!');
      return false;
    }
    if (!selectedCategory) {
      alert('Kategori harus dipilih!');
      return false;
    }
    if (!text.trim()) {
      alert('Isi cerpen harus diisi!');
      return false;
    }
    if (!user) {
      alert('Anda harus login terlebih dahulu!');
      return false;
    }
    return true;
  };

  // Handle upload cerpen
  const handleUpload = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const nextId = await getNextCerpenId();
      const timestamp = new Date().toISOString();
      
      const cerpenData = {
        id: nextId,
        title: title.trim(),
        author: userProfile?.username || currentUser?.displayName || currentUser?.email,
        category: selectedCategory,
        category_id: selectedCategoryId,
        content: text.trim(),
        scraped_at: timestamp,
        url: `cerpen/${nextId}`
      };

      // Use setDoc with specific document ID instead of addDoc
      await setDoc(doc(db, 'cerpen', nextId), cerpenData);
      
      // Update user's cerpenku array
      const updateSuccess = await updateUserCerpenku(currentUser.uid, nextId);
      if (!updateSuccess) {
        console.warn('Failed to update user cerpenku array');
      }
      
      // Reset form
      setTitle('');
      setText('');
      setSelectedCategory('');
      setSelectedCategoryId('');
      
      alert('Cerpen berhasil diupload!');
    } catch (error) {
      console.error('Error uploading cerpen:', error);
      alert('Terjadi kesalahan saat mengupload cerpen!');
    } finally {
      setLoading(false);
    }
  };

  // Show loading if auth is loading
  if (!currentUser && !user) {
    return (
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <BackgroundBlue />
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100 }}>
          <Navbar />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 5 }}>
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Akses Ditolak</h1>
          <p className="text-gray-600">Silakan login terlebih dahulu untuk mengupload cerpen.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <BackgroundBlue />  
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100 }}>
        <Navbar />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "50px", position: "absolute", top: "5%", zIndex: 5, width: "100%", height: "auto", marginTop: "100px", boxSizing: "border-box" }}>
        <div style={{display:"flex", flexDirection: "column", gap:"10px", justifyContent: "center", alignItems: "center"}}>
            <p className="text-xs text-purple-500 uppercase tracking-wide">Upload Cerpen Kreasimu</p>
            <h1 className="text-3xl font-semibold text-gray-900">Upload Cerpen</h1>
            <p className="text-m pb-10 text-gray-600 mt-1">Kembangkan kreativitasmu dan terus berkreasi bersama cerpenify</p>
            
            <div className="w-270 bg-white rounded-xl py-8 px-50 shadow-md">
                <input
                  maxLength={60}
                  type="text"
                  placeholder="Masukkan Judulmu"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-3xl w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400"
                />
                
                <div className="mb-6 align-left">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      const selectedOption = categories.find(cat => cat.name === e.target.value);
                      if (selectedOption) {
                        handleCategoryChange(selectedOption.name, selectedOption.id);
                      }
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <textarea 
                  id="cerpen" 
                  maxLength="2300" 
                  placeholder="Tuliskan cerpen terbaikmu!"
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full min-h-60 p-4 border border-gray-200 rounded-lg shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400 mb-6" 
                  style={{ overflow: "hidden", resize: "none" }}
                ></textarea>
                
                <div className="flex flex-row justify-between text-left">
                  <button 
                    onClick={handleUpload}
                    disabled={loading}
                    className={`${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#857EE6] hover:bg-[#6f66d0]'} text-white px-6 py-2 rounded-full shadow-md transition`}
                  >
                      {loading ? 'Mengupload...' : 'Upload Cerpen'}
                  </button>
                  <p className="text-right text-sm text-gray-500 mt-1">
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