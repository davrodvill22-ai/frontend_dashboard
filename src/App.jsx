import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddBurger from './components/AddBurger';
import useAuthStore from './store/useAuthStore';

// Componente para proteger rutas privadas
const PrivateRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/add" 
          element={
            <PrivateRoute>
              <AddBurger />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
