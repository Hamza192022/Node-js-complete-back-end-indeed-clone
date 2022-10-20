const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

const Schema = mongoose.Schema;

const employerSchema = new Schema({

	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "company",
	},
	firstName: { type: String },
	lastName: { type: String },
	email :{
        type : String, 
        required:true,
        unique : [true , " Email already present"],
        validator(value){
            if(!validator.isEmail(value)){
                throw  new Error("INVALID EMAIL");
            }
        }
    },
	password: { type: String, required: true },
	companyName: { type: String },
	contactNumber: { type: String },
});


employerSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const Employer = mongoose.model("employer", employerSchema);

module.exports= Employer;
