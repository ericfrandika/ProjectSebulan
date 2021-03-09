let defaultState={
    isLogin: false,
    userLogin : {
        username:""
    }
}

const authReducer = (state=defaultState, action)=>{
    console.warn("state: ", state)
    console.warn("action: ", action)
    switch (action.type) {
        case "LOGIN":
            console.log("object")
            return{
                isLogin: true,
                userLogin : {
                    username:action.payload.dataLogin.username,
                }
                
            }
        case "LOGOUT":
            return{
                ...state,
                isLogin: false
            }
    
        default:
            return state;
    }
}

export default authReducer