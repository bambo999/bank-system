import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { authReducer } from "./authReducer";
import { transactionReducer } from "./transactionReducer";

export const rootReducers = combineReducers({
	auth: authReducer,
	transactions: transactionReducer,
	admin: adminReducer
})