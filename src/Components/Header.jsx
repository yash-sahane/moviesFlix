import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon link" src={logo} alt="Logo" /></Link>
                <Link to="/movies/popular" style={{ textDecoration: "none" }}><span className='header-link link'>Popular</span></Link>
                <Link to="/movies/top_rated" style={{ textDecoration: "none" }}><span className='header-link link'>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{ textDecoration: "none" }}><span className='header-link link'>Upcoming</span></Link>
                <Link to="/genre/" style={{ textDecoration: "none" }}><span className='header-link link'>Genre</span></Link>
            </div>
        </div>
    );
};

export default Header;
