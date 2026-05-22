import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Button from './Button';
import axios from 'axios';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/log-in', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        setSuccess(`Welcome back, ${response.data.user.name}!`);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setTimeout(() => {
          navigate('/budget-tracker');
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during login');
    }
  };
  return (
    <>
    <div className="h-[60px] bg-amber-300 max-w-screen flex justify-between items-center px-4">
       <h1 className="text-center text-2xl font-bold text-gray-800">
         WALLETIQ
</h1>
         <div className="flex gap-4 p-6">
            <Link to='/'><Button>HOME</Button></Link>
            </div>
        </div>
    <div className="min-h-screen bg-gradient-to-r from-cyan-200 to-cyan-400 flex items-center justify-center px-4">
      <div className="max-w-md  mx-auto mt-16 p-4 bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 shadow-lg rounded-lg h-[400px] w-[700px]">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <p className="text-xl font-semibold text-center text-black">
          Sign in to your account
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none"
          />
        </div>

        <div className="relative">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg uppercase cursor-pointer"
        >
          Sign in
        </button>

        <p className="text-center text-sm text-gray-500">
          No account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
    </div>
    </>
  );
};

export default Form;

