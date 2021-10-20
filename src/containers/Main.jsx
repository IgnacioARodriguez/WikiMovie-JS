import React from 'react'
import LastYearMovies from '../components/LastYearMovies'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import axios from 'axios'
import { setMovies } from '../store/LastYearMoviesReducer'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { setSelectedMovie } from '../store/selectedMovieReducer'
import SelectedMovie from '../components/SelectedMovie'
import { Login } from '../components/Login'
import { setUser } from '../store/UserLoggedInReducer'
import { useEffect } from 'react'
import { SetFavouriteMovies } from '../store/FavouritesReducer'
import { setSearchedUser } from '../store/searchedUserReducer'
import NavBarSelectedMovie from '../components/NavBarSelectedMovie'
import Users from '../components/Users'
import { GetFavouriteMovies } from '../store/GetFavouriteMovies'
import { Register } from '../components/Register'
import { toast } from 'react-toastify'
import { SetFavouriteMoviesSelectedUser } from '../store/FavouriteMoviesSelectedUser'
import SearchedUsers from '../components/SearchedUsers'
import { SetDBusers } from '../store/DBusers'

export const Main = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userLoggedIn = useSelector((state) => {
        return state.userLoggedIn.id
    })
    const movieSelected = useSelector((state) => {
        return state.selectedMovie
    })
    const favouriteMovies = useSelector((state) => {
        return state.favouriteMovies
    })
    const searchedUser = useSelector((state) => {
        return state.searchedUser
    })
    const usersInDb = useSelector((state) => {
        return state.DBusers
    })
    let searchValue;
    let usernameRegister;
    let emailRegister;
    let passwordRegister;
    let emailLogin;
    let passwordLogin;
    let searchUserValue;

    const handleChangeUserRegister = (e) => {
        usernameRegister = e.target.value
    }
    const handleChangeEmailRegister = (e) => {
        emailRegister = e.target.value
    }
    const handleChangePasswordRegister = (e) => {
        passwordRegister = e.target.value
    }
    const handleChangeEmailLogin = (e) => {
        emailLogin = e.target.value
    }
    const handleChangePasswordLogin = (e) => {
        passwordLogin = e.target.value
    }

    useEffect(() => {
        axios
            .get("/api/me")
            .then((res) => res.data)
            .then((user) => {
                dispatch(setUser(user))
            })
            .catch((e) => {
                console.log(e)
            });
    }, [])

    useEffect(() => {
        if (userLoggedIn)
            axios
                .get(`/api/favMovies?userId=${userLoggedIn}`)
                .then((res) => res.data)
                .then((user) => {
                    dispatch(SetFavouriteMovies(user))
                    console.log(movieSelected)
                })
                .catch((e) => {
                    console.log('MAAAAAL', userLoggedIn)
                    console.log(e)
                })
    }, [userLoggedIn])

    useEffect(() => {
        if (userLoggedIn)
            favouriteMovies.map((movie) => {
                return axios.get(`http://www.omdbapi.com/?i=${movie.link}&apikey=1c36a0b0`)
                    .then((res) => {
                        return res.data
                    })
                    .then((data) => {
                        dispatch(GetFavouriteMovies(data))
                    })
                    .catch(e => console.log(e))
            })
    })

    useEffect(() => {
        axios
            .get("/api/DBusers")
            .then((res) => res.data)
            .then((user) => {
                dispatch(SetDBusers(user))
            })
            .catch((e) => {
                console.log(e)
            });
    }, [])

    const handleChange = (e) => {
        searchValue = e.target.value
        return searchValue = searchValue.trim()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`http://www.omdbapi.com/?s=${searchValue}&apikey=1c36a0b0`)
            .then(response => {
                console.log(response)
                return response.data
            })
            .then(data => {
                dispatch(setMovies(data))

                history.push('/')
            })
            .catch(error => console.log(error));
    }

    const handleClick = (movieId) => {
        axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=1c36a0b0`)
            .then(response => {
                console.log(response.data)
                return response.data
            })
            .then(data => {
                dispatch(setSelectedMovie(data))
                // history.push('/')
            })
            .catch(error => console.log(error));
    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        for (let i = 0; i < usersInDb.length; i++) {
            if (usernameRegister === usersInDb[i]) {
                return toast.error(`Error en nombre de usuario repetido`)
            }
            if (emailRegister === usersInDb[i]) {
                return toast.error(`Error en Email repetido`)
            }
        }
        if (!usernameRegister) {
            return toast.error(`Error en nombre de usuario`)
        }
        if (!emailRegister) {
            return toast.error(`Error en Email`)
        } else {
            toast.success(`Signing you up!`)
            axios.post('/api/register', {
                email: emailRegister,
                username: usernameRegister,
                password: passwordRegister
            })
                .then((data) => {
                    toast.success(`Hola ${usernameRegister}!`)
                    dispatch(setUser(data.data))
                    history.push('/')
                })
                .catch((e) => {
                    console.log('Error', e)
                    toast.error(`Error en nombre de usuario o Email`)
                })
        }
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        toast.success(`Loging you in!`)
        axios.post('/api/login', {
            email: emailLogin,
            password: passwordLogin
        })
            .then((data) => {
                dispatch(setUser(data.data))
                history.push('/')
            })
            .then(() => {
                toast.success(`Bienvenido de nuevo!`)
            })
            .catch((e) => {
                toast.error('Intenta nuevamente...')
                console.log(e)
            })
    };

    const handleClickLogOut = () => {
        axios.post("/api/logout")
            .then(() => {
                dispatch(setUser({}))
                console.log('hola')
                toast.success(`Adios!`)
                history.push("/")
            })
            .catch((e) => { console.log(e) })
    };

    const addToFavorite = () => {
        if (!userLoggedIn) {
            toast.error('Debe estar logueado para agregar favoritos')
        } else {
            axios
                .post(`/api/favourite`, {
                    link: movieSelected.Poster,
                    userFavouriteId: userLoggedIn,
                    imdbId: movieSelected.imdbID
                })
                .then((res) => res.data)
                .then((data) => {
                    toast.success(`Agregado a favoritos!`)
                })
                .catch((e) => {
                    console.log(e)
                });
        }
    }

    const removeFromFavourites = () => {
        if (!userLoggedIn) {
            toast.error('Debe estar logueado para elimin favoritos')
        } else {
            axios.delete(`/api/favourite?movieSelected=${movieSelected.imdbID}`)
                .then(() => {
                    toast.success(`Eliminado de favoritos!`)
                })
                .catch((e) => {
                    console.log('ERROR REMOVIENDO', e)
                })
        }
    }

    const handleChangeUser = (e) => {
        searchUserValue = e.target.value
        return searchUserValue = searchUserValue.trim()
    }

    const handleSubmitUser = (e) => {
        e.preventDefault()
        axios.get(`/api/users?userName=${searchUserValue}`)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch(setSearchedUser(data))
                history.push('/users/searched')
            })
            .catch(error => {
                console.log(error)
            });
    }

    const handleClickFavourites = (userId) => {
        axios.get(`/api/userFavourites?userId=${userId}`)
            .then((res) => res.data)
            .then((data) => {
            })
            .catch(e => console.log(e))
    }

    const handleClickFavSelected = () => {
        axios.get(`/api/favMoviesSelectedUser?userId=${searchedUser.id}`)
            .then((data) => {
                return data.data
            })
            .then((data) => {
                dispatch(SetFavouriteMoviesSelectedUser(data))
            })
    }

    return (
        <div>
            <Switch>
                <Route exact path='/users/searched' render={() => {
                    return (
                        <div>
                            <NavBarSelectedMovie handleClickLogOut={handleClickLogOut}
                                handleChangeUser={handleChangeUser}
                                handleSubmitUser={handleSubmitUser}
                            >
                            </NavBarSelectedMovie>
                            <SearchedUsers handleClick={handleClick} handleClickFavSelected={handleClickFavSelected}>

                            </SearchedUsers>
                        </div>
                    )
                }} />
                <Route exact path='/users' render={() => {
                    return (
                        <div>
                            <NavBarSelectedMovie handleClickLogOut={handleClickLogOut}
                                handleChangeUser={handleChangeUser}
                                handleSubmitUser={handleSubmitUser}
                            >
                            </NavBarSelectedMovie>
                            <Users handleClick={handleClick} />
                        </div>
                    )
                }}>
                </Route>
                <Route path="/movie/:id" render={() => {
                    return (
                        <div>
                            <NavBar handleClickLogOut={handleClickLogOut}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                            <SelectedMovie addToFavourites={addToFavorite} removeFromFavourites={removeFromFavourites} />
                        </div>
                    )
                }} />
                <Route exact path="/" render={() => {
                    return (
                        <div>
                            <NavBar
                                handleClickLogOut={handleClickLogOut}
                                handleSubmit={handleSubmit}
                                handleChange={handleChange}

                            />
                            <LastYearMovies handleClick={handleClick} handleClickFavourites={handleClickFavourites} />
                        </div>
                    )
                }} />
                <Route exact path='/register' render={() =>
                    <div>
                        <NavBar
                            handleClickLogOut={handleClickLogOut}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}

                        />
                        <Register
                            handleChangeUserRegister={handleChangeUserRegister}
                            handleChangeEmailRegister={handleChangeEmailRegister}
                            handleChangePasswordRegister={handleChangePasswordRegister}
                            handleSubmitRegister={handleSubmitRegister}
                        />
                    </div>
                } />

                <Route exact path='/login' render={() => {
                    return <div>
                        <NavBar
                            handleClickLogOut={handleClickLogOut}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}

                        />
                        <Login
                            handleChangeEmailLogin={handleChangeEmailLogin}
                            handleChangePasswordLogin={handleChangePasswordLogin}
                            handleSubmitLogin={handleSubmitLogin}
                        />
                    </div>
                }} />
                <Redirect to="/" />
            </Switch>

        </div>
    )
}

export default Main
