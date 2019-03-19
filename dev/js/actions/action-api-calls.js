import axios from 'axios';
import {fetchIsLoading,
        fetchHasErrored,
        view_sort_obj_update,
        main_coins_list_update,
        search_res_list_update,
        compare_list_update,
        set_crypto_type_ids
        } from './actions-index'
import { filter_tokens_and_coins } from './action-filter-crypto-types';
import { apply_sorting } from './action-sort';



//INITIALISE datasets from API

//get a list of tokens coins to create 2 arrays to filter through results based on crypto type
export const fill_crypto_type_data_set = () => {

console.log("api: fill_crypto_type_data_set");

  const url = 'api/cryptocurrency/listings/latest';
  let coinsOptions = {
    method: 'GET',
    params: { limit: 5000,
              convert:  "EUR",
              cryptocurrency_type: "coins"
            },
    json: true,
    gzip: true
  };
  let tokensOptions = JSON.parse(JSON.stringify(coinsOptions))
  tokensOptions.params["cryptocurrency_type"] = "tokens";

  return (dispatch) => {
    dispatch(fetchIsLoading(true));
    //get coins
    axios.get(url, coinsOptions)
          .then(res1 => {
              let coins = res1.data.data
              //get tokens
              axios.get(url, tokensOptions)
                    .then(res2 => {
                      let tokens = res2.data.data;
                        list_initialisation(dispatch, coins, tokens)
                        dispatch(fetchIsLoading(false));
                    })
                    .catch(error => {
                        dispatch(fetchHasErrored(true));
                        console.log(error);
                    });



          })
          .catch(error => {
              dispatch(fetchHasErrored(true));
              console.log(error);
          });
  }

}

const list_initialisation = (dispatch, coins, tokens) => {

  let cryptoTypeIds = filter_tokens_and_coins(coins, tokens);
  dispatch(set_crypto_type_ids(cryptoTypeIds));

  let sortObj = {
    "convert":"EUR",
    "sort":"market_cap",
    "sort_dir":"desc",
    "changeTimescale":"percent_change_7d"
  }

  let main_coins_list = coins.concat(tokens);
  main_coins_list = apply_sorting(main_coins_list, sortObj);
  dispatch(main_coins_list_update(main_coins_list));
}







//UPDATE datasets from API


export const refresh_coins_data_set = (sortObj, coins_lists) => {

    console.log("api: refresh_coins_data_set");

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
      json: true,
      gzip: true
    };

    //get all coins data
    return (dispatch) => {
      axios.get(url, requestOptions)
            .then(response => {
                dispatch(main_coins_list_update(response.data.data));
                dispatch(view_sort_obj_update(sortObj))

                coins_lists.main_list = response.data.data;
                //updates search and compare lists so that the money conversion is correct
                dispatch(update_lists_after_refresh(coins_lists))
            })
            .catch(error => {
                dispatch(fetchHasErrored(true));
                console.log(error);
            });
    }
}


//updates search and compare lists so that data is up to date and the money conversion is correct
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
//updates search and compare lists so that data is up to date and the money conversion is correct
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




//UNUSED FUNCTION
//This is a way in which I could merge all the different currencies into one
//data set from a limit of 40 conversions per call,
//so that when the user changes which currecy conversion they want the coins
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
