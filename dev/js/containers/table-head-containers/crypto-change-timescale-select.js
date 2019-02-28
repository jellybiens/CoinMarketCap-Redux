import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {  sort_tables,
          view_sort_obj_update } from '../../actions/actions-index';


class CryptoChangeTimescaleSelect extends Component{


  selectChange(val){

    let sortObj = Object.assign({}, this.props.view_sort_obj);

    sortObj["changeTimescale"] = val;

    if(sortObj["sort"].includes("percent_change_")){
      let sort_by = val;
      sortObj["sort"] = sort_by;
      sortObj["sort_dir"] = sortObj["sort_dir"] === "asc" ? "desc" : "asc";

      let coins_lists = {
        "main_list": this.props.main_coins_list,
        "search_list": this.props.search_res_list,
        "compare_list": this.props.compare_list
      };
      this.props.sort_tables(coins_lists, sortObj, sort_by);

    } else {
      this.props.view_sort_obj_update(sortObj);
      //we dont need to re-sort the tables because we are sorting by
      //a value other than the timescale so just update the view
    }


  }

    render() {

      let timescale = this.props.view_sort_obj["changeTimescale"];

        return (

              <select className="timeScaleSelectChange" defaultValue={timescale}
                      onChange={(e) => {this.selectChange(e.target.value)}}
                    >
                    <option value="percent_change_1h" >1H</option>
                    <option value="percent_change_24h" >24H</option>
                    <option value="percent_change_7d" >7D</option>
              </select>

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
      flipped_view: state.flipped_view

      }

}


function matchDispatchToProps(dispatch){

  return {
    view_sort_obj_update: (sortObj) => dispatch(view_sort_obj_update(sortObj)),
    sort_tables: (coins, sortObj, sort_by) => dispatch(sort_tables(coins, sortObj, sort_by))
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(CryptoChangeTimescaleSelect);
