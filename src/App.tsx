import './App.css'
import React, { useState } from 'react';

const BG_VID_URL =
  "https://videos.pexels.com/video-files/6979847/6979847-uhd_2732_1440_30fps.mp4";
const LOGO_URL =
  "https://i.ibb.co.com/XZGQscjm/cargo-ship-with-containers-illustration.png";

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Sending:', { email, password });
    try {
      const response = await fetch('##########', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('Response:', data);
      if (data.status === 'success') {
        // Handle successful login (e.g., redirect or clear form)
        setEmail('');
        setPassword('');
        setError(`Login successful: ${data.full_name} (${data.role})`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Error connecting to the server. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <video className="fixed inset-0 w-full h-full object-cover object-center blur-sm" autoPlay loop muted playsInline>
        <source src={BG_VID_URL} type="video/mp4"/>
      </video>
      <div className="fixed inset-0 bg-black opacity-25 z-10"></div>

      {/* Content */}
      <img src={LOGO_URL} alt="Logo" className="absolute top-2 w-64 h-auto z-20"/>
      <div className="relative z-20 bg-white p-8 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Employee Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black text-left">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black text-left">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && (
            <p className="mb-0 text-left  text-xs text-red-500">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold hover:bg-yellow-500 transition-colors duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-red-500">
          Forgot your password? <a href="#" className="underline hover:text-blue-500 duration-200">Reset here</a>
        </p>
      </div>
    </div>
  )
}

export default App
