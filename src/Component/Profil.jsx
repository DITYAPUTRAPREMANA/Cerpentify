import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiEye } from "react-icons/pi";
import { PiEyeClosed } from "react-icons/pi";
import { useAuth } from '../Firebase/authContext.jsx';

const Profil = ({ onClose }) => {
  const { currentUser, userProfile, updateUserProfile, updateUserPassword, logout } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: 18
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      // Ambil data dari currentUser dan userProfile setelah login
      setFormData({
        username: userProfile?.username || currentUser.displayName || '', // username bisa dari userProfile atau currentUser
        email: userProfile?.email || '', // email langsung dari currentUser
        password: '', // Password kosong pada awalnya, user bisa mengubahnya jika diinginkan
        age: userProfile?.age || 18 // Ambil usia dari userProfile atau default 18
      });
    }
  }, [currentUser, userProfile]); // Pastikan effect dijalankan setiap kali currentUser atau userProfile berubah

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAgeChange = (increment) => {
    setFormData(prev => ({
      ...prev,
      age: increment ? prev.age + 1 : Math.max(1, prev.age - 1)
    }));
  };

  const handleSave = async () => {
    try {
      setError('');
      setLoading(true);
      
      // Update profile data
      await updateUserProfile(currentUser.uid, {
        username: formData.username,
        email: formData.email,
        age: formData.age
      });
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Gagal menyimpan perubahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!formData.password) {
      setError('Password tidak boleh kosong');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await updateUserPassword(formData.password);
      setFormData(prev => ({ ...prev, password: '' }));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Gagal mengubah password. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Pengaturan Profil</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        
        {showSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">Profil berhasil diperbarui!</p>
          </div>
        )}
        
        {/* Menambahkan counter Cerpenku dan Koleksiku */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium">Cerpenku: {userProfile?.cerpenku?.length || 0}</p>
          <p className="text-gray-700 font-medium">Koleksiku: {userProfile?.liked_cn?.length || 0}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-gray-700 font-medium mb-3">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Masukkan username"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-3">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Masukkan email"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-3">Umur</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleAgeChange(false)}
                className="w-10 h-10 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-center font-medium">
                {formData.age} tahun
              </div>
              <button
                type="button"
                onClick={() => handleAgeChange(true)}
                className="w-10 h-10 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-3">Password Baru</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pr-10 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Masukkan password baru (kosongkan jika tidak ingin mengubah)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? (
                    <PiEye />
                  ) : (
                    <PiEyeClosed />
                  )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
          
          {formData.password && (
            <button
              onClick={handlePasswordChange}
              disabled={loading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Mengubah Password...' : 'Ubah Password'}
            </button>
          )}
          
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profil;