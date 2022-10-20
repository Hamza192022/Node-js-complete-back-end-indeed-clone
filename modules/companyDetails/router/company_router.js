const express = require("express");
const routers = express.Router()
const createCompany = require("../controller/company_controller");


routers.post("/", createCompany)

module.exports =  routers