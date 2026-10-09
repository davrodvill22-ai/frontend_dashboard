import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { LogOut, PlusCircle, ServerCrash } from 'lucide-react';

const Dashboard = () => {
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/burgers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBurgers(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching burgers:", err);
        setError("No se pudo cargar el listado. ¿Está el backend encendido?");
        if (err.response?.status === 401 || err.response?.status === 403) {
          logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBurgers();
  }, [token, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-500">
          <h1 className="text-3xl font-bold text-gray-800">Menú de Hamburguesas</h1>
          <div className="flex gap-4">
            <Link 
              to="/add" 
              className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              <PlusCircle size={20} />
              <span>Agregar Hamburguesa</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              <LogOut size={20} />
              <span>Salir</span>
            </button>
          </div>
        </header>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 flex items-center gap-3 rounded">
             <ServerCrash />
             <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {burgers.map((burger) => (
              <div key={burger.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-orange-100 flex items-center justify-center">
                  <span className="text-6xl">🍔</span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-900">{burger.name}</h2>
                    <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                      ${burger.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{burger.description}</p>
                </div>
              </div>
            ))}
            
            {burgers.length === 0 && !error && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No hay hamburguesas en el menú. ¡Agrega una!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
