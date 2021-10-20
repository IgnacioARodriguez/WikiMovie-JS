import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const userReducer = createReducer([], {
    [setUser]: (state, { payload: user }) => {
        return user;
    },
});

export default userReducer;