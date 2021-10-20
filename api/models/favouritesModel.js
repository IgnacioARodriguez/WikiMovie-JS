const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Favourites extends Model { }

Favourites.init(
    {
        link: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        imdbId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            // primaryKey: true
        }
    },
    {
        sequelize: sequelize,
        modelName: "favourites",
    }
);

module.exports = Favourites;