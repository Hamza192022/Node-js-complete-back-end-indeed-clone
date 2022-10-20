const express = require("express");
const routers = express.Router()
const {createEmployer,getReviewsByEmployer} = require("../controller/employer_controller");


routers.post("/", createEmployer)
routers.get("/", getReviewsByEmployer)

module.exports =  routers