const sequelize = require('../connection/db');

const { DataTypes, Model } = require('sequelize');

class Movie extends Model{}

Movie.init({
    id: {type:DataTypes.INTEGER, unique: true, allowNull:false, primaryKey:true, autoIncrement:true},
    user_id:{type:DataTypes.INTEGER, allowNull:false},
    movie_id:{type:DataTypes.INTEGER, allowNull:false}
},{
    modelName: "movie_table",
    sequelize,
    tableName: "movie_table",
    timestamps:false
})

module.exports = Movie
