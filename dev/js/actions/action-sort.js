import {view_sort_obj_update,
        main_coins_list_update,
        compare_list_update,
        search_res_list_update, } from './actions-index'

export const sort_tables = (coins_lists, sortObj, sort_by) => {

  sortObj            = update_sortObj(sortObj, sort_by);
  let sorted_main    = apply_sorting(coins_lists.main_list, sortObj);
  let sorted_search  = apply_sorting(coins_lists.search_list, sortObj);
  let sorted_comapre = apply_sorting(coins_lists.compare_list, sortObj);

  let newSortObj = Object.assign({}, sortObj);

  let new_sorted_main    = sorted_main.slice();
  let new_sorted_search  = sorted_search.slice();
  let new_sorted_comapre = sorted_comapre.slice();

  return (dispatch) => {

      dispatch(view_sort_obj_update(newSortObj));
      dispatch(main_coins_list_update(new_sorted_main));
      dispatch(search_res_list_update(new_sorted_search));
      dispatch(compare_list_update(new_sorted_comapre));

    };

}

const update_sortObj = (sortObj, sort_by) => {
  //update qsSorting values
  let sort_dir  = sortObj["sort"] !== sort_by ? "desc"
                : sortObj["sort_dir"] === "asc" ? "desc" : "asc";

  sortObj["sort"] = sort_by;
  sortObj["sort_dir"] = sort_dir;
  ///////////////////

  return sortObj;

}

export const apply_sorting = (coins, sortObj)  => {

  let sort_by = sortObj["sort"];
  let sort_dir = sortObj["sort_dir"];
  let cur = sortObj["convert"];
  let timescale = sortObj["changeTimescale"];

  switch(sort_by){
      case 'name' :
          switch(sort_dir){
              case 'asc' :
                coins.sort((a, b) => {
                  let aName = a.name.toLowerCase();
                  let bName = b.name.toLowerCase();
                  if(aName < bName) { return 1; }
                  if(aName > bName) { return -1; }
                  return 0;
                });
              break;
              case 'desc' :
                coins.sort((a, b) => {
                  let aName = a.name.toLowerCase();
                  let bName = b.name.toLowerCase();
                  if(aName < bName) { return -1; }
                  if(aName > bName) { return 1; }
                  return 0;
                });
              break;
          }
    break;
    case 'circulating_supply' :
      switch(sort_dir){
          case 'asc' : coins.sort((a, b) => a.circulating_supply - b.circulating_supply)
          break;
          case 'desc' : coins.sort((a, b) => b.circulating_supply - a.circulating_supply)
          break;
      }
    break;
    default :
      switch(sort_dir){
          case 'asc' : coins.sort((a, b) => a.quote[cur][sort_by] - b.quote[cur][sort_by] )
          break;
          case 'desc' : coins.sort((a, b) => b.quote[cur][sort_by]  - a.quote[cur][sort_by] )
          break;
      }
    break;
  }

  return coins;
}
