import { types } from "../types/types"

const initialState = {

}

export const adminReducer = (state = initialState, action) =>{
	switch (action.type) {

		case types.getUsers:
			return {
				...state,
				total: action.payload.total,
				users: action.payload.users
			}	

	default:
		return state
	}
}
