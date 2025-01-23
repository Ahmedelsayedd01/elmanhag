import React, { useState, useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    conf_password: '',
    country_id: '',
    city_id: '',
    education_id: '',
    language: '',
    parent_name: '',
    parent_phone: '',
    parent_email: '',
    parent_relation: '',

    StudentJobs_id: '',
    affilate_id: '',
    gender: '',
  });

  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [city, setCities] = useState([]);
  const [education, setEducation] = useState([]);
  const [studentJobs, setStudentJobs] = useState([]);
  const [parentRelation, setParentRelation] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/student/setting/view');
        const data = await response.json();
        setCountries(data.country || []);
        setCities(data.city || []);
        setEducation(data.education || []);
        setStudentJobs(data.studentJobs || []);
        setParentRelation(data.parentRelation || [])
        setCategory(data.category || [])

      } catch (error) {
        console.error('Error fetching countries and cities:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleNext = () => {
    if (step === 1 && formData.password !== formData.conf_password) {
      alert('Passwords do not match');
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/student/auth/signup/create', {
        method: 'POST',
        body: formDataToSubmit,
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result); // Handle success response
        // Possibly redirect or show success message
      } else {
        console.error(result.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="overflow-auto max-h-screen p-8 mx-auto bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">إنشاء حساب</h2>

        {step === 1 && <Step1 formData={formData} handleChange={handleChange} />}
        {step === 2 && (
          <Step2
            formData={formData}
            handleChange={handleChange}
            countries={countries}
            city={city}
            education={education}
            studentJobs={studentJobs}
          />
        )}
        {step === 3 && <Step3
          formData={formData}
          handleChange={handleChange}
          parentRelation={parentRelation}
        />}

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="py-2 px-4 bg-gray-500 text-white rounded-md"
            >
              العودة
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="py-2 px-4 bg-red-600 text-white rounded-md"
            >
              التالي
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 px-4 bg-red-600 text-white rounded-md"
            >
              إنشاء حساب
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
