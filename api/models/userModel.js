const { DataTypes, Model } = require("sequelize");
const crypto = require("bcrypt");
const sequelize = require("../db");

class User extends Model { }

User.init(
    {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize: sequelize,
        modelName: "users",
    }
);


User.addHook("beforeCreate", function (user) {
    return crypto.genSalt(16)
        .then((salt) => {
            user.salt = salt;
            return crypto.hash(user.password, user.salt);
        })
        .then((passHashed) => {
            user.password = passHashed
            console.log(passHashed)
        });
});

User.prototype.hashPass = function (password, salt) {
    return crypto.hash(password, salt);
};

User.prototype.validPassword = function (password, salt) {
    return this.hashPass(password, salt).then((pass) => {
        return this.password === pass;
    });
};

module.exports = User;