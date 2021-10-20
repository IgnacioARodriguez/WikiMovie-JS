import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import DBusersReducer from "./DBusers";
import favouriteMovieSelectedUserReducer from "./FavouriteMoviesSelectedUser";
import favouriteMovieReducer from "./FavouritesReducer";
import getFavouriteMovieReducer from "./GetFavouriteMovies";
import moviesReducer from "./LastYearMoviesReducer";
import searchedUserReducer from "./searchedUserReducer";
import selectedMovieReducer from "./selectedMovieReducer";
import userReducer from "./UserLoggedInReducer";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        movies: moviesReducer,
        selectedMovie: selectedMovieReducer,
        userLoggedIn: userReducer,
        favouriteMovies: favouriteMovieReducer,
        searchedUser: searchedUserReducer,
        getFavouriteMovies: getFavouriteMovieReducer,
        favouriteMoviesSelectedUser: favouriteMovieSelectedUserReducer,
        DBusers: DBusersReducer
    },
});

export default store