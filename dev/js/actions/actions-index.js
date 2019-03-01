import {refresh_coins_data_set,
        fill_crypto_type_data_set } from './action-api-calls'
import {sort_tables,
        apply_sorting} from './action-sort';
import {search_for_matches} from './action-search';

export {refresh_coins_data_set,
        fill_crypto_type_data_set } from './action-api-calls'
export {sort_tables,
        apply_sorting} from './action-sort';
export {search_for_matches} from './action-search';



//views
  //is the table view flipped to the compare view?
  export const flip_view = (view) => ({
    type: 'FLIPPER_VIEW',
    view
  })
  //is the table view flipped to the compare view?
  export const set_run_flip_animation = (run) => ({
    type: 'RUN_FLIP_ANIMATION',
    run
  })
  //is a search currently in progress
  export const update_is_searching = (is) => ({
    type: 'IS_SEARCHING',
    is
  })
  //search text box value, to maintain after update of currency or refresh
  export const update_search_text_val = (txt) => ({
      type: 'SEARCH_BOX_TEXT',
      txt
  })


//fetch responses
    export const fetchHasErrored = (bool) => ({
        type: 'FETCH_HAS_ERRORED',
        hasErrored: bool

    })
    export const fetchIsLoading = (bool) => ({
        type: 'FETCH_IS_LOADING',
        isLoading: bool
    })


    //ids of all coins filtered
    export const set_crypto_type_ids = (cryptoTypeIds) => ({
        type: 'SET_CRYPTO_TYPE_IDS',
        cryptoTypeIds
    })


//coins lists and sorting options for the different views

    //table view coins sorting options
    export const view_sort_obj_update = (sortObj) => ({
        type: 'VIEW_SORT_OBJ',
        sortObj
    })

    //list of coins coins for main screen
    export const main_coins_list_update = (list) => ({
        type: 'MAIN_COINS_LIST',
        list
    })
    //list of coins matching search
    export const search_res_list_update = (list) => ({
        type: 'SEARCH_RES_LIST',
        list
    })
    //list of coins in compare
    export const compare_list_update = (list) => ({
        type: 'COMPARE_LIST',
        list
    })
