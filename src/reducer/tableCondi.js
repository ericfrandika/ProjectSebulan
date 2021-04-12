let defaultState={
    statusNavbar: false,
}

const tableCondiReducer = (state=defaultState, action)=>{
    switch (action.type) {
        case "NAVBAR":
            return{
                ...state,
                statusNavbar: action.payload.dataNavbar
            }
        default:
            return state;
    }
}

export default tableCondiReducer