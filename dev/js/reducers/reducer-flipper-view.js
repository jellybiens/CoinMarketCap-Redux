export const flipped_view = (state = false, action) => {
    switch(action.type){
        case 'FLIPPER_VIEW' : return action.view;
        default : return state
    }
}
