import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import './App.css'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* <Route path="/" element={ <HomePage/> } /> */}
      <Route path="/" element={ <Layout/> } />
    </Routes>
  )
}
