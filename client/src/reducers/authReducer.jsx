import { types } from "../types/types";

const initialState = {
	checking: true
}

export const authReducer = (state = initialState, action) => {
	
	switch (action.type) {
	
		case types.login:
			return {
				...state,
				// ...action.payload,
				email: action.payload.email,
				user: action.payload.user,
				balance: action.payload.balance,
				id: action.payload.id,
				phone: action.payload.phone,
				role: action.payload.role,
				birthday: action.payload.birthday,
				nationality: action.payload.nationality,
				status: action.payload.status,
				checking: false
			}
		

		case types.logout:
			return {
				checking: false 
			};

		case types.finishCheckingToken:
			return {
				checking: true
			}

		default:
			return state;
	}

}