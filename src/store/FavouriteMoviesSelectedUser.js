import { createAction, createReducer } from "@reduxjs/toolkit";

export const SetFavouriteMoviesSelectedUser = createAction("SET_FAVOURITE_MOVIES_SELECTED_USER");

const favouriteMovieSelectedUserReducer = createReducer([], {
    [SetFavouriteMoviesSelectedUser]: (state, { payload: movies }) => {
        return movies;
    },
});

export default favouriteMovieSelectedUserReducer;