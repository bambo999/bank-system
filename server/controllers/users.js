const bcryptjs = require('bcrypt');
const User = require('../models/user');

const getAllUsers = async(req, res) => {

	const query = {status: true};

	const [ total, users ] = await Promise.all([
		User.countDocuments(query),
		User.find(query)
	])

	res.json({total, users});

}

const getUserById = async(req, res) => {

	const { id } = req.params;

	const user = await User.findById(id);

	if (user.status == false) {
		return res.json({msg: 'User not Found'});
	}

	res.json(user);

}

//CREATE USER
const createUsers = async(req, res) => {

	const {
		firstname,
		lastname,
		email,
		password,
		birthday,
		nationality,
		phone,
		amount,
		role
	} = req.body;


	let user = new User({
		firstname,
		lastname,
		email,
		password,
		birthday,
		nationality,
		phone,
		amount,
		role
	})

	//encrypt password
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);

	await user.save();
	
	res.json(user);

}

const updateUser = async(req = request, res = response) => {
	
	const { id } = req.params;
	
	const { password, ...data } = req.body;

	if (password) {
		const salt = bcryptjs.genSaltSync();
		data.password = bcryptjs.hashSync(password, salt);
	}
	
	const userUpdated =  await User.findByIdAndUpdate(id, data);

	res.json(userUpdated)
	
}

const deleteUser = async(req = request, res = response) => {

	const { id } = req.params;

	const userDeleted = await User.findByIdAndUpdate(id, {status: false}, {new: true});
	
	res.json({userDeleted});
}

module.exports = {
	getAllUsers,
	getUserById,
	createUsers,
	updateUser,
	deleteUser
};
