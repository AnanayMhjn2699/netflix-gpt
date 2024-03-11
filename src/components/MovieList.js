//this component renders the movie list and movie cards
import MovieCard from "./MovieCard";
//these props are being sent from secondaryContainer component
const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      {/* using arbitary values in tailwind css to hide the howizontal scrollbar of movieCards(added 3 bcoz to handle diff browsers) */}
      <div className="flex  overflow-x-scroll overscroll-x-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
