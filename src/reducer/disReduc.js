let defaultState={
    reducDistributor:[{    
    }]
}

const disReducer = (state=defaultState, action) =>{
    console.warn("state REDUX Distributor : ", state)
    console.warn("action REDUX Distributor: ", action)
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