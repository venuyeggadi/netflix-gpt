import { useState, useEffect } from 'react';
import { TMDB_API_KEY } from '../utils/constants';

const useMovies = (url) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getNowPlayingMovies = async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: TMDB_API_KEY,
        },
      });
      const responseJson = await response.json();
      setMovies(responseJson.results);
    };

    getNowPlayingMovies();
  }, [url]);

  return movies;
}

export default useMovies;