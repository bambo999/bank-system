const jwt = require('jsonwebtoken');
const User = require("../models/user");

const validateJWT = async(req, res, next) => {
	
	const token = req.header('authToken');

	
	if (!token) {
		return res.status(401).json({
			error: 'You need to start the session if you want to continue'
		})
	}
	
	try {
		
		const { id } = jwt.verify(token, process.env.JWT_SECRETKEY);

		const user = await User.findById(id);

		if (!user) {
			return res.status(400).json({
				error: 'The user does not exist'
			})
		}

		if (!user.status) {
			return res.status(400).json({
				error: 'The user does not exist'
			})			
		}

		//creating a value user in the request
		req.user = user;

		next();

	} catch (error) {
		console.log(error);
		return res.status(400).json({
			error: `Invalid Token.`
		});
	}

}


module.exports = {
	validateJWT
}