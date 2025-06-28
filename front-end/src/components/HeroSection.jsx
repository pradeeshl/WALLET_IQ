import React from 'react'
import { Link } from 'react-router-dom'; 
import Button from './Button';

const HeroSection = ({ onSubmit }) => {
  return (
  <>
  <div className="h-[60px] bg-amber-300 max-w-screen flex justify-between items-center px-4">
       <h1 className="text-center text-2xl font-bold text-gray-800">
         SPENDSENSE
</h1>
         <div className="flex gap-4 p-6">
        <Link to='signup'> <Button >SIGN UP</Button></Link>
            <Link to='login'><Button>LOGIN</Button></Link>
            </div>
        </div>
         <div 
           className="min-h-screen flex items-center justify-center px-4 py-12"
           style={{
             background: 'conic-gradient(at bottom left, #f0abfc, #4ade80, #be185d)'
           }}
         >
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Transform Your <span className="text-blue-600">Financial</span> & <span className="text-green-600">Health</span> Journey
              </h2>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                Take control of your finances — and your health. Our budget tracker goes beyond numbers, 
                empowering you to make smarter spending decisions while staying on track with your wellness goals.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Smart Financial Tracking</h3>
                  <p className="text-gray-700">
                    Intuitive interface for managing income, expenses, and savings in one place with intelligent insights.
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">AI-Powered Nutrition</h3>
                  <p className="text-gray-700">
                    Our chatbot analyzes your food budget and suggests affordable, balanced diet plans tailored to you.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white mb-8">
                <p className="text-lg font-medium">
                  It's not just about where your money goes, but how it fuels your life.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">Budget Better</span>
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">Eat Smarter</span>
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">Live Healthier</span>
              </div>
            </div>
          </div>
          
        </div>

       

  </>
  )
}

export default HeroSection