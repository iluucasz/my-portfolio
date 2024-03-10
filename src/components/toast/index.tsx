'use client'
import React from 'react'
import { ToastContainer as ToastProvider } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toaster = () => {
  return (
    <ToastProvider theme='dark' />
  )
}

export default Toaster