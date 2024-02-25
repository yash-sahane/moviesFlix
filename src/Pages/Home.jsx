import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Home.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import Movies from './Movies';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const apiKey = import.meta.env.VITE_API_KEY;

    const URL =
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                console.log(data.results);
                setPopularMovies(data.results);
                document.title = 'Home';
            } catch (e) {
                console.log(e.message);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className='home-main'>
            {popularMovies.length > 0 && (
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={300}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {popularMovies.map((movie, index) => {
                        return (
                            <Link key={index} style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? ' ' + movie.vote_average.toFixed(1) : ""}<i className="fa-solid fa-star fa-xs" style={{ color: "#FFD43B", marginLeft: '3px' }}></i>{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        )
                    })}
                </Carousel>
            )}
            <Movies />
        </div>
    );
};

export default Home;
