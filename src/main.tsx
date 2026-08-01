import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/task-manager-app">
    <StrictMode>
        <Routes>
          <Route path="/task-manager-app/" element={<App />} />
        </Routes>
    </StrictMode>
  </BrowserRouter>,
)
