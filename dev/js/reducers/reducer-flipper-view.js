export const flipped_view = (state = false, action) => {
    switch(action.type){
        case 'FLIPPER_VIEW' : return action.view;
        default : return state
    }
}

export const run_flip_animation = (state = false, action) => {
    switch(action.type){
        case 'RUN_FLIP_ANIMATION' : return action.run;
        default : return state
    }
}
