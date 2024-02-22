import React, { useEffect, useState } from 'react'

const Genre = () => {
    const [moviesByGenres, setMoviesByGenres] = useState([]);

    useEffect(() => {
        const promises = async () => {
            const genresIds = [28, 12, 18, 35, 80, 14, 27, 10749];
            const promises = genresIds.map(async (genreId) => {
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=a6a58dcd45183909f4b677c89d9fb805&language=en-US&with_genres=${genreId}`
                );
                const data = await response.json();
                return { genreId, movies: data.results };
            })

            const results = await Promise.all(promises);
            const moviesByGenresObj = results.reduce((acc, { genreId, movies }) => ({
                ...acc, [genreId]: movies.slice(0, 20),
            }), {});

            setMoviesByGenres(moviesByGenresObj);
            setLoading(false);
        }
    })

    return (
        <div>Genre</div>
    )
}

export default Genre