import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password')
});

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}
        
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await registerUser({
                username: values.username,
                email: values.email,
                password: values.password
              });
              navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
            } catch (err) {
              setError(err.response?.data?.message || 'Registration failed');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4 rounded-md shadow-sm">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Choose a username"
                  />
                  <ErrorMessage name="username" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Create a password"
                  />
                  <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-indigo-500 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </button>
              </div>
              
              <div className="text-xs text-center text-gray-600">
                By registering, you agree to our{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>.
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;