import Header from "./Header";
import useMovies from "../hooks/useMovies";
import TMDBUrls from "../utils/TMDB";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useMovies(TMDBUrls.nowPlayingMovies);

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
