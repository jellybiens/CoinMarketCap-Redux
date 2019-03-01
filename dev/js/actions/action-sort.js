import {view_sort_obj_update,
        main_coins_list_update,
        compare_list_update,
        search_res_list_update, } from './actions-index'

export const sort_tables = (coins_lists, sortObj, sort_by) => {

  sortObj            = update_sortObj(sortObj, sort_by);
  let sorted_main    = apply_sorting(coins_lists.main_list, sortObj);
  let sorted_search  = apply_sorting(coins_lists.search_res_list, sortObj);
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
  let objIndex = sort_by === "circulating_supply" ? "circulating_supply" :
                  ".quote." + cur + "." + sort_by;

  switch(sort_by){
      case 'name' :
          coins.sort((a, b) => {
              let aName = a.name.toLowerCase();
              let bName = b.name.toLowerCase();
              if(sort_dir === "asc"){
                if(aName < bName) { return 1; }
                if(aName > bName) { return -1; }
              }
              if(sort_dir === "desc"){
                if(aName < bName) { return -1; }
                if(aName > bName) { return 1; }
              }
              return 0;
            });
      break;
    default :
      coins.sort((a, b) =>
        sort_dir === 'asc' ?
          Object.byString(a, objIndex) - Object.byString(b, objIndex)
        :
          Object.byString(b, objIndex) - Object.byString(a, objIndex)
      );
    break;
  }

  return coins;
}


Object.byString = (o, s) => {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}
