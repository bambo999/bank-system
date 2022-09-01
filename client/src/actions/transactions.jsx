import { fetchSinToken, transactionFetch } from "../helpers/fetchHelper";
import { types } from "../types/types";


export const startCreatingTransaction = (amount, userFrom, userTo) => {
	return async(dispatch) => {
		
		const resp = await transactionFetch(`transactions/`, { amount, userFrom, userTo }, 'POST');
		const body = await resp.json();

		const { amountLess, amountTo } = body;


		dispatch(creatingTransaction({
			amount, userFrom, userTo, amountLess, amountTo
		}));

	}
}

export const startGettingTransactions = () => {
	return async( dispatch ) => {
		
		const resp = await fetchSinToken('transactions/');
		const body = await resp.json();

		const transactions = body;

		dispatch( getTransactions( transactions ));

	}
}

const creatingTransaction = (amount, userFrom, userTo, amountLess, amountTo) => ({
	type: types.creatingTransaction,
	payload: {
		amount, userFrom, userTo, amountLess, amountTo
	}
})

const getTransactions = ( transactions ) => ({
	type: types.getTransactions,
	payload: {
		transactions
	}
})

