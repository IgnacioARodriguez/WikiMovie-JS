// server configs
const express = require("express");
const morgan = require("morgan");
const rutas = require('./routes')
const db = require("./db");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/userModel')
const crypto = require('bcrypt')

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors())
app.use(cookieParser()); // popula req.cookie
app.use(session({ secret: "OMDB" })) // popula req.session

app.use(passport.initialize());
app.use(passport.session());


passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        function (email, password, done) {
            Users.findOne({
                where: {
                    email: email
                }
            })
                .then((user) => {
                    if (!user) {
                        return done(null, false);
                    }
                    crypto.hash(password, user.salt).then((hash) => {
                        if (hash !== user.password) {
                            return done(null, false);
                        }
                        done(null, user);
                    });
                })
                .catch(done);
        }
    )
);


passport.serializeUser(function (user, done) {
    done(null, user.id);
});


passport.deserializeUser(function (id, done) {
    Users.findByPk(id)
        .then(user => done(null, user))
});


app.use("/api", rutas)


const PORT = process.env.PORT || 3001;


db.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`server listenning on port ${PORT}`));
})