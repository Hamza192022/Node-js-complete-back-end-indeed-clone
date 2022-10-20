const { User } = require("../../../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const Token = require("../../../models/token");
const crypto = require("crypto");
const sendEmail = require("../../../utils/sendEmail");

const  checkUser_login = async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

//<=================EMAIL VERIFICATIONS=====================>

		if (!user.verified) {
			let token = await Token.findOne({ userId: user._id });
			if (!token) {
				token = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
				await sendEmail(user.email, "Verify Email", url);
			}

			return res
				.status(400)
				.send({ message: "An Email sent to your account please verify" });
		}
//<=======================================================================>
		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
} 
const validate = () => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate();
};




// <===================employer login==============================>
const Employer  = require("../../../models/employers");

const  checkEmployer_login = async (req, res) =>{
	try{
		const employer = await Employer.findOne({ email: req.body.email });
		console.log("employer are you love ",employer);
		if (!employer)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			employer.password
			);
		console.log("test", req.body.password);
		console.log("test employer", employer.password);
			console.log("valid password",validPassword);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
		const token = employer.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });

	}catch(error){
		res.status(500).send({ message: "Internal Server Error " });
	}

}

module.exports  = {checkUser_login,checkEmployer_login}