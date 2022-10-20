const mongoose = require("mongoose");
const validator = require("validator");


const companyScheme = new mongoose.Schema({

    companyNmae : {
        type: String,
        required: true,
        unique: [true , " Company Name already present"]
    },

    companyWebsite : String,

    companyType : String,

    companyAverage_Rating : {
        type : Number,
        required : true,
    },

    company_Description  : {
        about : String,
        visions : String,
    },
    company_Location :{
        city : String,
        state : String,
        street : String,
    },
    company_email :{
        type : String, 
        required:true,
        unique : [true , " Email already present"],
        validator(value){
            if(!validator.isEmail(value)){
                throw  new Error("INVALID EMAIL");
            }
        }
    },

})

// <============create collection============>
const Company = new mongoose.model("company",companyScheme);

module.exports=Company