const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
	role: {
		type: String,
		required: [true, 'The role is required']
	}
});

module.exports = mongoose.model('Role', roleSchema);