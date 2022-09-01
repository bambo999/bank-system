const isAdminRole = (req, res, next) => {
	
	if (!req.user) {
		return res.status(500).json({
			error: 'start the session to validate admin role'
		});
	}

	const { role, firstname, lastname } = req.user;

	if (role !== 'ADMIN_ROLE') {
		return res.status(403).json({
			msg: `The user ${firstname} ${lastname} is not an administrator.`
		})
	}

	next();

}


module.exports = {
	isAdminRole
}
