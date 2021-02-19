const express = require("express");
const router = express.Router();
const MovieModel = require("../model/MovieModel");
require("dotenv").config();

/* Upsert Movie API - Endpoint*/
router.post("/upsert", (req, res) => {
    const { userid, movieid } = req.body;
    console.log(userid, movieid);
    let user_id = userid; /* for table column */
    let movie_id = movieid;

    if (userid == undefined || userid == '' ||
        movieid == undefined || movieid == '') {
        res.status(401).json({
            message: "Movie Info Incomplete, Please Fill all fields",
            status:res.statusCode
        });
    } else {
        /* check the movie whether it already upserted or not in database using model */
        MovieModel.findOne({
            attributes: ["movie_id", "user_id"],
            where: {
                movie_id,
                user_id
            }
        }).then((value) => {
            if(value === null) {
                /* if no data found create a new record in db */
                MovieModel.create({
                    user_id: userid,
                    movie_id: movieid
                }).then((value) => {
                    res.status(200).json({
                        message: "Movie Favourite Created Successfully",
                        status: res.statusCode
                    })
                }).catch(err => res.status(404).json({
                    message: "Movie Favourite Creation Unsuccessful"
                }))
            } else {
                res.status(401).json({
                    message: "Movie already liked",
                    status:res.statusCode})
            }
        })
    }
});

/* Fetch All Movies API - Endpoint */
router.get("/getAll", (req, res) => {
    const userid = req.query.userid;
    let user_id = userid;

    if (userid == undefined || userid == '') {
        res.status(401).json({
            message: "UserId empty, please provide UserId",
            status:res.statusCode
        });
    } else {
        MovieModel.findAll({
            where: {
                user_id
            }
        }).then((value) => {

            if (value.length === 0) {
                res.status(404).json({
                    data: value,
                    message: "No movies found for user",
                    status: res.statusCode
                })
            } else {
                return res.status(200)
                    .json({
                        status: res.statusCode,
                        data: value,
                        message: "Success!"
                    });
            }
        })
    }
});

/* Delete One Movie API - EndPoint */
router.post("/delete", (req, res) => {
    const { userid, movieid } = req.body;
    let user_id = userid;
    let movie_id = movieid;

    if (movieid == undefined || movieid == '' ||
        userid == undefined || userid == '') {
        res.status(401).json({
            message: "MovieId or UserId empty, please provide required fields",
            status:res.statusCode
        });
    } else {
        MovieModel.destroy({
            attributes: ["user_id","movie_id"],
            where: {
                user_id,
                movie_id
            }
        }).then((value) => {
            if (value > 0) {
                res.status(200).json({
                    message: "Deletion Successful",
                    status: res.statusCode
                })
            } else {
                res.status(404).json({
                    message: "MovieId not found",
                    status: res.statusCode
                })
            }
        })
    }
});

module.exports = router
