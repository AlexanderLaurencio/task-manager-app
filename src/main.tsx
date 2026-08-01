import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/task-manager-app'>
    <StrictMode>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
    </StrictMode>
  </BrowserRouter>,
)
