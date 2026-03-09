import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { FitnessProvider } from './context/FitnessContext.jsx'
import { DietProvider } from './context/DietContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <FitnessProvider>
          <DietProvider>
            <App />
          </DietProvider>
        </FitnessProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
)

