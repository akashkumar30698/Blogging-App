import { useNavigate } from "react-router-dom"
import './navbar.css';
import Cards from './posts.jsx'
import { useState } from "react";
import { useLogin } from './LoginContext';

function Hero() {
    const navigate = useNavigate()
    const { isLoggedIn, setIsLoggedIn } = useLogin();


    const handleClick = () => {
        navigate("/blog")
    }

    return (
        <>
            <div className="home-container">
                <header className="hero-section">
                    <h1>Welcome to Our Blog</h1>
                    <p>Share your thoughts and experiences with the world.</p>
                    <button className="cta-button" onClick={handleClick}>Get Started</button>
                </header>
                <section className="content-section">
                    <h2>Latest Posts</h2>
                    {isLoggedIn ? (
                        <Cards />
                    ) : (
                        <h2>No Posts Available </h2>
                    )}


                </section>
            </div>
        </>
    )
}


export default Hero







