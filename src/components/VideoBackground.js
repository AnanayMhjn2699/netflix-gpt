import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  //this trailerVideo is coming form movie slice bcoz it is containing the trailer data
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  //this custom hook will fetch the video data from tmdb video api and also filter that data to give
  //us the trailer video and updating the store with trailer video data, so that the data can be accessed
  //from store using useSelector hook in line 6.
  useMovieTrailer(movieId);

  return (
    <div className=" w-screen">
      {/* this is the embed code from youtube to get video of particular key(this is unique to every vido)
     inside my component */}
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
          // autoplay and mute options are added to url to give the video the respective features
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};
export default VideoBackground;
