import { Link } from 'react-router-dom'; 
import Button from './Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from './HeroSection';
const Home = () => {

   const [clientData, setClientData] = useState([]);
  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/GetData");
      console.log("API response:", response.data);
      setClientData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };
  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/InsertData",
        formData
      );
      console.log("API response:", response.data);
      fetchClients();
    } catch (err) {
      console.error("Error submitting data:", err.message);
    }
  };
  useEffect(() => {
    fetchClients();
  }, []);
  return (
    <>
    
        <HeroSection onSubmit={onSubmit} />
    
    </>
  )
}

export default Home;