import { combineReducers } from "redux";
import authReducer from "./auth";
import prinReducer from "./princReduc"
import disReducer from "./disReduc"


let reducer = combineReducers({
    authReducer,prinReducer,disReducer,
})
export default reducer;