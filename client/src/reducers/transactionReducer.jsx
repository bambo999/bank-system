import { types } from "../types/types";


const initialState = {
	lastTransaction: {},
	getTransactions:{}
}

export const transactionReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.creatingTransaction:
			
			return{
				...state,
				lastTransaction: action.payload.amount
			}
		
		case types.getTransactions:
			return{
				...state,
				getTransactions: action.payload
			}

		default:
			return state;
	}
}