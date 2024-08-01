import { Link, useParams } from 'react-router-dom';
import './navbar.css'
import { useState } from 'react';

function Navlinks({ toggleNav }) {


    const user = useParams()




    return (
        <>
            
                < div className='mobileNavigation hamburger'  >


                    <div className='btn-cross'>
                        <button type='button' onClick={toggleNav} className='btn-ham '>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>


                    </div>

                    <ul>
                        <li>
                            <Link to={user && user.user ? `/${user.user}` : "/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={user && user.user ? `/${user.user}/blog ` : "/blog"}>Add Blog</Link>
                        </li>
                        <li>
                            <Link to={user && user.user ? `/${user.user}/posts ` : "/posts"}>Your Posts</Link>
                        </li>

                    </ul>

                </div>


            

        </>
    )
}


export default Navlinks