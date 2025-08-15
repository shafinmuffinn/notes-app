import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import BookVehicle from './BookVehicle'
import Dashboard from './Dashboard';
import MakeDelivery from './MakeDelivery'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book-vehicle" element={<BookVehicle />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/make-delivery" element={<MakeDelivery />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
