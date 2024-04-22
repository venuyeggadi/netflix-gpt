import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { NETFLIX_BANNER_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <div className="">
      <div className="absolute -z-10">
        <img src={NETFLIX_BANNER_URL} alt="banner" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
