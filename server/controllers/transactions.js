const Transaction = require('../models/transaction');
const User = require('../models/user');

const GetTransactions = async(req, res) => {

	const [ transactions, total ] = await Promise.all([
		Transaction.find(),
		Transaction.countDocuments()
	]);
	
	res.json({
		total,
		transactions
	});
}

const GetTransactionById = async(req, res) => {

	const { id } = req.params;
	const transaction = await Transaction.findById( id );

	res.json({transaction: transaction});
}


const CreateTransaction = async(req, res = response) => {
	
	let { amount, userTo, userFrom } = req.body;


	//user transaction
	let userTransactionTo = await User.findById(userTo);
	let UserTransferedMoney = await User.findById(userFrom);

	
	if (userTransactionTo.amount < 0) {
		return res.status(401).json({
			msg: `Insufficient funds for transaction`
		});
	};

	
	if (!userTransactionTo._id) {
		return res.status(401).json({
			msg: 'ID doesnt exists'
		});
	};


	//Transaction arithmetic Logic
	const amountLessTransaction = userTransactionTo.amount = userTransactionTo.amount - amount;
	const amountPlusTransaction = UserTransferedMoney.amount = UserTransferedMoney.amount + amount;

	//Update DB
	await User.findByIdAndUpdate(UserTransferedMoney.id, { ...UserTransferedMoney ,amountPlusTransaction}, {new: true});
	await User.findByIdAndUpdate(userTransactionTo.id, { ...userTransactionTo ,amountLessTransaction}, {new: true});
	
	const userId = UserTransferedMoney.id
	const user = userTransactionTo;
	
	// Create transaction
	const transaction = new Transaction({
		user,
		amount,
		userId,
		msg: 'Please contact with the bank.'
	});

	await transaction.save();
	
	//Return the transaction
	res.json({
		transaction,
		amountTo: amountPlusTransaction,
		amountLess: amountLessTransaction
	});

}

module.exports = {
	GetTransactions,
	GetTransactionById,
	CreateTransaction,

};