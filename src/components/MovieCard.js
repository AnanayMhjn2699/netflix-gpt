//this component renders the movie cards in list under diff categories

import { IMG_CDN_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addClickedMovieId } from "../utils/movieslice";
//posterPath prop is being sent by movieList component and it is the unique path of movie's poster
const MovieCard = ({ movieId, posterPath }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4 overflow-y-hidden">
      <img
        className="hover:scale-110 transition duration-500 cursor-pointer"
        onClick={() => {
          dispatch(addClickedMovieId(movieId));
          navigate("/movie");
        }}
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};
export default MovieCard;
