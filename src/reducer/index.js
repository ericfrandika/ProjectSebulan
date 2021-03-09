import { combineReducers } from "redux";
import authReducer from "./auth";
import prinReducer from "./princReduc"


let reducer = combineReducers({
    authReducer,prinReducer,
})
export default reducer;