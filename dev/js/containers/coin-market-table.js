import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { fill_crypto_type_data_set, update_view_width } from '../actions/actions-index';
import CoinMarketTableBody from '../containers/coin-market-table-body';
import CoinMarketTableHead from '../containers/coin-market-table-head';
import table_loading from '../images/loading.gif';
import error_occurred from '../images/error-occurred.jpg';

class CoinMarketTable extends Component{


  componentDidMount(){
    this.props.fill_crypto_type_data_set();

    let width = document.body.clientWidth;
    this.props.update_view_width(width);
  }

  renderTable(){

      return (

            <div className='table'>
                <CoinMarketTableHead />
                <CoinMarketTableBody  />
            </div>

      );
  }

  renderLoading(){ return ( <div className="image-container">
                              <div className="image-flex-container">
                                <img className="table_loading" src={table_loading} />
                              </div>
                            </div> ); }

  renderError(){ return ( <div className="image-container">
                            <div className="image-flex-container">
                              <img className="error_occurred" src={error_occurred} />
                            </div>
                          </div> ); }

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
        hasErrored: state.fetchHasErrored,
        isLoading: state.fetchIsLoading
      }
}


function matchDispatchToProps(dispatch){

  return {
      fill_crypto_type_data_set: () => dispatch(fill_crypto_type_data_set()),
      update_view_width: (width) => dispatch(update_view_width(width))
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(CoinMarketTable);
