let defaultState={
    statusNavbar: false,
    token:"",
    isLogin: false,
    userLogin : {
        username:""
    },
    
}

const authReducer = (state=defaultState, action)=>{

    switch (action.type) {
        case "LOGIN":
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