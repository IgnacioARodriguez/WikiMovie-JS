import { createAction, createReducer } from "@reduxjs/toolkit";

export const GetFavouriteMovies = createAction("GET_FAVOURITE_MOVIES");

const getFavouriteMovieReducer = createReducer([], {
    [GetFavouriteMovies]: (state, { payload: movies }) => {
        return movies;
    },
});

export default getFavouriteMovieReducer;