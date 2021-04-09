let defaultState={
    statusNavbar: false,
    token:"",
    isLogin: false,
    userLogin : {
        username:""
    },
    
}

const authReducer = (state=defaultState, action)=>{
    console.warn("state: ", state)
    console.warn("action: ", action)
    switch (action.type) {
        case "LOGIN":
            console.log("object")
            return{
                ...state,
                isLogin: true,
                userLogin : {
                    username:action.payload.dataLogin.username,
                }  
            }

        case "LOGOUT":
            return{
                ...state,
                userLogin : {
                    username:""
                }  ,
                isLogin: false,
                token:""
            }
            
        case "NAVBAR":
            return{
                ...state,
                statusNavbar: action.payload.dataNavbar
            }

            case "TOKEN":
                return{
                    ...state,
                    token: action.payload.dataToken
                }
        default:
            return state;
    }
}

export default authReducer