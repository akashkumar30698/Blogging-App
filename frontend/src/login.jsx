// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './LoginContext';
import './index.css'
import { Link } from "react-router-dom"
import './navbar.css'






function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useLogin();
  const[check,setCheck] = useState(false)
const[loading,setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleUserChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)



    try {  //                          WHEN USING REACT WITH VITE
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/login`, {
        method: 'POST',
        credentials: 'include', //to parse cookies in frontend
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        if (data !== 'login-failed') {
        
          setIsLoggedIn(true);
          setCheck(false)
          navigate(`/${data.params}`,{id : data.params});
        } else {
             setFormData({
              email: '',
              password: '',
             })
            setCheck(true)
          console.log('Incorrect email or password');
        }
      } else {
        console.log('Error logging in');
      }
    } catch (err) {
      console.log('Oops, some error occurred:', err);
    }finally{
    setLoading(false)
    }
  };

  return (
   <>
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSubmit} action="/" method="POST">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" onChange={handleUserChange} value={formData.email} type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <Link to="/forgetPassword" className="font-semibold text-black-600 hover:text-gray-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" onChange={handleUserChange} value={formData.password} name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
   {check && <p className='text-red-700'>Invalid Email or password</p>}

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">{loading ? "Logging In" : "Login"}</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <Link to="/signUp" className="font-semibold leading-6 text hover:text-gray-500">Sign Up</Link>
    </p>
  </div>
</div>
   </>
  );
}

export default Login;
