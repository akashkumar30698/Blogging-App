// Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import './navbar.css';
import { useLogin } from './LoginContext';
import Cookies from 'js-cookie'
import Navlinks from './navlinks';


function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const user = useParams()
  const location = useLocation()
  const [signupState, setSignupState] = useState(location.state?.signupState || false);
  const [showHamburger, setShowHamburger] = useState(false)




  const handleLogout = () => {
    setIsLoggedIn(false);

    Cookies.remove("Login-Token", { path: "/" });
  };

  //To remove alert
  setTimeout(() => { setSignupState(false) }, 2000)


  //To handle refresh after login
  useEffect(() => {

    const token = Cookies.get("Login-Token")
    if (token) {
      setIsLoggedIn(true)
    }

  }, [])


  const hamburgerClick = () => {

    
    setShowHamburger(!showHamburger)


  }







  return (
    <>




      <nav
        className="block w-full max-w-screen-xl px-4 py-2 mx-auto text-white bg-white border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
        <div className="container flex items-center justify-between mx-auto text-blue-gray-900">


          <div className="desktopNavigation">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li
                className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text text-blue-gray-900">

                <Link to={user && user.user ? `/${user.user}` : "/"} className="flex items-center">
                  Home
                </Link>
              </li>
              <li
                className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text text-blue-gray-900">


                <Link to={user && user.user ? `/${user.user}/blog ` : "/blog"} className="flex items-center">
                  Add Blog
                </Link>
              </li>
              <li
                className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text text-blue-gray-900">


                <Link to={user && user.user ? `/${user.user}/posts ` : "/posts"} className="flex items-center">
                  Your Posts
                </Link>
              </li>

            </ul>
          </div>

          {/*Login and Logout */}
          <div className="flex  items-center gap-x-1">

            {
              isLoggedIn ? (
                <>
                  <button
                    className=" px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button" onClick={handleLogout}>
                    <span><Link to="/">Log Out</Link></span>
                  </button>
                </>

              ) : (
                <>
                  <button
                    className=" px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button">
                    <span><Link to="/login">Log In</Link></span>
                  </button>
                  <button
                    className=" select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button">
                    <span><Link to="/signUp">Sign Up</Link></span>
                  </button>
                </>

              )
            }

          </div>






          <button

            type="button" onClick={hamburgerClick} className='btn-ham'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="black">
              <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

        




        </div>







      </nav>            {/*   YOU CAN PASS ALSO PASS A WHOLE FUNCTION AS A PROP     */}
      {showHamburger ? <Navlinks toggleNav={hamburgerClick} /> : null}


  

      {signupState && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span className="font-medium">Successfully signed UP</span>
        </div>
      )}


    </>







  );
}

export default Navbar;
