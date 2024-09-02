import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Auth';

const LoginForm = () => {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      if (auth && typeof auth.login === 'function') {
        auth.login(data);
      } else {
        console.warn('auth.login is not defined or not a function.');
      }

      setIsLoading(false);

      const { role } = data;

      if (role === "student") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/dashboardUser", { replace: true });
      }
    }
  }, [data, navigate, auth]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://bdev.elmanhag.shop/student/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setData(result);
        setError('');
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('Error during login: ' + error.message);
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-left'>
      <h1 className="text-4xl font-almarai text-left text-[#6B6B6B] mb-8">
        هيا سجل دخولك
      </h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
        />
        {error && <p className="text-red-600 text-left mt-2">{error}</p>}
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg hover:bg-red-800 transition-colors ${isLoading ? 'bg-gray-400' : 'bg-red-600 text-white'}`}
          disabled={isLoading}
        >
          {isLoading ? 'تحميل...' : 'تسجيل الدخول'}
        </button>
      </form>
      {/* Uncomment and adjust if you want to use this link */}
      {/* <a href="#" className="text-red-600 text-lg underline mt-4 block">هل نسيت كلمه المرور؟</a> */}
    </div>
  );
};

export default LoginForm;
