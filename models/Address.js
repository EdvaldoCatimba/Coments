const {DataTypes} = require('sequelize');
const db = require('../db/conn');
const User = require('./User');

const Address = db.define('Address',{
    country:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    city:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    street:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

User.hasMany(Address);
Address.belongsTo(User)


module.exports = Address;
