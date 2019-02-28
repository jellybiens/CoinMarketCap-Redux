import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { view_sort_obj_update } from '../../actions/actions-index';


class ResultsLimitText extends Component{


  limitChange(val){
    if(val <= 0) val=1;
    else if(val == "") val=20;
    else if(val > 5000) val=5000;

    let newSortObj = Object.assign({}, this.props.view_sort_obj);
    newSortObj["limit"] = parseInt(val);
    newSortObj["start"] = 1;

    this.props.view_sort_obj_update(newSortObj);
  }

    render() {

      let limit = this.props.view_sort_obj["limit"];
      let timoutTyping = null;

        return (

          <input  type="number"
                  className="filterTotal"
                  placeholder="limit"
                  defaultValue={limit}
                  onChange={(e) => {
                      let val = e.target.value.replace(/\s/g, '');

                      clearTimeout(timoutTyping);

                      timoutTyping = setTimeout(() => {
                          this.limitChange(val);
                      }, 500);

                    }
                  }
            />

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
    view_sort_obj_update: (sortObj) => dispatch(view_sort_obj_update(sortObj))
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(ResultsLimitText);
