import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {  view_sort_obj_update } from '../../actions/actions-index';


class CryptoTypeSelect extends Component{


  selectChange(val){

    let newSortObj = Object.assign({}, this.props.view_sort_obj);

    newSortObj["cryptocurrency_type"] = val;
    newSortObj["start"] = 1;

    this.props.view_sort_obj_update(newSortObj);



  }



    render() {

      let filter = this.props.view_sort_obj["cryptocurrency_type"];

        return (

              <select className="cryptoTypeSelect" defaultValue={filter}
                      onChange={(e) => this.selectChange(e.target.value)}
                    >
                    <option value="all">All</option>
                    <option value="coins">Coins</option>
                    <option value="tokens">Tokens</option>
              </select>

        );
    }

}


//Takes application state(part of store),
//maps to props in component above
//gives access to this.state.props from store
function mapStateToProps(state){

    return {
            view_sort_obj: state.view_sort_obj
      }

}


function matchDispatchToProps(dispatch){

  return {
          view_sort_obj_update: (sortObj) => dispatch(view_sort_obj_update(sortObj))
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(CryptoTypeSelect);
