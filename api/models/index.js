const Users = require('./userModel')
const Favourites = require('./favouritesModel')

Favourites.belongsTo(Users, { as: 'userFavourite', through: 'favourite_movies' })

module.exports = {
    Users,
    Favourites
}