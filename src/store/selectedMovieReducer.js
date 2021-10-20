import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSelectedMovie = createAction("SET_SELECTED_MOVIE");

const selectedMovieReducer = createReducer([], {
    [setSelectedMovie]: (state, { payload: movies }) => {
        return movies;
    },
});

export default selectedMovieReducer;