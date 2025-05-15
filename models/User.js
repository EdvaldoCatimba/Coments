const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const User = db.define("User",{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true
    },
})

module.exports = User;