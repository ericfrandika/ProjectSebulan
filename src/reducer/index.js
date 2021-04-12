import { combineReducers } from "redux";
import authReducer from "./auth";
import prinReducer from "./princReduc"
import disReducer from "./disReduc"
import tableCondiReducer from "./tableCondi";

let reducer = combineReducers({
    authReducer,prinReducer,disReducer,tableCondiReducer
})
export default reducer;