import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import Table from './Details';
import axios from 'axios';

const Transactions = () => {
  const navigate = useNavigate();
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/GetData");
      console.log("API response:", response.data);
      setClientData(response.data);
      setError('');
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals and remaining amount
  const calculateTotals = () => {
    const totalIncome = clientData
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount || 0), 0);
    
    const totalExpenses = clientData
      .filter(transaction => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount || 0), 0);
    
    const remainingAmount = totalIncome - totalExpenses;
    
    return { totalIncome, totalExpenses, remainingAmount };
  };

  const { totalIncome, totalExpenses, remainingAmount } = calculateTotals();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    if (!user.id) {
      navigate('/login');
      return;
    }
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading transactions...</div>
      </div>
    );
  }

  return (
    <>
      <div className="h-[60px] bg-amber-300 max-w-screen flex justify-between items-center px-4">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          SPENDSENSE - Transactions
        </h1>
        <div className="flex gap-4 p-6">
          <span className="text-gray-800 text-2xl">Welcome, {user.name}!</span>
          <Button onClick={handleLogout}>LOGOUT</Button>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Your Transactions
              </h2>
              <Link to="/budget-tracker">
                <Button>Add New Transaction</Button>
              </Link>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-gradient-to-r from-teal-200 to-lime-200 p-6 rounded-lg">
              <div className="bg-gradient-to-br from-green-100 to-green-200 border border-green-300 rounded-lg p-4 shadow-md">
                <h3 className="text-sm font-medium text-green-800 mb-1">Total Income</h3>
                <p className="text-2xl font-bold text-green-600">₹{totalIncome.toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-red-100 to-red-200 border border-red-300 rounded-lg p-4 shadow-md">
                <h3 className="text-sm font-medium text-red-800 mb-1">Total Expenses</h3>
                <p className="text-2xl font-bold text-red-600">₹{totalExpenses.toFixed(2)}</p>
              </div>
              <div className={`${remainingAmount >= 0 ? 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300' : 'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300'} border rounded-lg p-4 shadow-md`}>
                <h3 className={`text-sm font-medium mb-1 ${remainingAmount >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
                  Remaining Balance
                </h3>
                <p className={`text-2xl font-bold ${remainingAmount >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                  ₹{remainingAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-lg p-4 shadow-md">
                <h3 className="text-sm font-medium text-gray-800 mb-1">Total Transactions</h3>
                <p className="text-2xl font-bold text-gray-600">{clientData.length}</p>
              </div>
            </div>

            {clientData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No transactions found</p>
                <Link to="/budget-tracker" className="mt-4 inline-block">
                  <Button>Add Your First Transaction</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left font-semibold">Category</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Amount (₹)</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Title</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Type</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Date</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Balance (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Table formData={clientData} />
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 flex gap-4">
              <button
                onClick={fetchTransactions}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
