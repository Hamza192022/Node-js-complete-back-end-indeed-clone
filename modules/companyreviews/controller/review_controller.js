const Reviews =require("../../../models/reviews")

const postReviews = async (req, res) => {
    try {
        console.log(req.body);
        const user = new Reviews(req.body);

        const result = await user.save()
        console.log("USER REVIEWS SUBMITTED" ,result);
        res.status(201).send(result)
    } catch (e) { res.status(400).send(e) }
}


module.exports = postReviews