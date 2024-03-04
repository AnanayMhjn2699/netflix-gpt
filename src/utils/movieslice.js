import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    trailerVideo: null,
    topRatedMovies: null,
    clickedMovieTrailer: null,
    clickedMovieId: "",
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addClickedMovieTrailer: (state, action) => {
      state.clickedMovieTrailer = action.payload;
    },
    addClickedMovieId: (state, action) => {
      state.clickedMovieId = action.payload;
    },
  },
});

export default movieSlice.reducer;

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addClickedMovieTrailer,
  addClickedMovieId,
} = movieSlice.actions;
