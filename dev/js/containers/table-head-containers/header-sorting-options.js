import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { sort_tables } from '../../actions/actions-index';
import uArr from '../../images/uArr.png';
import dArr from '../../images/dArr.png';
import flat from '../../images/flat.png';



class HeaderSortingOptions extends Component{



  applySorting(sort_by){

    let sortObj = this.props.view_sort_obj;

    let coins_lists = {
      "main_list": this.props.main_coins_list,
      "search_res_list": this.props.search_res_list,
      "compare_list": this.props.compare_list
    };

    this.props.sort_tables(coins_lists, sortObj, sort_by);
  }

//search needs to be saved for when currency changes
//change the loading to overtake the just the table layout
//numbering system is fucked

    render() {

    let sortObj =  this.props.view_sort_obj;
    let sort_by = this.props.header;
    let imageSource = sortObj["sort"] !== sort_by ? flat :
                   sortObj["sort_dir"] === "desc" ? dArr : uArr;

    if(sort_by === "percent_change_" && !sortObj["sort"].includes("percent_change_")){
      sort_by = sortObj["changeTimescale"];
    }
    if(sort_by === "percent_change_" && sortObj["sort"].includes("percent_change_"))
    {
      imageSource = sortObj["sort_dir"] === "desc" ? dArr : uArr;
      sort_by = sortObj["changeTimescale"];
    }

        return (
          <div onClick={() => this.applySorting(sort_by) } >
              <img src={imageSource} className="sortingArrow" />
          </div>

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

      flipped_view: state.flipped_view,
      is_searching: state.is_searching

      }

}


function matchDispatchToProps(dispatch){

  return {
      sort_tables: (coins, sortObj, sort_by, view) => dispatch(sort_tables(coins, sortObj, sort_by, view))
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(HeaderSortingOptions);
