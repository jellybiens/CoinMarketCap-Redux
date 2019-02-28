import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { flip_view, search_for_matches } from '../actions/actions-index';


import CryptoSearchText             from './table-head-containers/crypto-search-txt';
import CryptoTypeSelect             from './table-head-containers/crypto-type-select';
import CurrencyReferenceSelect      from './table-head-containers/currency-reference-select';
import SetIntervalText              from './table-head-containers/set-interval-text';
import ResultsLimitText             from './table-head-containers/results-limit-txt';
import NavigationRow                from './table-head-containers/navigation-row';
import CryptoChangeTimescaleSelect  from './table-head-containers/crypto-change-timescale-select';
import HeaderSortingOptions         from './table-head-containers/header-sorting-options';


class CoinMarketTableHead extends Component{

    flipProcess(){

      //if we are searching, update the search for flipping back and forth
      if(this.props.is_searching){
        let val = this.props.search_box_text;
        let search_list = !this.props.flipped_view ? this.props.compare_list : this.props.main_coins_list;
        this.props.search_for_matches(val, search_list)
      }

      this.props.flip_view(!this.props.flipped_view)
    }

    render() {

      return (

              <thead>
                <tr className="headOptions">
                  <th colSpan="8">
                    <CryptoSearchText />

                    <CryptoTypeSelect />

                    <div className="compareButton" onClick={() => this.flipProcess()}><span>{this.props.flipped_view ? "View All" : "Compare Selected"}</span></div>

                    <ResultsLimitText />

                    <CurrencyReferenceSelect />

                    <SetIntervalText />
                    <label htmlFor="setInterval" className="setIntervalLabel" >Refresh Rate (mins):</label>

                  </th>
                </tr>


                <tr className="headNavigation">
                  <NavigationRow />
                </tr>


                  <tr className="headTitles">
                    <th>✕</th>
                    <th>
                      <span>#</span>
                    </th>
                    <th>
                      <span>Name</span>
                      <span><HeaderSortingOptions header={"name"} /></span>
                    </th>
                    <th>
                      <span>Market Cap</span>
                      <span><HeaderSortingOptions header={"market_cap"} /></span>
                    </th>
                    <th>
                      <span>Price</span>
                      <span><HeaderSortingOptions header={"price"} /></span>
                    </th>
                    <th>
                      <span>Volume 24H</span>
                      <span><HeaderSortingOptions header={"volume_24h"} /></span>
                    </th>
                    <th>
                      <span>Circulating Supply</span>
                      <span><HeaderSortingOptions header={"circulating_supply"} /></span>
                    </th>
                    <th>
                      <span>Change <CryptoChangeTimescaleSelect /> </span>
                      <span><HeaderSortingOptions header="percent_change_" /></span>
                    </th>
                  </tr>
                </thead>
        );
    }

}


//Takes application state(part of store),
//maps to props in component above
//gives access to this.state.props from store
function mapStateToProps(state){

    return {
      view_sort_obj: state.view_sort_obj,

      main_coins_list: state.main_coins_list,
      search_res_list: state.search_res_list,
      compare_list: state.compare_list,

      is_searching: state.is_searching,
      search_box_text: state.search_box_text,

      flipped_view: state.flipped_view

      }

}


function matchDispatchToProps(dispatch){

  return {
      flip_view: (view) => dispatch(flip_view(view)),
      search_for_matches: (val, search_list) => dispatch(search_for_matches(val, search_list)),
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(CoinMarketTableHead);
