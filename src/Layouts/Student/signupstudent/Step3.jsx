import React from 'react';

const Step3 = ({ formData, handleChange, parentRelation }) => (
  <>
    <div className="mb-4">
      <label htmlFor="parent_name" className="block text-sm font-medium text-gray-700">اسم ولي الأمر</label>
      <input
        id="parent_name"
        type="text"
        name="parent_name"
        placeholder="اسم ولي الأمر"
        value={formData.parent_name}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="parent_phone" className="block text-sm font-medium text-gray-700">رقم هاتف ولي الأمر</label>
      <input
        id="parent_phone"
        type="tel"
        name="parent_phone"
        placeholder="رقم هاتف ولي الأمر"
        value={formData.parent_phone}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="parent_email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
      <input
        id="parent_email"
        type="email"
        name="parent_email"
        placeholder="البريد الإلكتروني"
        value={formData.parent_email}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="parent_password" className="block text-sm font-medium text-gray-700">كلمة السر</label>
      <input
        id="parent_password"
        type="password"
        name="parent_password"
        placeholder="كلمة السر"
        value={formData.parent_password}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="parent_conf_password" className="block text-sm font-medium text-gray-700">تأكيد كلمة السر</label>
      <input
        id="parent_conf_password"
        type="password"
        name="parent_conf_password"
        placeholder="تأكيد كلمة السر"
        value={formData.parent_conf_password}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="parentRelation_id" className="block text-sm font-medium text-gray-700">صلة القرابة</label>
      <select
        id="parentRelation_id"
        name="parentRelation_id"
        value={formData.parentRelation_id}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">صلة القرابة</option>
        {parentRelation.map((relation) => (
          <option key={relation.id} value={relation.id}>
            {relation.name}
          </option>
        ))}
      </select>
    </div>
    <div className="mb-4">
      <label htmlFor="affilate_id" className="block text-sm font-medium text-gray-700">كود التسويق</label>
      <input
        id="affilate_id"
        type="text"
        name="affilate_id"
        placeholder="أدخل كود التسويق"
        value={formData.affilate_id}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  </>
);

export default Step3;
