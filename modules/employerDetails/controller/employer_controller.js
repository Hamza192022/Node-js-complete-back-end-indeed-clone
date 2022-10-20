const Employer =require("../../../models/employers")
const Reviews = require("../../../models/reviews")

//<================create employer=========================>
const createEmployer = async (req, res) => {
    try {
        console.log(req.body);
        const user = new Employer(req.body);

        const result = await user.save()
        console.log("company create successfully" ,result);
        res.status(201).send(result)
    } catch (e) { res.status(400).send(e) }
}

// <================employer get reviews against user ====================>
const getReviewsByEmployer = async(req,res)=>{
    try{
       const getresult= await Reviews.find()
        .populate({ path: 'userId', model: 'user', select: '-_id firstName lastName email' })
            .populate({ path: 'companyId', model: 'company', select: '-_id companyNmae companyWebsite company_email' });
       
       res.send(getresult)
    }catch(e){console.log(e);}
}

module.exports = {createEmployer,getReviewsByEmployer}