import { fetchConToken, fetchSinToken } from "../helpers/fetchHelper";
import { types } from "../types/types"


export const startGettingUsers = () => {
	return async( dispatch ) => {
		const resp = await fetchSinToken('users/');

		const body = await resp.json();

		const { total, users } = body;

		dispatch(getUsers({total, users}));
	}
}

const getUsers = (total, users) => ({
	type: types.getUsers,
	payload: {
		total,
		users
	}
})


export const startDeletingUser = ( id ) => {
	
	return async( dispatch ) => {
		
		const resp = await fetchConToken(`users/${id}`, {},'DELETE');
		const body = await resp.json();
	
		// console.log(body);
		await dispatch(deleteUser());
		await dispatch(startGettingUsers());
	}
}


export const deleteUser = () => ({ type: types.deleteUser })