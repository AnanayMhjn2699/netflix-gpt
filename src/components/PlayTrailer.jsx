// import { useEffect, useState } from "react";
// import { API_OPTIONS } from "../utils/constants";

// const PlayTrailer = ({ movieId }) => {
//   const [trailerKey, setTrailerKey] = useState("");

//   useEffect(() => {
//     const getMovieVideos = async () => {
//       const data = await fetch(
//         "https://api.themoviedb.org/3/movie/" +
//           movieId +
//           "/videos?language=en-US",
//         API_OPTIONS
//       );
//       const json = await data.json();

//       const filterData = json.results.filter(
//         (video) => video.type === "Trailer"
//       );

//       const trailer = filterData.length ? filterData[0] : json.results[0];
//       setTrailerKey(trailer.key);
//     };
//     getMovieVideos();
//   }, [movieId]);

//   return (
//     <div className="absolute top-[50vh] left-[30%]">
//       {/* this is the embed code from youtube to get video of particular key(this is unique to every vido)
//          inside my component */}
//       <iframe
//         className="w-[200%] aspect-video"
//         src={
//           "https://www.youtube.com/embed/" + trailerKey + "?&autoplay=1&mute=1"
//           // autoplay and mute options are added to url to give the video the respective features
//         }
//         title="YouTube video player"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//       ></iframe>
//     </div>
//   );
// };
// export default PlayTrailer;

import { useSelector } from "react-redux";
import useClickedMovieTrailer from "../hooks/useClickedMovieTrailer";
const PlayTrailer = () => {
  useClickedMovieTrailer();

  const clickedMovieTrailer = useSelector(
    (store) => store.movies.clickedMovieTrailer
  );

  return (
    <div className="h-screen ">
      {/* this is the embed code from youtube to get video of particular key(this is unique to every vido)
     inside my component */}
      <iframe
        className="w-full h-full"
        src={
          "https://www.youtube.com/embed/" +
          clickedMovieTrailer?.key +
          "?&autoplay=1&mute=1"
          // autoplay and mute options are added to url to give the video the respective features
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default PlayTrailer;
