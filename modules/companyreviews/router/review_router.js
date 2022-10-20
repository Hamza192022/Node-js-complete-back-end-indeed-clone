const express = require("express");
const routers = express.Router()
const postReviews = require("../controller/review_controller");


routers.post("/", postReviews)

module.exports =  routers