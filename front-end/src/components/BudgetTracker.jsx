import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';

const BudgetTracker = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type' && value === 'income') {
      setFormData({
        ...formData,
        [name]: value,
        category: 'Salary/Income'
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.title || !formData.amount) {
      setError('Please fill in all required fields');
      return;
    }
    if (formData.type === 'expense' && !formData.category) {
      setError('Please select a category for expense');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/InsertData', {
        user_id: user.id,
        title: formData.title,
        amount: parseFloat(formData.amount),
        type: formData.type,
        category: formData.type === 'income' ? 'Salary/Income' : formData.category,
        date: formData.date
      });

      if (response.data) {
        setSuccess('Transaction added successfully!');
        setTimeout(() => {
          navigate('/transactions');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while adding transaction');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <div className="h-[60px] bg-amber-300 max-w-screen flex justify-between items-center px-4">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          SPENDSENSE - Budget Tracker
        </h1>
        <div className="flex gap-4 p-6">
          <span className="text-gray-800 text-2xl">Welcome, {user.name}!</span>
          <Button onClick={handleLogout}>LOGOUT</Button>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
        <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg w-full">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Add Transaction
            </h2>

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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter transaction title"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount in Rupees"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            {formData.type === 'expense' && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                    <option value="Dress">Dress</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}

            {formData.type === 'income' && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value="Salary/Income"
                  readOnly
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-600"
                />
              </div>
            )}

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-sm font-medium rounded-lg uppercase cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Add Transaction
            </button>

            <div className="flex gap-2 mt-4">
              <Link to="/transactions" className="flex-1">
                <button
                  type="button"
                  className="w-full py-2 bg-gray-600 text-white text-sm font-medium rounded-lg uppercase cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  View Transactions
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BudgetTracker;
