require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./modules/sign_up/router/users");
const authRoutes = require("./modules/log_in/router/auth");
const {invalid_Route_Error,invalid_Server_Error} = require("./error_Handling/error_handling")
const createCompany = require("./modules/companyDetails/router/company_router")
const createEmployer = require("./modules/employerDetails/router/employer_router")
const postReviews = require("./modules/companyreviews/router/review_router")
// <================database connection==============>
connection();

// <================middlewares=======================>
app.use(express.json());
app.use(cors());

// <=================routes=============================>
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/companyDetails", createCompany);
app.use("/api/employerDetails", createEmployer);
app.use("/api/reviews", postReviews);

//<==================ERROR HANDLING========================>
app.use(invalid_Route_Error)
app.use(invalid_Server_Error)


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
