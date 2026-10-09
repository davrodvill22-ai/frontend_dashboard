import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Utensils } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Reemplaza esta URL con la URL real de tu API LDAP de clase.
      // Ejemplo: const response = await axios.post('http://tu-api-ldap.com/login', { username, password });
      // const { token } = response.data;
      
      // -- INICIO SIMULACIÓN (Borrar al integrar API real) --
      if (username === 'admin' && password === 'admin') {
         // Generando un token fake para demostración (esto lo debe regresar tu LDAP API)
         const dummyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.DummySignature";
         setToken(dummyToken);
         navigate('/dashboard');
      } else {
         throw new Error('Credenciales inválidas (Usa admin/admin para probar)');
      }
      // -- FIN SIMULACIÓN --

      // Descomenta y ajusta lo siguiente cuando tengas tu API real:
      /*
      if (token) {
        setToken(token);
        navigate('/dashboard');
      } else {
        setError('No se recibió el token');
      }
      */
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Utensils className="mx-auto h-12 w-12 text-orange-500" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Burger Dashboard
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Inicia sesión con tu cuenta LDAP
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-t-4 border-orange-500">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Usuario LDAP</label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300"
              >
                {loading ? 'Iniciando sesión...' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
