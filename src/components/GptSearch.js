//this component renders a search bar and the suggestions on the page
import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <>
      <div className="">
        <img
          className="fixed -z-10 h-screen md:w-screen object-cover"
          src={BG_URL}
          alt="logo"
        />
      </div>
      <div className="pt-6">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};
export default GptSearch;
