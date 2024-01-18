//this custom hook will fetch the video data from tmdb video api and also filter that data to give
//us the trailer video and updating the store with trailer video data
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieslice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  //just checking once if the trailer data is already fetched and stored or not
  //and if it is already there then no need to do anything (see that in useEffect below)
  //this is being done to save api call from being made un-necessarily
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
};

export default useMovieTrailer;
