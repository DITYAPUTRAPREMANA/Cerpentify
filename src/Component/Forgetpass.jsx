/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function ForgetPass({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async () => {
    if (!email) {
      setError('Email harus diisi');
      return;
    }

    if (!emailPattern.test(email)) {
      setError('Format email tidak valid');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      // Simulate API call - replace with actual forgot password logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setEmail('');
        onClose();
      }, 3000);
      
    } catch (error) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setShowSuccess(false);
    onClose();
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative max-w-md w-full">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Lupa Password?
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Masukkan email Anda dan kami akan mengirimkan link untuk reset password
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {showSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">
              Link reset password telah dikirim ke email Anda. Silakan cek kotak masuk atau folder spam.
            </p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="reset-email" className="block text-gray-700 font-medium mb-3">
              Email Anda:
            </label>
            <input
              id="reset-email"
              type="email"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
            >
              Kembali
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !email}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Mengirim...' : 'Kirim Link Reset'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}