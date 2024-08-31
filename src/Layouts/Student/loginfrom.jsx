import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://bdev.elmanhag.shop/student/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log(result); // Handle login success or failure
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <h2 className="text-center text-2xl font-semibold text-red-700">تسجيل دخول</h2>
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
      />
      <input
        type="password"
        placeholder="كلمة السر"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
      />
      <button
        type="submit"
        className="w-full py-2 px-4 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
      >
        تسجيل الدخول
      </button>
    </form>
  );
};

export default LoginForm;
