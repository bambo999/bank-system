const { generateJWT } = require('../helpers/generate-jwt');

const validateSession = async(req, res) => {
	
	const user = req.user
	const token = await generateJWT(user.id);

	res.json({
		token,
		user
	})

}

module.exports = {
	validateSession
};