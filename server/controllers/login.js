const bcryptjs = require('bcrypt')
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const loginController = async(req, res) => {
	//input login data
	const { email, password } = req.body;

	try {
		const userDb = await User.findOne({email});
		
		//validate if the user exists
		if (!userDb.email) {
			return res.status(400).json({
				error: 'Incorrect Email or Password'
			})
		}

		if (!userDb.status) {
			return res.status(400).json({
				error: 'User does not exist, please create a new user'
			})
		}

		const validPassword = bcryptjs.compareSync(password, userDb.password);
		if (!validPassword) {
			return res.status(400).json({
				error: 'Incorrect password. Please enter a valid password'
			})
		}

		//create JWT
		const token = await generateJWT(userDb.id);

		//Send the token and the user
		res.json({
			msg: 'Login Successfully',
			token,
			user:{
				user: `${userDb.firstname} ${userDb.lastname}`,
				email: userDb.email,
				balance: userDb.amount,
				id: userDb.id,
				role: userDb.role,
				...userDb._doc
			}
		})
		
	} catch (error) {
		console.log(error);
	}


}

module.exports = {
		loginController
};