import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { fill_coins_data_set, fill_crypto_type_data_set } from '../actions/actions-index';
import CoinMarketTableBody from '../containers/coin-market-table-body';
import CoinMarketTableHead from '../containers/coin-market-table-head';
import table_loading from '../images/loading.gif';
import error_occurred from '../images/error-occurred.jpg';

class CoinMarketTable extends Component{


  componentDidMount(){

    this.props.fill_crypto_type_data_set();
    let qsObj = this.props.view_sort_obj;

    let coins_lists = {
      "main_list": [],
      "search_list": [],
      "compare_list": []
    };

    this.props.fill_coins_data_set(qsObj, coins_lists);

  }

  renderTable(){
    var classNameFlip = this.props.flipped_view == false ? "" : " flip";

      return (
            <div className="flip-container">
              <div className={"flipper" + classNameFlip}>

                <div className="front">

                  <div className="currency-container">
                    <table className='currency'>
                      <CoinMarketTableHead />
                      <CoinMarketTableBody  />
                    </table>
                  </div>

                </div>

                <div className="back">
                </div>

              </div>
            </div>
      );
  }

  renderLoading(){ return ( <div className="image-container"><img className="table_loading" src={table_loading} /></div> ); }

  renderError(){ return ( <div className="image-container"><img className="error_occurred" src={error_occurred} /></div> ); }

    render() {

      if(this.props.isLoading)  return this.renderLoading();
      if(this.props.hasErrored) return this.renderError();

      return this.renderTable();

    }

}



//Takes application state(part of store),
//maps to props in component above
//gives access to this.state.props from store
function mapStateToProps(state){

    return {
        flipped_view: state.flipped_view,

        view_sort_obj: state.view_sort_obj,

        hasErrored: state.fetchHasErrored,
        isLoading: state.fetchIsLoading
      }
}


function matchDispatchToProps(dispatch){

  return {
      fill_coins_data_set: (qsObj, coins_lists) => dispatch(fill_coins_data_set(qsObj, coins_lists)),
      fill_crypto_type_data_set: () => dispatch(fill_crypto_type_data_set())
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(CoinMarketTable);
