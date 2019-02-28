import axios from 'axios';
import {fetchIsLoading,
        fetchHasErrored,
        view_sort_obj_update,
        main_coins_list_update,
        search_res_list_update,
        compare_list_update,
        set_crypto_type_ids} from './actions-index'
import { filter_tokens_and_coins } from './action-filter-crypto-types';


const update_lists_after_refresh = (coins_lists) => {

  let main_coins    = coins_lists.main_list;
  let search_coins  = coins_lists.search_list.slice();
  let compare_coins = coins_lists.compare_list.slice();

  let search_updated = search_coins.length > 0 ? update_list_data(main_coins, search_coins) : [];
  let compare_updated = compare_coins.length > 0 ? update_list_data(main_coins, compare_coins) : [];

  return (dispatch) => {
      dispatch(search_res_list_update(search_updated));
      dispatch(compare_list_update(compare_updated));
  }

}

const update_list_data = (main_list, sorting_list) => {

  var update_list = [];

  sorting_list.find(coin1 => {
    update_list.push(
      main_list.find(coin2 => {
         return coin1.id === coin2.id;
      })
    )
  })

  return update_list;
}


export const fill_coins_data_set = (sortObj, coins_lists) => {

    console.log("api: fill_coins_data_set");

    //flip the name sorting because we sort a>z as desc, to make the arrows on sorting flow more easily
    //just slightly hacky to get them to communicate nicely
    let sort_dir = new String(sortObj["sort_dir"]);
    if(sortObj["sort"] === "name") sort_dir = sort_dir === "asc" ? "desc" : "asc";

    const url = 'api/cryptocurrency/listings/latest';
    const requestOptions = {
      method: 'GET',
      params: { start:    1,
                sort:     sortObj["sort"],
                sort_dir: sort_dir.replace(/['"]+/g, ''),
                convert:  sortObj["convert"],
                limit:    5000
              },
      headers: { 'X-CMC_PRO_API_KEY': '5ef4101a-93b7-4b32-9367-824a9c3b978a' },
      json: true,
      gzip: true
    };

    //get all coins data
    return (dispatch) => {
      axios.get(url, requestOptions)
            .then(response => {
                dispatch(main_coins_list_update(response.data.data));
                dispatch(view_sort_obj_update(sortObj));
                coins_lists.main_list = response.data.data;
                dispatch(update_lists_after_refresh(coins_lists)),
                dispatch(fetchIsLoading(false));
            })
            .catch(error => {
                dispatch(fetchHasErrored(true));
                console.log(error);
            });
    }
}


  //get a list of tokens coins to create 2 arrays to filter through results based on crypto type
export const fill_crypto_type_data_set = () => {

  console.log("api: fill_crypto_type_data_set");

    const url = 'api/cryptocurrency/listings/latest';
    const coinsOptions = {
      method: 'GET',
      params: { limit: 5000,
                "cryptocurrency_type": "coins"
              },
      headers: { 'X-CMC_PRO_API_KEY': '5ef4101a-93b7-4b32-9367-824a9c3b978a' },
      json: true,
      gzip: true
    };
    const tokensOptions = {
      method: 'GET',
      params: { limit: 5000,
                "cryptocurrency_type": "tokens"
              },
      headers: { 'X-CMC_PRO_API_KEY': '5ef4101a-93b7-4b32-9367-824a9c3b978a' },
      json: true,
      gzip: true
    };

    let coins = [];

    return (dispatch) => {
      dispatch(fetchIsLoading(true));
      axios.get(url, coinsOptions)
            .then(response => {
                coins = response.data.data
            })
            .catch(error => {
                dispatch(fetchHasErrored(true));
                console.log(error);
            });
      axios.get(url, tokensOptions)
            .then(response => {
                let cryptoTypeIds = filter_tokens_and_coins(coins, response.data.data);
                dispatch(set_crypto_type_ids(cryptoTypeIds));
            })
            .catch(error => {
                dispatch(fetchHasErrored(true));
                console.log(error);
            });
    }

}




//UNUSED FUNCTION
//This is a way in which I could merge all the different currencies into one
//data set, so that when the user changes which currecy they want the coins
//to be converted to, we dont have to constantly keep on calling the API
//
//This is something I was planning to do, (read full notes in write up) but
//the API account I have made is limited to only 1 conversion per call
//So I would have to call it upwards of 90 times to get each of the convertion rates
//If I were able to get 40 conversions at once, which is the maximum allowed in the QS
//then it would only need to be called 3 times and merged 3 times, which isn't too bad
//
//This is a sacrefice between wanting to keep the API calls to a minimum throughout use
//but also not wanting to have to call lots of times on start up
const merge = (currencies1, currencies2) => {

  var currencies1 = { "Bitcoin":{ "label": "BIT", "quotes": {1:1,2:2,3:3}}};
  var currencies2 = { "Bitcoin":{ "label": "BIT", "quotes": {5:5,6:6,7:7 }}};


  Object.keys(currencies1).map((key, index) => {
  	Object.assign(currencies1[key].quotes, currencies2[key].quotes);
  });

  //currencies1 = { "Bitcoin":{ "label": "BIT", "quotes": {1:1,2:2,3:3, 5:5,6:6,7:7}}};
}
