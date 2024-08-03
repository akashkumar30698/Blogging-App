import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login.jsx'
import SignUp from './signUp.jsx'
import { LoginProvider } from './LoginContext.jsx'
import Blog from './blog.jsx'
import Cards from './posts.jsx'
import ForgetPassword from './forgetPassword'; 
import ValidateOTP from './validateOTP.jsx'
import ResetPassword from './resetPassword.jsx'
import Article from './article.jsx'
import Navbar from './navbar.jsx'
import NotFound from './notFound.jsx'
/*
IMPORTANT :
AVOID USAGE OF PROXY IN CSR AS IT MIGHT CAUSE ERRORS
*/


const PostwithNavbar = () =>{
  return (
    <>
    <Navbar/>
    <Cards/>
  </>

  )

}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <BrowserRouter>
        <Routes>

          { /* Dynamic routing for HOME */}
          <Route path='/'>
            <Route path="/" element={<App />} />
            <Route path="/:user" element={<App />} />
          </Route>


          <Route path="/login" element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />


          {/* Dynamic routing for Blog */}
          <Route path="/">
            <Route path='/:user/blog' element={<Blog />} />
            <Route path='/blog' element={<Blog />} />
          </Route>

          {/* Dynamic routing for Your Posts */}
          <Route path="/">
            <Route path='/:user/posts' element={<PostwithNavbar/>} />
            <Route path='/posts' element={<PostwithNavbar/>} />
          </Route>


<Route path='/forgetPassword'  element={<ForgetPassword/>}/>


<Route path='/validateOTP' element={<ValidateOTP/>} />

<Route path='/resetPassword' element={<ResetPassword/>}/>

<Route path='/article/:id' element={<Article/>} />


 {/* Catch-all route for 404 */}
 <Route path='*' element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </LoginProvider>


  </React.StrictMode>,
)
