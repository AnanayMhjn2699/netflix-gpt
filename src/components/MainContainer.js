import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

//will show the video background and video title
const MainContainer = () => {
  //subscribing the store to get movies data from it and will be displaying in background
  //the first nowPlaying movie
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return; //jsut checking once whether we are able to get the data from the store

  const mainMovie = movies[0];

  const { original_title, overview, id } = mainMovie; //destructuring on fly the object we got at 0th index
  //to get the required data

  return (
    <div className="pt-[30%] md:pt-[5%] md-only:pt-[17%] bg-black">
      <VideoTitle title={original_title} overview={overview} movieId={id} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
