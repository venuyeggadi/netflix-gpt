import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TMDB_API_KEY } from "../utils/constants";
import { setTrailerVideo } from "../store/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieTrailer = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: TMDB_API_KEY,
          },
        }
      );
      const responseJson = await response.json();
      const trailers = responseJson.results.filter(v => v.type === 'Trailer');
      const trailer = trailers.length ? trailers[0] : responseJson.results[0];
      dispatch(setTrailerVideo(trailer));
    };

    // if (!movieId)
    //   return;
    getMovieTrailer();
  }, [movieId, dispatch]);
};

export default useMovieTrailer;
