export const fetchHasErrored = (state = false, action) => {
    switch(action.type){
        case 'FETCH_HAS_ERRORED' : return action.hasErrored;
        default : return state
    }
}

export const fetchIsLoading = (state = false, action) => {
    switch(action.type){
        case 'FETCH_IS_LOADING' : return action.isLoading;
        default : return state
    }
}
