export const is_searching = (state = false, action) => {
    switch(action.type){
        case 'IS_SEARCHING' : return action.is;
        default : return state
    }
}


export const search_box_text = (state = "", action) => {
    switch(action.type){
        case 'SEARCH_BOX_TEXT' : return action.txt;
        default : return state
    }
}
