const express = require("express");
const router = express.Router();
const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const webToken = require("jsonwebtoken");
require("dotenv").config();

/* Register API - Endpoint */
router.post("/register", (req, res) => {
    const {username, password, email} = req.body;

    if (username == undefined || username == '' ||
    password == undefined || password == '' ||
    email == undefined || email == '') {
        res.status(401).json({
            message: "Fill all fields",
            status:res.statusCode
        });
    } else {
        /* check the email whether already registered or not in database using model */
        UserModel.findOne({
            attributes: ["user_name"],
            where: {
              email
            }
        }).then((value) => {
            if(value === null) {
            /* if no data found create a new record in db with hashed password */
                bcrypt.genSalt(10, function (err, salt){
                    bcrypt.hash(password,salt,(err, hash) => {
                        /* create record */
                        UserModel.create({
                            user_name: username,
                            email: email,
                            password:hash
                        }).then((value) => {
                            res.status(200).json({
                                message: "Account Created Successfully",
                                status: res.statusCode
                            })
                        }).catch(err => res.status(404).json({
                            message: "Account Creation Unsuccessful"
                        }))
                    })
                })
            } else {
                res.status(401).json({
                    message: "Email already in use",
                    status:res.statusCode})
            }
        })
    }
});

/* Login API - Endpoint */
router.post("/login", function (req, res) {
    const { password, email } = req.body;

    if (
        password == "" || password == undefined ||
        email == "" || email == undefined
    ) {
        res.status(401).json({
            message: "Fill All Fields",
            status: res.statusCode,
        });

    } else {
        /* check the email whether already registered or not in database using model */

        UserModel.findOne({
            where: {
                email,
            },
        }).then((value) => {
            if (value === null) { /* If email is not registered */
                res.status(401).json({
                    message: "Email is not Registered Please SignUp",
                    status: res.statusCode,
                    token: ''
                });
            } else {
                console.log(value);
                /* Check if password is correct */
                const dbPassword = value.getDataValue("password");

                const userDetail = {
                    name: value.getDataValue("user_name"),
                    id: value.getDataValue("id"),
                };

                /* Compare passwords */
                bcrypt.compare(password, dbPassword, function (err, result) {
                    if (result) { /* Success */
                        const token = webToken.sign(userDetail, process.env.secret_key, {
                            expiresIn: "60s",
                        });
                        res.status(200).json({
                            message: "Logged In successfully",
                            status: res.statusCode,
                            token,
                        });
                    } else { /* Failure */
                        res.status(401).json({
                            message: "Invalid Credentials given",
                            status: res.statusCode,
                            token: ''
                        })
                    }
                });
            }
        });
    }
});

/* get UserProfile API - Endpoint */
router.get("/profile", function (req, res) {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
        const token = authHeader.substr("Bearer".length + 1).replace(/['"]+/g, '');

        webToken.verify(token, process.env.secret_key, (err, user) => {
            if (user) {
                return res
                    .status(200)
                    .json({
                        status: res.statusCode,
                        data: user,
                        message: "success"
                    });
            } else {
                res.status(401).json({
                    status: res.statusCode,
                    message: "Please Login, Token Expired"
                });
            }
        });
    } else {
        res.status(401).json({
            status: res.statusCode,
            message: "Please Login, No Bearer Token"
        });
    }
});

module.exports = router
