import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { flip_view, set_run_flip_animation, search_for_matches } from '../actions/actions-index';


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

      this.props.set_run_flip_animation(!this.props.run_flip_animation);

      //delay update so that we can flip the animation and change the view while it is offscreen
      setTimeout(() => {
          //if we are searching, update the search for flipping back and forth
          if(this.props.is_searching){
            let val = this.props.search_box_text;
            let search_list = !this.props.flipped_view ? this.props.compare_list : this.props.main_coins_list;
            this.props.search_for_matches(val, search_list)
          }
          this.props.flip_view(!this.props.flipped_view)
      }, 375);
    }

    render() {

      return (
            <div className="theads">
              <div className="thead-options">
                <div className="tr-options">

                  <div className="th-CryptoSearchText">
                    <CryptoSearchText />
                  </div>

                  <div className="th-CryptoTypeSelect">
                    <CryptoTypeSelect />
                  </div>

                  <div className="th-FlipButton_SetInterval">
                    <div className="compareButton" onClick={() => this.flipProcess()}><span>{this.props.flipped_view ? "View All" : "Compare Selected"}</span></div>

                    <label htmlFor="setInterval" className="setIntervalLabelMins" >mins</label>
                    <SetIntervalText />
                    <label htmlFor="setInterval" className="setIntervalLabel" >Refresh Rate:</label>

                  </div>

                  <div className="th-CurrencyReferenceSelect">
                    <CurrencyReferenceSelect />
                  </div>

                  <div className="th-ResultsLimitText">
                    <ResultsLimitText />
                  </div>

                </div>
              </div>

              <div className="thead-navigation">
                  <NavigationRow />
              </div>

              <div className="thead-headers">
                <div className="tr-headTitles">
                  <div className="th-X">
                    <span>✕</span>
                  </div>
                  <div className="th-Num">
                    <span>#</span>
                  </div>
                  <div className="th-Name">
                    <span>Name</span>
                    <HeaderSortingOptions header="name" />
                  </div>
                  <div className="th-Market_Cap">
                    <span>Market Cap</span>
                    <HeaderSortingOptions header="market_cap" />
                  </div>
                  <div  className="th-Price">
                    <span>Price</span>
                    <HeaderSortingOptions header="price" />
                  </div>
                  <div className="th-Volume">
                    <span>Volume 24H</span>
                    <HeaderSortingOptions header="volume_24h" />
                  </div>
                  <div className="th-Supply">
                    <span>Circulating Supply</span>
                    <HeaderSortingOptions header="circulating_supply" />
                  </div>
                  <div className="th-Change">
                    <div className="timescale_head">
                      <span>Change</span>
                      <CryptoChangeTimescaleSelect />
                    </div>
                    <HeaderSortingOptions header="percent_change_" />
                  </div>
                </div>
              </div>
            </div>
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

      flipped_view: state.flipped_view,
      run_flip_animation: state.run_flip_animation

      }

}


function matchDispatchToProps(dispatch){

  return {
      flip_view: (view) => dispatch(flip_view(view)),
      set_run_flip_animation: (run) => dispatch(set_run_flip_animation(run)),
      search_for_matches: (val, search_list) => dispatch(search_for_matches(val, search_list))
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(CoinMarketTableHead);
