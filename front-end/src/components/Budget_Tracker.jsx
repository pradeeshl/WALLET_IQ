import { useState, useEffect } from "react";
import axios from "axios";

const BudgetTracker = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  // Fetch budget data from the backend
  const fetchBudgetData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/GetData");
      console.log("Budget data fetched:", response.data);
      setBudgetData(response.data);
      calculateTotals(response.data);
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  // Calculate totals when data changes
  const calculateTotals = (data) => {
    const incomeTotal = data.reduce((total, item) => total + (Number(item.income) || 0), 0);
    const expenseTotal = data.reduce((total, item) => total + (Number(item.expense) || 0), 0);
    
    setTotalIncome(incomeTotal);
    setTotalExpense(expenseTotal);
    setBalance(incomeTotal - expenseTotal);
  };

  const addIncomeEntry = async (e) => {
    e.preventDefault();
    
    if (!incomeCategory) {
      alert("Please select a category");
      return;
    }
    
    if (!income || income <= 0) {
      alert("Please enter a valid income amount");
      return;
    }
    
    try {
      const entryData = {
        income: income,
        expense: 0,
        category: incomeCategory
      };
      
      const response = await axios.post("http://localhost:3000/api/InsertData", entryData);
      console.log("Income added:", response.data);
      
      // Reset form fields
      setIncome("");
      setIncomeCategory("");
      
      // Refresh data
      fetchBudgetData();
    } catch (error) {
      console.error("Error adding income entry:", error);
    }
  };

  // Add new expense entry
  const addExpenseEntry = async (e) => {
    e.preventDefault();
    
    if (!expenseCategory) {
      alert("Please select a category");
      return;
    }
    
    if (!expense || expense <= 0) {
      alert("Please enter a valid expense amount");
      return;
    }
    
    try {
      const entryData = {
        income: 0,
        expense: expense,
        category: expenseCategory
      };
      
      const response = await axios.post("http://localhost:3000/api/InsertData", entryData);
      console.log("Expense added:", response.data);
      
      // Reset form fields
      setExpense("");
      setExpenseCategory("");
      
      // Refresh data
      fetchBudgetData();
    } catch (error) {
      console.error("Error adding expense entry:", error);
    }
  };

  // Load budget data on component mount
  useEffect(() => {
    fetchBudgetData();
  }, []);

  return (
    <div className="p-4 bg-amber-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Budget Tracker</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-800">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-red-800">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">${totalExpense.toFixed(2)}</p>
        </div>
        
        <div className={`p-4 rounded-lg shadow ${balance >= 0 ? 'bg-blue-100' : 'bg-yellow-100'}`}>
          <h3 className="text-lg font-semibold text-gray-800">Balance</h3>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-yellow-600'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>
      
      {/* Add Entry Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Income Form */}
        <form onSubmit={addIncomeEntry} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-green-700">Add Income</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Income Amount</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-300 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              value={incomeCategory}
              onChange={(e) => setIncomeCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-300 focus:border-green-500"
            >
              <option value="">Select Category</option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Investment">Investment</option>
              <option value="Gift">Gift</option>
              <option value="Other Income">Other Income</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Income
          </button>
        </form>
        
        {/* Expense Form */}
        <form onSubmit={addExpenseEntry} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-red-700">Add Expense</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Expense Amount</label>
            <input
              type="number"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-300 focus:border-red-500"
              placeholder="0.00"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-300 focus:border-red-500"
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Housing">Housing</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Shopping">Shopping</option>
              <option value="Other Expense">Other Expense</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Expense
          </button>
        </form>
      </div>
      
      {/* Budget History Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Budget History</h3>
        
        {budgetData.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No budget entries yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Category</th>
                  <th className="py-2 px-4 border-b text-right">Income</th>
                  <th className="py-2 px-4 border-b text-right">Expense</th>
                  <th className="py-2 px-4 border-b text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {budgetData.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{entry.category}</td>
                    <td className="py-2 px-4 border-b text-right text-green-600">
                      {entry.income ? `$${Number(entry.income).toFixed(2)}` : '-'}
                    </td>
                    <td className="py-2 px-4 border-b text-right text-red-600">
                      {entry.expense ? `$${Number(entry.expense).toFixed(2)}` : '-'}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetTracker;
