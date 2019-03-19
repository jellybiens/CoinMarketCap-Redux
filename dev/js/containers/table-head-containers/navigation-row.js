import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { view_sort_obj_update } from '../../actions/actions-index';
import  paging_arrow  from '../../images/paging-arrow.png';

class NavigationRow extends Component{

  goBackward(coins_list_len, start, limit){
    if(start == 1) return;

    let newSortObj = Object.assign({}, this.props.view_sort_obj);
    newSortObj["start"] -= newSortObj["limit"];

    this.props.view_sort_obj_update(newSortObj);
  }

  goForward(coins_list_len, start, limit){
    if((start+limit) > coins_list_len) return;

    let newSortObj = Object.assign({}, this.props.view_sort_obj);
    newSortObj["start"] += newSortObj["limit"];

    this.props.view_sort_obj_update(newSortObj);
  }

    render() {

      let start = this.props.view_sort_obj["start"];
      let limit = this.props.view_sort_obj["limit"];
      let coins_list_len = this.get_view_filtered_total();

      let pageResTotal = "Page " + (((start-1) / limit)+1) + " of " + (Math.ceil(coins_list_len / limit));

      return (
        <div className="tr-headNavigation">

                <div className="th-linkBack">
                  <div  className={start > 1 ? "linkBack" : "linkBack inactive-button"}
                        onClick={() => this.goBackward(coins_list_len, start, limit)}>
                    <img className="paging_arrow" src={paging_arrow} />
                  </div>
                </div>

                <div className="th-linkMiddle">
                  <div className="linkMiddle">
                    <span>{pageResTotal}</span>
                  </div>
                </div>

                <div className="th-linkForward">
                  <div  className={(start+limit) <= coins_list_len ? "linkForward" : "linkForward inactive-button"}
                        onClick={() => this.goForward(coins_list_len, start, limit)}>
                    <img className="paging_arrow" src={paging_arrow} />
                  </div>
                </div>

            </div>

        );
    }


    get_view_filtered_total(){

      let coinsList = this.props.is_searching ? this.props.search_res_list.slice()
                    : this.props.flipped_view ? this.props.compare_list.slice()
                    : this.props.main_coins_list.slice();

      let sortObj = this.props.view_sort_obj;
      let crypto_type = this.props.view_sort_obj["cryptocurrency_type"];
      if(crypto_type !== "all"){

        let filterArr = this.props.crypto_type_ids[crypto_type];

        let filtList = coinsList.filter((coin) => {
                        return filterArr.includes(coin.id)
                      });
        coinsList = filtList.slice();
      }

      return coinsList.length;

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

      crypto_type_ids: state.crypto_type_ids,

      view_sort_obj: state.view_sort_obj,

      flipped_view: state.flipped_view,
      is_searching: state.is_searching
      }

}


function matchDispatchToProps(dispatch){

  return {
      view_sort_obj_update: (sortObj) => dispatch(view_sort_obj_update(sortObj))
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(NavigationRow);
