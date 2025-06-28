import React from 'react'
import Signup from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import BudgetTracker from './components/BudgetTracker.jsx'
import Transactions from './components/Transactions.jsx'
import{Routes, Route} from 'react-router-dom'
const App = () => {
  return (
    <>
   <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/login" element={<Login />} />
 <Route path="/signup" element={<Signup />} />
 <Route path="/budget-tracker" element={<BudgetTracker />} />
 <Route path="/transactions" element={<Transactions />} />
   </Routes>
    </>
  )
}

export default App