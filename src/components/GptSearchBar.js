import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import { TMDB_API_KEY } from "../utils/constants";
import openai from "../openai/openai";
import { useDispatch } from "react-redux";
import { setGptMovies } from "../store/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((state) => state.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
      "&include_adult=false&language=en-US&page=1",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: TMDB_API_KEY,
        },
      }
    )
      
    const json = await data.json();

    return json.results;
  };

  const handleSearch = async () => {
    if (!searchText.current.value)
      return;
    console.log(searchText.current.value);
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });
    // console.log(gptResults.choices);

    const gptResults = {
      choices: [
        {
          message: {
            content : "Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan"
          }
        }
      ]
    }

    if (!gptResults.choices) {
      // TODO: Write Error Handling
    }

    console.log(gptResults.choices?.[0]?.message?.content);

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(setGptMovies({ movieNames: gptMovies, movieResults: tmdbResults }));
  }

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12"
      onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-4 m-4 rounded-e-md col-span-9"
        />
        <button
          type="submit"
          className="bg-red-700 p-4 m-4 rounded-md col-span-3"
          onClick={handleSearch}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
