import TMDBUrls from "../utils/TMDB";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-48 p-4">
      <img className="rounded-sm" alt="movie poster" src={TMDBUrls.imageRootUrl + posterPath} />
    </div>
  );
};

export default MovieCard;
