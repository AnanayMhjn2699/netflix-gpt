import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addClickedMovieTrailer } from "../utils/movieslice";

const useClickedMovieTrailer = () => {
  const dispatch = useDispatch();
  const movieId = useSelector((store) => store.movies.clickedMovieId);

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
    dispatch(addClickedMovieTrailer(trailer));
  };
  useEffect(() => {
    getMovieVideos();
  }, [movieId]);
};
export default useClickedMovieTrailer;
