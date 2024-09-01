import React from 'react';

const Step1 = ({ formData, handleChange }) => (
  <>
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="الاسم"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
      <input
        id="phone"
        type="tel"
        name="phone"
        placeholder="رقم الهاتف"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="البريد الإلكتروني"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">كلمة السر</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="كلمة السر"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="conf_password" className="block text-sm font-medium text-gray-700">تأكيد كلمة السر</label>
      <input
        id="conf_password"
        type="password"
        name="conf_password"
        placeholder="تأكيد كلمة السر"
        value={formData.conf_password}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  </>
);

export default Step1;
