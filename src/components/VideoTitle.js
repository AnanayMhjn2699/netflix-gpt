//this component shows the video's title and description and props are being sent from
// mainContainer component

import { useDispatch } from "react-redux";
import { addClickedMovieId } from "../utils/movieslice";
import { useNavigate } from "react-router-dom";

const VideoTitle = ({ title, overview, movieId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="aspect-video md-laptop:aspect-auto md-laptop:h-screen min-w-[447px]:max-w-[767px]:h-screen  pt-[15%] px-6 pl-4 md:px-10 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-lg md:text-3xl lg:text-6xl">{title}</h1>
      <p className="hidden xl:inline-block py-6 text-lg w-1/2"><p className="line-clamp-4">{overview}</p></p>
      <div className="my-4 xl:m-0">
        <button
          onClick={() => {
            dispatch(addClickedMovieId(movieId));
            navigate("/movie");
          }}
          className=" bg-white text-black py-1 lg:py-4 px-3 lg:px-12 max-sm:h-7 max-sm:w-18 max-[768px]:h-12 max-[768px]:w-32 text-sm md:text-lg lg:text-xl  rounded-lg hover:bg-opacity-80"
        >
          ▶ Play
        </button>
        <button className="hidden md:inline-block mx-2  bg-gray-500 py-1 lg:py-4 px-3 lg:px-12 max-[768px]:h-12 max-[768px]:w-32 text-white text-sm md:text-lg lg:text-xl bg-opacity-50 rounded-lg">
          🛈 More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
