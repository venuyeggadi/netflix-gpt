import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setNowPlayingMovies } from '../store/moviesSlice';
import { TMDB_API_KEY } from '../utils/constants';

const useMovies = (url) => {
  const dispatch = useDispatch();

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
      dispatch(setNowPlayingMovies(responseJson.results));
    };

    getNowPlayingMovies();
  }, [url, dispatch]);
}

export default useMovies;