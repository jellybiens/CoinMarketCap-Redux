import {combineReducers} from 'redux';



import { fetchHasErrored, fetchIsLoading } from './reducer-fetch-processes';
import { crypto_type_ids} from './reducer-fetch-coin-data';

import { currencySymbols } from './reducer-currency-symbols';

import {  view_sort_obj,
          main_coins_list,
          search_res_list,
          compare_list } from './reducer-coins-lists-and-sorts';


import { flipped_view } from './reducer-flipper-view';
import { is_searching, search_box_text } from './reducer-is-searching';

const allReducers = combineReducers({

    fetchHasErrored, fetchIsLoading,

    crypto_type_ids,

    view_sort_obj,
    main_coins_list,
    search_res_list,
    compare_list,

    currencySymbols,

    flipped_view,
    is_searching, search_box_text
});


export default allReducers;
