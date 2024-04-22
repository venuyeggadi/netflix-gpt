import Header from "./Header";
import useMovies from "../hooks/useMovies";
import TMDBUrls from "../utils/TMDB";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  setNowPlayingMovies,
  setPopularMovies,
  setTopRatedMovies,
  setUpcomingMovies,
} from "../store/moviesSlice";
import GptSearch from "./GptSearch";

const Browse = () => {
  const dispatch = useDispatch();

  const showGptSearch = useSelector((s) => s.gpt.showGptSearch);

  const nowPlayingMovies = useMovies(TMDBUrls.nowPlayingMovies);
  dispatch(setNowPlayingMovies(nowPlayingMovies));

  const popularMovies = useMovies(TMDBUrls.popular);
  dispatch(setPopularMovies(popularMovies));

  const topRatedMovies = useMovies(TMDBUrls.topRated);
  dispatch(setTopRatedMovies(topRatedMovies));

  const upcomingMovies = useMovies(TMDBUrls.upcoming);
  dispatch(setUpcomingMovies(upcomingMovies));

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
