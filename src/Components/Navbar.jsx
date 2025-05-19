import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMoon, FiSun } from 'react-icons/fi'; 
import "../assets/css/Navbar.css";

function Navbar() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        document.body.classList.toggle('light', theme === 'light');
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className='navbar-container'>
            <div className='navbar-container-links'>
                <Link to='/'>home</Link>
                <Link to='/contact'>contact</Link>
            </div>
            <div className='navbar-img'>
                <button className="moon-button" onClick={toggleTheme}>
                    {theme === 'light' ? <FiSun size={24} /> : <FiMoon size={24} style={{color:'white'}} />}
                </button>
            </div>
        </div>
    );
}

export default Navbar;
