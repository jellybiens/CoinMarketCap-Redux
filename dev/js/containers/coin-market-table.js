import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { fill_crypto_type_data_set } from '../actions/actions-index';
import CoinMarketTableBody from '../containers/coin-market-table-body';
import CoinMarketTableHead from '../containers/coin-market-table-head';
import table_loading from '../images/loading.gif';
import error_occurred from '../images/error-occurred.jpg';
import crypto_logo from '../images/crypto-logo.png';

class CoinMarketTable extends Component{


  componentDidMount(){
    this.props.fill_crypto_type_data_set();
  }

  renderTable(){
    var classNameFlip = this.props.run_flip_animation == false ? "" : " flip";
    var logoClass = this.props.view_sort_obj["limit"] > 300 ? "logo-image logo-image-spin" : "logo-image";
    logoClass = this.props.run_flip_animation ? logoClass : "logo-image";

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
                  <div className="logo-container">
                    <img className={logoClass} src={crypto_logo} />
                  </div>
                </div>

              </div>
            </div>
      );
  }

  renderLoading(){ return ( <div className="image-container"><img className="table_loading" src={table_loading} /></div> ); }

  renderError(){ return ( <div className="image-container"><img className="error_occurred" src={error_occurred} /></div> ); }

    render() {

      if(this.props.hasErrored) return this.renderError();
      else if(this.props.isLoading)  return this.renderLoading();

      return this.renderTable();

    }

}



//Takes application state(part of store),
//maps to props in component above
//gives access to this.state.props from store
function mapStateToProps(state){

    return {
        run_flip_animation: state.run_flip_animation,

        view_sort_obj: state.view_sort_obj,

        hasErrored: state.fetchHasErrored,
        isLoading: state.fetchIsLoading
      }
}


function matchDispatchToProps(dispatch){

  return {
      fill_crypto_type_data_set: () => dispatch(fill_crypto_type_data_set())
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(CoinMarketTable);
