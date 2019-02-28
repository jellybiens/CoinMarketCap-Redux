import {search_res_list_update} from './actions-index'


export const search_for_matches = (search_text, search_list) => {

  let search_res = find_search_matches(search_text, search_list);

  return (dispatch) => {
  dispatch(search_res_list_update(search_res));
  };
}


const find_search_matches = (search_text, search_list) => {

  let search_res = [];
  let levDistTol = 1.5;

  search_list.map((coin, i) => {
    let cryptoName = coin.name.toLowerCase();
    let cNames = cryptoName.split(" ");
    let sName = search_text.toLowerCase();

      for(let i = 0; i < cNames.length; i++){
        if(get_lev_dist(sName, cNames[i]) <= levDistTol
            || cryptoName.includes(sName)) {
            search_res.push(coin);
            break;
        }
      }
  });

  return search_res;

}


const get_lev_dist = (a, b) => {

    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;
    var matrix = [];
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                                        Math.min(matrix[i][j - 1] + 1, // insertion
                                                 matrix[i - 1][j] + 1)); // deletion
            }
        }
    }
    return matrix[b.length][a.length];
}
