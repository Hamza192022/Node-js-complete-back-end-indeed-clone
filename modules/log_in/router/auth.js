const router = require("express").Router();
// const { User } = require("../models/user");
// const bcrypt = require("bcrypt");
const Joi = require("joi");
// const Token = require("../models/token");
// const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail");
const {checkUser_login, checkEmployer_login} = require("../controller/auth_login")

router.post("/", checkUser_login);
router.post("/employer", checkEmployer_login);


module.exports = router;
