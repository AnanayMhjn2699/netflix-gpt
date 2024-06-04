import { useSelector } from "react-redux";
import MovieList from "./MovieList";

/* basic structure of secondary component i.e movielist and moviecard
movie list(now playig)
  movie card*n
movie list(featured)
  movie card*n
movie list(horror,etc)
  movie card*n
*/

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black w-full">
        <div className=" mt-0 md-only:-mt-20 md:-mt-32 lg:-mt-36 2xl:-mt-96 md:pl-2 relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;
