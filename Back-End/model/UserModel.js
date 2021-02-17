const sequelize = require('../connection/db');

const { DataTypes, Model } = require('sequelize');

class User extends Model{}

User.init({
    id: {type:DataTypes.INTEGER, unique: true , allowNull: false, primaryKey: true,  autoIncrement: true},
    user_name: {type:DataTypes, allowNull: false},
    password:{type:DataTypes.STRING, allowNull: false},
    email:{type:DataTypes.STRING, allowNull: false},
},{
    modelName: "user_table",
    sequelize,
    tableName: "user_table",
    timestamps:false
})

module.exports = User

