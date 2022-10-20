const { User, validate } = require("../../../models/user");
const Token = require("../../../models/token");
const crypto = require("crypto");
const sendEmail = require("../../../utils/sendEmail");
const bcrypt = require("bcrypt");

//<================USER SIGN-UP========================>
const creatUsers = async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();

		const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
};



// <<==============EMAIL VERIFICATION========================>>
const getUserEmailVerification = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: " user Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		// console.log(userId)
		// console.log("token ",token(userId))
		if (!token) return res.status(400).send({ message: "token Invalid link" });

		await User.findByIdAndUpdate({ _id: user._id, verified: true });
		// await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};


// <========================employer sig-np============================ >

const Employer = require("../../../models/employers");

const createEmployer = async (req, res) => {

	try {

		let employer = await Employer.findOne({ email: req.body.email });
		if (employer)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		await new Employer({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "employer created successfully" });

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}




module.exports = { creatUsers, getUserEmailVerification ,createEmployer}