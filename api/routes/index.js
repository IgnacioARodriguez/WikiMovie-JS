const express = require("express");
const router = express.Router();
const User = require('../models/userModel')
const passport = require('passport');
const { Favourites } = require("../models");


router.post("/register", (req, res) => {
    User.create(req.body)
        .then((user) => {
            console.log(user)
            res.status(201).send(user);
        })
        .catch((err) => {
            res.send(err)
            console.error(err);
        });
});

router.get('/DBusers', (req, res) => {
    User.findAll()
        .then((data) => {
            res.send(data)
        })
        .catch(e => console.log(e))
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('hola')
    res.send(req.user)
})

router.post('/logout', function (req, res) {
    req.logout();
    console.log('intenta logout')
    res.redirect('/')
});

router.get("/me", (req, res) => {
    if (!req.user) {
        return res.sendStatus(401);
    }
    res.send(req.user)
});

router.post("/favourite", (req, res) => {
    const { link, userFavouriteId, imdbId } = req.body;
    Favourites.create({
        link: link,
        userFavouriteId: userFavouriteId,
        imdbId: imdbId
    })
        .then((favourite) => {
            res.status(201).send(favourite)
        })
        .catch((err) => console.log(err));
});

router.delete("/favourite", (req, res) => {
    const movieSelected = req.query.movieSelected
    Favourites.destroy({
        where: {
            imdbId: movieSelected
        }
    })
        .then((data) => {
            console.log('elimino')
            res.sendStatus(201)
            res.send(data)
        })
        .catch((err) => console.log('FALLA EN ROUTES', err));
});

router.get('/favMovies', (req, res) => {
    const userId = req.query.userId
    Favourites.findAll({
        where: {
            userFavouriteId: userId
        }
    })
        .then((data) => {
            res.send(data)
        })
        .catch(e => console.log('ESTE ES EL ERROR', e))
})

router.get('/favMoviesSelectedUser', (req, res) => {
    const userId = req.query.userId
    Favourites.findAll({
        where: {
            userFavouriteId: userId
        }
    })
        .then((data) => {
            console.log('holaaaa')
            res.send(data)
        })
        .catch(e => console.log(e))
})

router.get('/users', (req, res) => {
    const userName = req.query.userName
    User.findOne({
        where: {
            username: userName
        }
    })
        .then((data) => {
            res.send(data)
        })
})

router.get('/userFavourites', (req, res) => {
    const userId = req.query.userId
    Favourites.findAll({
        where: {
            userFavouriteId: userId
        }
    })
        .then((data) => {
            res.send(data)
        })
        .catch((e) => console.log(e))
})





module.exports = router