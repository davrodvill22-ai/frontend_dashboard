import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { ArrowLeft } from 'lucide-react';

const AddBurger = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:3001/api/burgers', 
        { name, description, price: parseFloat(price) },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/dashboard'); // Regresa al dashboard tras agregar con éxito
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al agregar la hamburguesa.');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Nueva Hamburguesa</h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="Ej. Doble Queso"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="Ingredientes y detalles..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Precio ($)</label>
            <input
              type="number"
              step="0.01"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="150.00"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300"
          >
            {loading ? 'Guardando...' : 'Guardar en Menú'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBurger;
