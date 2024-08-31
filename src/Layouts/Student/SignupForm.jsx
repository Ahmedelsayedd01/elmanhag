// src/components/SignupForm.jsx
import React, { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    conf_password: '',
    country_id: '',
    city_id: '',
    category_id: '',
    image: null,
    parent_name: '',
    parent_email: '',
    parent_password: '',
    parent_phone: '',
    education_id: '',
    parent_relation_id: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation could be added here

    // Form submission logic
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await fetch('https://bdev.elmanhag.shop/student/auth/signup/create', {
        method: 'POST',
        body: formDataToSubmit,
      });

      const result = await response.json();
      console.log(result); // Handle success or error response
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ textAlign: 'center', color: '#d22d2d' }}>إنشاء حساب</h2>
      
      <input type="text" name="name" placeholder="الاسم" onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="رقم الهاتف" onChange={handleChange} required />
      <input type="email" name="email" placeholder="البريد الإلكتروني" onChange={handleChange} required />
      <input type="password" name="password" placeholder="كلمة السر" onChange={handleChange} required />
      <input type="password" name="conf_password" placeholder="تأكيد كلمة السر" onChange={handleChange} required />
      <input type="file" name="image" onChange={handleChange} />
      <input type="text" name="parent_name" placeholder="اسم ولي الأمر" onChange={handleChange} />
      <input type="email" name="parent_email" placeholder="البريد الإلكتروني لولي الأمر" onChange={handleChange} />
      <input type="password" name="parent_password" placeholder="كلمة السر لولي الأمر" onChange={handleChange} />
      <input type="tel" name="parent_phone" placeholder="رقم هاتف ولي الأمر" onChange={handleChange} />

      {/* Add other inputs here, such as for country_id, city_id, category_id, etc. */}
      
      <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#d22d2d', color: 'white', border: 'none', borderRadius: '5px' }}>
        إنشاء حساب
      </button>
    </form>
  );
};

export default SignupForm;
