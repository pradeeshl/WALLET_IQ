import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from './Button';
import axios from 'axios';
const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        setSuccess('Account created successfully!');
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setTimeout(() => {
          navigate('/budget-tracker');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during signup');
    }
  };
  return (
    <>
    <div className="h-[60px] bg-amber-300 max-w-screen flex justify-between items-center px-4">
       <h1 className="text-center text-2xl font-bold text-gray-800">
         SPENDSENSE
</h1>
         <div className="flex gap-4 p-6">
            <Link to='/'><Button>HOME</Button></Link>
            </div>
        </div>
    <div className="min-h-screen bg-gradient-to-r from-cyan-200 to-cyan-400 flex items-center justify-center px-4">
      <div className="max-w-md p-4 bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 shadow-lg rounded-lg  h-[400px] w-[500px]">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className="text-xl font-semibold text-center text-black">
            SIGN UP 
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
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            />
          </div>

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
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your confirm password"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg uppercase cursor-pointer"
          >
            SIGN UP
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};

export default Form;
