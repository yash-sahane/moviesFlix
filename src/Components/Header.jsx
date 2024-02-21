import React, { useEffect, useState } from 'react';
import './Header.css'; // Import your stylesheet for additional styling
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import Select from 'react-select';
import genres from '../assets/genres.js';

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon link" src={logo} alt="Logo" /></Link>
                <Link to="/movies/popular" style={{ textDecoration: "none" }}><span className='header-link link'>Popular</span></Link>
                <Link to="/movies/top_rated" style={{ textDecoration: "none" }}><span className='header-link link'>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{ textDecoration: "none" }}><span className='header-link link'>Upcoming</span></Link>
            </div>
        </div>
    );
};

export default Header;
