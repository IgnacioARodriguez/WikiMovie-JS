import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSearchedUser = createAction("SET_SEARCHED_USER");

const searchedUserReducer = createReducer([], {
    [setSearchedUser]: (state, { payload: user }) => {
        return user;
    },
});

export default searchedUserReducer;