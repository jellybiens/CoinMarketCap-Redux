import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { view_sort_obj_update, refresh_coins_data_set } from '../../actions/actions-index';


class SetIntervalText extends Component{


    setRefreshInterval(e, timoutTyping){

      let newInterval = e.target.value.replace(/\s/g, '');

      clearTimeout(timoutTyping);
      //wait for user to stop typing
      timoutTyping = setTimeout(() => {

        if(newInterval <= 1) newInterval=1;
        else if(newInterval == "") newInterval=5;
        else if(newInterval > 60) newInterval=60;

        let intervalSet = this.props.view_sort_obj["setInterval"];
        clearInterval(intervalSet);
        let resetIntervalSortObj = Object.assign({}, this.props.view_sort_obj);
        this.props.view_sort_obj_update(resetIntervalSortObj);
        //reset interval
          intervalSet = setInterval(() => {
            let coins_lists = {
              "main_list": this.props.main_coins_list,
              "search_list": this.props.search_res_list,
              "compare_list": this.props.compare_list
            };
            let qsObj = Object.assign({}, this.props.view_sort_obj);
            this.props.refresh_coins_data_set(qsObj, coins_lists);

          }, newInterval * 60000);//set newInterval//convert into miliseconds

          let qsObj = Object.assign({}, this.props.view_sort_obj);
          qsObj["interval"] = parseInt(newInterval);
          qsObj["setInterval"] = intervalSet;
          this.props.view_sort_obj_update(qsObj);

      }, 500);
    }


    render() {

      let timoutTyping    = null;
      let defaultInterval = this.props.view_sort_obj["interval"];

        return (

          <input  type="number"
                  id="setInterval"
                  className="setInterval"
                  defaultValue={defaultInterval}
                  onChange={(e) => this.setRefreshInterval(e, timoutTyping) }
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

      view_sort_obj: state.view_sort_obj

      }

}


function matchDispatchToProps(dispatch){

  return {
    refresh_coins_data_set: (qsObj, coins_lists) => dispatch(refresh_coins_data_set(qsObj, coins_lists)),
    view_sort_obj_update: (sortObj) => dispatch(view_sort_obj_update(sortObj))
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(SetIntervalText);
