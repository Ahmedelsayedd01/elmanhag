import React from 'react';

const Step2 = ({ formData, handleChange, countries, city, education, studentJobs }) => (
    <>
        <div className="mb-4">
            <label htmlFor="country_id" className="block text-sm font-medium text-gray-700">البلد</label>
            <select
                id="country_id"
                name="country_id"
                value={formData.country_id}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="">اختر البلد</option>
                {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="mb-4">
            <label htmlFor="city_id" className="block text-sm font-medium text-gray-700">المحافظة</label>
            <select
                id="city_id"
                name="city_id"
                value={formData.city_id}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="">اختر المحافظة</option>
                {city.map((city) => (
                    <option key={city.id} value={city.id}>
                        {city.name}
                    </option>
                ))}
            </select>
        </div> 

        <div className="mb-4">
            <label htmlFor="education_id" className="block text-sm font-medium text-gray-700">نوع التعليم</label>
            <select
                id="education_id"
                name="education_id"
                value={formData.education_id}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="">اختر نوع التعليم</option>
                {education.map((education) => (
                    <option key={education.id} value={education.id}>
                        {education.name}
                    </option>
                ))}
            </select>
        </div> 
        <div className="mb-4">
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">السنة الدراسية</label>
            <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
            >
                <option value=""> السنة الدراسية   </option>
                {education.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div> 
        {/* <div className="mb-4"> */}
            {/* <label htmlFor="year" className="block text-sm font-medium text-gray-700">السنة الدراسية</label>
            <input
                id="year"
                type="text"
                name="year"
                placeholder="السنة الدراسية"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
            />
        </div>  */}

         <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">الجنس</label>
            <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="">اختر الجنس</option>
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
            </select>
        </div>

        <div className="mb-4">
            <label htmlFor="StudentJobs_id" className="block text-sm font-medium text-gray-700">نفسك تبقي اي لما تكبر</label>
            <select
                id="StudentJobs_id"
                name="StudentJobs_id"
                value={formData.StudentJobs_id}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
            >
                <option value=""> نفسك تبقي اي لما تكبر</option>
                {studentJobs.map((job) => (
                    <option key={studentJobs.id} value={studentJobs.id}>
                        {studentJobs.name}
                    </option>
                ))}
            </select>
        </div> 
    </>
);

export default Step2;
