import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import './Movie.css';

const Movie = () => {
    const [movieInfo, setMoviesInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const apiKey = import.meta.env.VITE_API_KEY;

    const URL =
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                setMoviesInfo(data);
                setLoading(false);
                console.log(data);
                document.title = data.title
            } catch (e) {
                console.log(e.message);
            }
        };

        fetchMovies();
    }, [URL]);

    if (loading) {
        // Display loading skeleton while data is being fetched
        return (
            <div className="movie">
                <Skeleton height={500} />
                <div className="movie__detail">
                    <div className="movie__detailLeft">
                        <Skeleton height={300} width={200} />
                    </div>
                    <div className="movie__detailRight">
                        <Skeleton height={40} width={300} />
                        <Skeleton height={20} width={150} />
                        <Skeleton height={20} width={150} />
                        <Skeleton height={20} width={150} />
                        <Skeleton height={20} width={150} />
                        <div className="movie__genres">
                            <Skeleton height={30} width={100} />
                            <Skeleton height={30} width={100} />
                            <Skeleton height={30} width={100} />
                        </div>
                        <Skeleton height={200} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${movieInfo ? movieInfo.backdrop_path : ""}`} />
                <div className="movie__detail">
                    <div className="movie__detailLeft">
                        <div className="movie__posterBox">
                            <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${movieInfo ? movieInfo.poster_path : ""}`} />
                        </div>
                    </div>
                    <div className="movie__detailRight">
                        <div className="movie__detailRightTop">
                            <div className="movie__name">{movieInfo ? movieInfo.original_title : ""}</div>
                            <div className="movie__tagline">{movieInfo ? movieInfo.tagline : ""}</div>
                            <div className="movie__rating">
                                {movieInfo ? movieInfo.vote_average?.toFixed(1) : ""}<i className="fa-solid fa-star fa-xs" style={{ color: "#FFD43B", marginLeft: '3px' }}></i>
                                <span className="movie__voteCount">{movieInfo ? "(" + movieInfo.vote_count + ") votes" : ""}</span>
                            </div>
                            <div className="movie__runtime">{movieInfo ? movieInfo.runtime + " mins" : ""}</div>
                            <div className="movie__releaseDate">{movieInfo ? "Release date: " + movieInfo.release_date : ""}</div>
                            <div className="movie__genres">
                                {
                                    movieInfo && movieInfo.genres
                                        ? movieInfo.genres.map(genre => (
                                            <span className="movie__genre" key={genre.id} id={genre.id}>{genre.name}</span>
                                        ))
                                        : null // Use null instead of an empty string
                                }
                            </div>
                        </div>
                        <div className="movie__detailRightBottom">
                            <div className="synopsisText">Synopsis</div>
                            <div>{movieInfo ? movieInfo.overview : ""}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie