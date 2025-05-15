const {DataTypes} = require('sequelize');
const db = require('../db/conn');
const User = require('./User');
const Comments = db.define('Comments',{


    title:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    comment:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,
        require: true
    }
})

User.hasMany(Comments);
Comments.belongsTo(User)

module.exports = Comments;