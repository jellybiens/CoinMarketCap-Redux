
        let initialQS = {
          "start":1,
          "limit":100,
          "convert":"EUR",
          "sort":"market_cap",
          "sort_dir":"desc",
          "cryptocurrency_type":"all",
          "changeTimescale":"percent_change_7d",
          "symbol":"€",
          "interval":5,
          "setInterval":null
        }

export const view_sort_obj = (state = initialQS, action) => {
    switch(action.type){
        case 'VIEW_SORT_OBJ' : return action.sortObj;
        default : return state
    }
}

export const main_coins_list = (state = [], action) => {
    switch(action.type){
        case 'MAIN_COINS_LIST' : return action.list;
        default : return state
    }
}


export const search_res_list = (state = [], action) => {
    switch(action.type){
        case 'SEARCH_RES_LIST' : return action.list;
        default : return state
    }
}


export const compare_list = (state = [], action) => {
    switch(action.type){
        case 'COMPARE_LIST' : return action.list;
        default : return state
    }
}
