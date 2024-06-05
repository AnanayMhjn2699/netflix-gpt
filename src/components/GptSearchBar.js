import openai from "../utils/openai";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // search the movies  in TMDB, returned by gpt and return back their details as json
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    // console.log(searchText.current.value);
    // Make an API call to GPT API and get Movie Results
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    //check this, not working (intended purpose: if no results come in then to be shown)
    if (!gptResults.choices) {
      return (
        <div className="bg-black text-white z-50 text-5xl">
          Sorry, could not find anything related to what you searched, please
          provide more information
        </div>
      );
    }
    // console.log(gptResults);
    // console.log(gptResults.choices?.[0]?.message?.content);

    // gpt results is a string of 5 comma separated movie names
    //and now transforming it into an array of movie names
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    // ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"]
    // For each movie, will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]
    //5 promises are retruned bcoz JS does not wait for the api calls to resolve before retruning them

    //therefore now fulfilling those promises
    const tmdbResults = await Promise.all(promiseArray);

    // console.log(tmdbResults);

    //adding the movies data to the store into gptSlice
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-3/4 lg:w-1/2 rounded-md bg-black grid grid-cols-12 "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="h-10 rounded-md p-2 my-3 mx-2 col-span-9 text-xs md:text-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 h-10 my-3 mx-2 p-2 text-xs md:text-lg bg-red-700 text-white rounded-md"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
