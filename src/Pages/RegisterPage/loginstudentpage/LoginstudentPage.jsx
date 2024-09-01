// src/pages/LoginPage.jsx
import React from 'react';
import Layout from '../../../Layouts/Student/loginlayout';
import LoginForm from '../../../Layouts/Student/loginfrom';
import SignupForm from '../../../Layouts/Student/signupstudent/SignupForm';

import { useEffect, useState } from 'react';

const LoginPage = () => {


  return (
    <Layout>
      <SignupForm />
    </Layout>
  );
};

export default LoginPage;
