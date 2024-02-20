import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src={logo} /></Link>
                <Link to="/movies/popular" style={{ textDecoration: "none" }}><span className='header-link
                '>Popular</span></Link>
                <Link to="/movies/top_rated" style={{ textDecoration: "none" }}><span className='header-link
                '>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{ textDecoration: "none" }}><span className='header-link
                '>Upcoming</span></Link>
            </div>
        </div>
    )
}

export default Header