import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {apply_sorting, compare_list_update, set_run_flip_animation} from '../actions/actions-index';

class CoinMarketTableBody extends Component{


  trycatchParse(val){
    let newVal;
    let newValString = "";
    try{
      newVal = parseFloat(Math.round(val * 100) / 100); //round to 2 decimal places
      //if less than 0.00 //round to 3 decimal places then if still less 4 and so on
      newVal = newVal == 0 ? parseFloat(Math.round(val * 1000) / 1000) : newVal;
      newVal = newVal == 0 ? parseFloat(Math.round(val * 10000) / 10000) : newVal;
      newVal = newVal == 0 ? parseFloat(Math.round(val * 100000) / 100000) : newVal;
      newValString = newVal == 0 ? parseFloat(Math.round(val * 1000000) / 1000000) : newVal;

      //create comma seperation each group of 1,000
      if(parseFloat(newValString) >= 1000){
        let parts = newVal.toFixed(2).toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        newValString = parts.join(".");
      }

    }
    catch(e){
      console.log(e);
      return "Unknown";
    }
    return newValString;
  }


  buildRows(coins_list){

    let coinsList = coins_list.slice();
    //TODO
    //on check add object to compare list
    //if id is in compare list
    let sortObj = this.props.view_sort_obj
    let crypto_type = sortObj["cryptocurrency_type"];
    if(crypto_type !== "all"){

      let filterArr = this.props.crypto_type_ids[crypto_type];

      let filtList = coinsList.filter((coin) => {
                      return filterArr.includes(coin.id)
                    });
      coinsList = filtList.slice();
    }


    let symbols = this.props.currencySymbols;
    let cur = this.props.view_sort_obj["convert"];

    if(coinsList.length > 0){
       let curKeys = Object.keys(coinsList[0].quote);
       cur = curKeys[0];
    }
    let symbol = symbols[cur].symbol;
    let timescale = sortObj["changeTimescale"];
    let start = sortObj["start"];

    //getting the final number on the page
    let limit = sortObj["limit"];
    let limit_on_page = (start-1)+sortObj["limit"] < coinsList.length ? (start-1)+sortObj["limit"] : coinsList.length;

    let table = [];

    let page_no = ((start-1) / limit)+1;
    let page_end = (Math.floor(coinsList.length / limit)+1);
    let index = sortObj["sort_dir"] === "desc" ? start : (coinsList.length - (limit * (page_no - 1)));

    for(let i = (start-1); i < limit_on_page; i++){


      let coin = coinsList[i];
      let id, pos, name, market_cap, price, volume_24h, supply, change, colour;

      id          = coin.id;
      pos         = index;
      sortObj["sort_dir"] === "desc" ? index++ : index--;
      name        = coin.name;
      market_cap  = symbol + this.trycatchParse(coin.quote[cur].market_cap);
      price       = symbol + this.trycatchParse(coin.quote[cur].price);
      volume_24h  = symbol + this.trycatchParse(coin.quote[cur].volume_24h);
      supply      = this.trycatchParse(coin.circulating_supply) + " " + coin.symbol;


      change      = timescale == "percent_change_1h"  ? this.trycatchParse(coin.quote[cur].percent_change_1h)
                  : timescale == "percent_change_24h" ? this.trycatchParse(coin.quote[cur].percent_change_24h)
                  :                      this.trycatchParse(coin.quote[cur].percent_change_7d);

      colour      = Math.sign(change) == 1  ? "#00990f" :
                    Math.sign(change) == -1 ? "#990000" : "#111";
      let style = {"color":colour};

      let checked = this.props.compare_list.includes(coin) ? true : false;

      let crypto_logo = "https://s2.coinmarketcap.com/static/img/coins/16x16/" + id + ".png"

     table.push(
               <tr key={id}>
                 <th><input type="checkbox" defaultChecked={checked} id={"key"+pos} onChange={(e) => this.addToCompare(e.target.checked, coin)} /></th>
                 <td>{pos}</td>
                 <td><img src={crypto_logo} />{name}</td>
                 <td>{market_cap}</td>
                 <td>{price}</td>
                 <td>{volume_24h}</td>
                 <td>{supply}</td>
                 <td style={style}>{change}</td>
               </tr>
          );

        }
        setTimeout(() => { this.props.set_run_flip_animation(false) }, 500);
        return table;

      }

    addToCompare(checked, coin){
      let compare_list = this.props.compare_list.slice();

      if(!checked){
        let index = compare_list.indexOf(coin);
        if (index > -1) {
          compare_list.splice(index, 1);
        }
      }else{
        compare_list.push(coin);
        compare_list = this.props.apply_sorting(compare_list, this.props.view_sort_obj);
      }
      this.props.compare_list_update(compare_list)
    }

  render(){

      let coinsList = this.props.is_searching ? this.props.search_res_list
                    : this.props.flipped_view ? this.props.compare_list
                    : this.props.main_coins_list;

        return (

              <tbody>
                {this.buildRows(coinsList)}
              </tbody>

        );
    }

}




//Takes application state(part of store),
//maps to props in component above
//gives access to this.state.props from store
function mapStateToProps(state){

    return {
      main_coins_list: state.main_coins_list,
      search_res_list: state.search_res_list,
      compare_list: state.compare_list,

      view_sort_obj: state.view_sort_obj,

      is_searching: state.is_searching,
      flipped_view: state.flipped_view,

      currencySymbols: state.currencySymbols,
      crypto_type_ids: state.crypto_type_ids

      }

}


function matchDispatchToProps(dispatch){

  return {
      apply_sorting: (coins, sortObj) => apply_sorting(coins, sortObj),
      compare_list_update: (compare_list) => dispatch(compare_list_update(compare_list)),
      set_run_flip_animation: (run) => dispatch(set_run_flip_animation(run))
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(CoinMarketTableBody);
