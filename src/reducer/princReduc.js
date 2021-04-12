let defaultState={
    reducPrincipal:[{
        
    }]
}

const prinReducer = (state=defaultState, action) =>{
    switch(action.type){
        case "PRINCIPAL" :
            return {
                ...state,
                reducPrincipal : action.payload.dataPrincipal
            }
        default:
            return state;
    }
}
export default prinReducer;