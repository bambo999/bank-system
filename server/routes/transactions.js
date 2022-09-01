const { Router } = require('express');
const { check } = require('express-validator');
const { CreateTransaction, GetTransactions, GetTransactionById } = require('../controllers/transactions');
const { isValidId, isValidTransaction } = require('../helpers/database-validations');
const validateFields = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


//Get all transactions
router.get('/', GetTransactions);

//Get transaction by id
router.get('/:id',[
	check('id').isMongoId(),
	check('id').custom(isValidTransaction)
], GetTransactionById);

//Create a transaction
router.post('/',[
	validateJWT,
	check('amount').notEmpty(),
	check('userTo').notEmpty(),
	check('userFrom').notEmpty(),
	
	validateFields
],CreateTransaction);






module.exports= router;