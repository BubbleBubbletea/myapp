import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    setLoading(true);

    try {
      console.log('Attempting signup with email:', email); // Debugging log
      
      // Supabase signup request
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      // Handle any errors
      if (error) {
        console.error('Error during signup:', error.message); // Log detailed error
        throw error; // Throw the error to trigger the catch block
      }

      console.log('Signup successful:', data); // Log success response

      if (!data.user) {
        console.warn('User was not created successfully. Verify your Supabase settings.');
        alert('Signup incomplete. Please check your email for confirmation.');
        return;
      }

      // Notify user and redirect to login page
      alert('Signup successful! Please check your email to confirm your account.');
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Signup failed:', error.message); // Log the error message
      alert(`Signup failed: ${error.message}`);
    } finally {
      setLoading(false); // Always stop loading state
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
      <form
        className="max-w-md mx-auto bg-white p-6 rounded shadow"
        onSubmit={handleSignup} // Call handleSignup on form submit
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
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
