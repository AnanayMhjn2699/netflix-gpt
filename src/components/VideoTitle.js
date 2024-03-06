//this component shows the video's title and description and props are being sent from
// mainContainer component

import { useDispatch } from "react-redux";
import { addClickedMovieId } from "../utils/movieslice";
import { useNavigate } from "react-router-dom";

const VideoTitle = ({ title, overview, movieId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 pl-20 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/2">{overview}</p>
      <div className="my-4 md:m-0">
        <button
          onClick={() => {
            dispatch(addClickedMovieId(movieId));
            navigate("/movie");
          }}
          className=" bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl  rounded-lg hover:bg-opacity-80"
        >
          ▶ Play
        </button>
        <button className="hidden md:inline-block mx-2  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
          🛈 More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
