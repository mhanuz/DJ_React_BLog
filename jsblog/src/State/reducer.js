export const initialstate={
    profile: null,
}

export const reducer =(state,action)=>{
    switch(action.type){
        case 'add_profile':
            return {
                ...state,
                profile:action.value
            }
        default:
            return state
    }
}