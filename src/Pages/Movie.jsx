import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Movie.css';

const Movie = () => {
    const [movieInfo, setMoviesInfo] = useState({});
    const { id } = useParams();
    const URL =
        `https://api.themoviedb.org/3/movie/${id}?api_key=a6a58dcd45183909f4b677c89d9fb805&language=en-US`;

    useEffect(() => {
        const fetchMovies = async () => {
            // setIsLoading(true);
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                setMoviesInfo(data);
            } catch (e) {
                console.log(e.message);
            }
            // setIsLoading(false);
        };

        fetchMovies();
    }, []);

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
                                {movieInfo ? movieInfo.vote_average : ""} <i className="fas fa-star" />
                                <span className="movie__voteCount">{movieInfo ? "(" + movieInfo.vote_count + ") votes" : ""}</span>
                            </div>
                            <div className="movie__runtime">{movieInfo ? movieInfo.runtime + " mins" : ""}</div>
                            <div className="movie__releaseDate">{movieInfo ? "Release date: " + movieInfo.release_date : ""}</div>
                            <div className="movie__genres">
                                {
                                    movieInfo && movieInfo.genres
                                        ?
                                        movieInfo.genres.map(genre => (
                                            <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                        ))
                                        :
                                        ""
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
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    movieInfo && movieInfo.homepage && <a href={movieInfo.homepage} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    movieInfo && movieInfo.imdb_id && <a href={"https://www.imdb.com/title/" + movieInfo.imdb_id} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    movieInfo && movieInfo.production_companies && movieInfo.production_companies.map(company => (
                        <>
                            {
                                company.logo_path
                                &&
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default Movie