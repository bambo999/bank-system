const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	amount: {
		type: Number,
		default: 100,
		required: [true, 'Send money to make transaction']
	},
	userId: {
		type: String,
		// ref: 'User',
		required: [true, 'Please input beneficiary account ID']
	}
});



module.exports = mongoose.model('Transaction', TransactionSchema);
