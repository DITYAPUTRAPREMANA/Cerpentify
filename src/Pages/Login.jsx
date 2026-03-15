import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Firebase/authContext.jsx';
import BackgroundPattern from '../Component/Background.jsx';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PiEye } from "react-icons/pi";
import { PiEyeClosed } from "react-icons/pi";
import { GoogleLogin } from '@react-oauth/google';
import ForgetPass from '../Component/Forgetpass.jsx';

export default function Login() {
  const [showforget, setShowforget] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const toggleForget = () => {
    setShowforget(!showforget);
  };

  const { login } = useAuth();
  const navigate = useNavigate();

  // Regex patterns untuk validasi
  const validationPatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^.{6,}$/
  };

  // Fungsi validasi menggunakan regex
  const validateForm = (email, password) => {
    // Validasi email
    if (!validationPatterns.email.test(email)) {
      return 'Format email tidak valid (harus mengandung @)';
    }
    
    // Validasi password
    if (!validationPatterns.password.test(password)) {
      return 'Password minimal 6 karakter';
    }
    
    return null; // Tidak ada error
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email dan password harus diisi');
      return;
    }

    // Validasi menggunakan regex
    const validationError = validateForm(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('Email tidak ditemukan');
          break;
        case 'auth/wrong-password':
          setError('Password salah');
          break;
        case 'auth/invalid-email':
          setError('Format email tidak valid');
          break;
        case 'auth/too-many-requests':
          setError('Terlalu banyak percobaan. Coba lagi nanti.');
          break;
        case 'auth/invalid-credential':
          setError('Email atau password salah');
          break;
        default:
          setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundPattern />
      <div className="flex items-center justify-center min-h-screen px-8">
        <div className="flex items-center justify-between max-w-7xl w-full">
          {/* Left side - Landing Info */}
          <div className="flex-1 max-w-2xl">
            <div className="mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 border border-purple-200 inline-block">
                <span className="text-purple-600 font-medium">Website Kumpulan Cerpen Terbaik!</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Jelajahi Dunia Cerita Pendek di{' '}
              <span className="text-purple-600">Cerpentify</span>!
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Baca, bagikan, dan temukan cerita pendek terbaik dari penulis berbakat.<br />
              Mulai petualangan literasi Anda sekarang – gratis, mudah, dan penuh inspirasi!
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/register')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Belum Punya Akun?
              </button>
              <button 
                onClick={toggleForget}
                className="bg-white hover:bg-gray-50 text-purple-600 px-8 py-3 rounded-full font-medium border-2 border-purple-200 transition-colors"
              >
                Lupa Sandi?
              </button>
            </div>
          </div>
          
          {/* Right side - Login form */}
          <div className="flex-shrink-0 ml-16">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-[480px] border border-gray-100">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Selamat Kembali!
              </h2>
              <p className="text-gray-600 text-center mb-8 text-sm">
                Lanjutkan perjalanan literasimu. Masuk untuk mengakses koleksi cerpen pribadi, riwayat baca, dan komunitas.
              </p>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan kata sandi Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-10 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
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
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                      Ingat saya
                    </label>
                  </div>
                  <div className="text-sm">
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !email || !password}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-medium transition-colors transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Masuk...' : 'Masuk'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <span className="text-gray-500 text-sm">Atau lanjutkan dengan</span>
              </div>
              <div className="mt-4 gap-4 flex items-center justify-center">
                {/* Google Login Button */}
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    navigate("/dashboard");
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  shape="pill"
                  size="large"
                  text="login_with"
                  theme="outline"
                  className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700">
                    Google
                  </span>
                </GoogleLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ForgetPass Popup */}
      <ForgetPass isOpen={showforget} onClose={() => setShowforget(false)} />
    </div>
  );
}