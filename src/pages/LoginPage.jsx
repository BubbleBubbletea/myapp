import React, { useState } from 'react'; // Import useState
import { supabase } from '../supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    console.log("Logging in with email:", email, "and password:", password); // Debug log
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error("Error response from Supabase:", error);
        throw error;
      }
      console.log("Login successful:", data);

      // Get returnUrl from query params or default to homepage
      const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/';
      navigate(returnUrl); // Redirect to the original destination
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <form
        className="max-w-md mx-auto bg-white p-6 rounded shadow"
        onSubmit={handleLogin} // Call handleLogin on form submit
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
