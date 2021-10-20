import { createAction, createReducer } from "@reduxjs/toolkit";

export const SetDBusers = createAction("SET_DB_USERS");

const DBusersReducer = createReducer([], {
    [SetDBusers]: (state, { payload: movies }) => {
        return movies;
    },
});

export default DBusersReducer;