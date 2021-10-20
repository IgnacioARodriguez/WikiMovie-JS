import { createAction, createReducer } from "@reduxjs/toolkit";

export const SetFavouriteMovies = createAction("SET_FAVOURITE_MOVIES");

const favouriteMovieReducer = createReducer([], {
    [SetFavouriteMovies]: (state, { payload: movies }) => {
        return movies;
    },
});

export default favouriteMovieReducer;