import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../Components/Card';
import './Movies.css';

const Movies = () => {
    const { type } = useParams();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const apiKey = import.meta.env.VITE_API_KEY;

    const URL =
        `https://api.themoviedb.org/3/movie/${type ? type : 'popular'}?api_key=${apiKey}&language=en-US`;

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                setMovies(data.results);
            } catch (e) {
                console.log(e.message);
            }
            setIsLoading(false);
        };

        fetchMovies();
    }, [type]);

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movies.map(movie => (
                        <Card movie={movie} key={movie.id} isLoading={isLoading} />
                    ))
                }
            </div>
        </div>
    )
}

export default Movies