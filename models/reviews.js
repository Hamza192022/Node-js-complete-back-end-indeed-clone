const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	companyId: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
	overallCompanyRatingByReviewer: { type: Number },
	reviewTitle: { type: String },
	pros: {
		type: String,
	},
	cons: {
		type: String,
	},
});

const Reviews = mongoose.model("review", reviewsSchema);

module.exports= Reviews;
