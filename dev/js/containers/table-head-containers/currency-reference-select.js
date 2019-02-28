import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {  fill_coins_data_set, view_sort_obj_update } from '../../actions/actions-index';


class CurrencyReferenceSelect extends Component{

  buildCurrencyOptions(){

    let currencies = this.props.currencySymbols

    return Object.keys(currencies).map((k, i) => {
      let cur = currencies[k];


     return (
              <option key={cur.id} id={cur.id} value={cur.code+"-"+cur.symbol} >{cur.code + " - " + cur.name}</option>
          );
        });
  }

  selectChange(val){

    let newQsObj = Object.assign({}, this.props.view_sort_obj);

    newQsObj["convert"] = val.split("-")[0];
    newQsObj["symbol"] = val.split("-")[1];

    let coins_lists = {
      "main_list": this.props.main_coins_list,
      "search_list": this.props.search_res_list,
      "compare_list": this.props.compare_list
    };

    this.props.fill_coins_data_set(newQsObj, coins_lists);


  }

    render() {

      let qsObj = this.props.view_sort_obj;


        return (<cseignore>
              <select className="filterCur" defaultValue={qsObj.convert+"-"+qsObj.symbol}
                      onChange={(e) => this.selectChange(e.target.value)}
                    >
                {this.buildCurrencyOptions()}
              </select>
              </cseignore>
        );
    }

}


//Takes application state(part of store),
//maps to props in component above
//gives access to this.state.props from store
function mapStateToProps(state){

    return {
      currencySymbols: state.currencySymbols,

      main_coins_list: state.main_coins_list,
      search_res_list: state.search_res_list,
      compare_list: state.compare_list,

      view_sort_obj: state.view_sort_obj

      }

}


function matchDispatchToProps(dispatch){

  return {
      fill_coins_data_set: (qsObj, coins_lists) => dispatch(fill_coins_data_set(qsObj, coins_lists)),
      view_sort_obj_update: (sortObj) => dispatch(view_sort_obj_update(sortObj))
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(CurrencyReferenceSelect);
