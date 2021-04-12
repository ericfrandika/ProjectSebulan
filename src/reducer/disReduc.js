let defaultState={
    reducDistributor:[{    
    }]
}

const disReducer = (state=defaultState, action) =>{
 
    switch(action.type){
        case "DISTRIBUTOR" :
            return {
                ...state,
                reducDistributor : action.payload.dataDistributor
            }
        default:
            return state;
    }
}
export default disReducer;