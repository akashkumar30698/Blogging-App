import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login.jsx'
import SignUp from './signUp.jsx'
import { LoginProvider } from './LoginContext.jsx'
import Blog from './blog.jsx'
import AllUserPosts from './allUserPosts.jsx'
import ForgetPassword from './forgetPassword'; 
import ValidateOTP from './validateOTP.jsx'
import ResetPassword from './resetPassword.jsx'
import Article from './article.jsx'
import Navbar from './navbar.jsx'
import NotFound from './notFound.jsx'
import UserPosts from './posts.jsx'
import Hero from './hero.jsx'

/*
IMPORTANT :
AVOID USAGE OF PROXY IN CSR AS IT MIGHT CAUSE ERRORS
*/

const AllPostWithNavbar = () => {
  return (
    <>
      <Navbar />
      <Hero />
      
    </>
  )
}

const PostWithNavbar = () => {
  return (
    <>
      <Navbar />
      <UserPosts />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <BrowserRouter>
        <Routes>

          {/* Home Route */}
          <Route path="/" element={<App />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          {/* Blog Routes */}
          <Route path="/:user/blog" element={<Blog />} />
         

          {/* User and Posts Routes */}
          <Route path="/:user" element={<AllPostWithNavbar />} />
          <Route path="/:user/posts" element={<PostWithNavbar />} />

          {/* Password Recovery Routes */}
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/validateOTP" element={<ValidateOTP />} />
          <Route path="/resetPassword" element={<ResetPassword />} />

          {/* Article Route */}
          <Route path="/article/:id" element={<Article />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </LoginProvider>
  </React.StrictMode>,
)
