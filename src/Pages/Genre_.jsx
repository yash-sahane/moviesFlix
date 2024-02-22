import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Skeleton from 'react-loading-skeleton';

const Genre = () => {
    const [moviesByGenres, setMoviesByGenres] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMoviesByGenres = async () => {
            try {
                const genreIds = [28, 12, 18, 35, 80, 14, 27, 10749]; // Example genre IDs
                const promises = genreIds.map(async (genreId) => {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/discover/movie?api_key=a6a58dcd45183909f4b677c89d9fb805&language=en-US&with_genres=${genreId}`
                    );
                    if (!response.ok) {
                        throw new Error('Something went wrong');
                    }
                    const data = await response.json();
                    return { genreId, movies: data.results };
                });

                const results = await Promise.all(promises);
                const moviesByGenresObj = results.reduce(
                    (acc, { genreId, movies }) => ({
                        ...acc,
                        [genreId]: movies.slice(0, 20), // Limit to 20 movies per genre
                    }),
                    {}
                );

                setMoviesByGenres(moviesByGenresObj);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchMoviesByGenres();
    }, []);

    if (loading) {
        // Display loading skeleton while data is being fetched
        return (
            <div>
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="genre-slider">
                        <Skeleton height={300} width={200} />
                        <Skeleton height={30} width={150} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            {Object.entries(moviesByGenres).map(([genreId, movies]) => (
                <div key={genreId} className="genre-slider">
                    <h2>Genre {genreId}</h2>
                    <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} showStatus={false}>
                        {movies.map((movie) => (
                            <Link
                                key={movie.id}
                                to={`/movie/${movie.id}`}
                                style={{ textDecoration: 'none', color: 'white' }}
                            >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie.original_title}</div>
                                    {/* Add other movie details as needed */}
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                </div>
            ))}
        </div>
    );
};

export default Genre;
