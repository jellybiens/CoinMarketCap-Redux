import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {  update_is_searching,
          update_search_text_val,
          search_res_list_update,
          search_for_matches,
          view_sort_obj_update } from '../../actions/actions-index';


class CryptoSearchText extends Component{


  searchForMatches(val){

    if(val.replace(/\s/g, "") === ""){
      this.props.update_is_searching(false);
      this.props.update_search_text_val("");
      this.props.search_res_list_update([]);
      return;
    }

    let newMainSort = Object.assign({}, this.props.view_sort_obj);
    newMainSort["start"] = 1;
    this.props.view_sort_obj_update(newMainSort);



    this.props.update_is_searching(true);
    this.props.update_search_text_val(val);
    let search_list = this.props.flipped_view ? this.props.compare_list : this.props.main_coins_list;
    this.props.search_for_matches(val, search_list);


  }


    render() {
      var timoutTyping = null;

        return (


          <input  type="textbox"
                  className="searchNameTxt"
                  placeholder="search"
                  defaultValue={this.props.search_box_text}
                  onChange={(e) => {

                    let val = e.target.value;
                    clearTimeout(timoutTyping);

                    timoutTyping = setTimeout(() => {

                        this.searchForMatches(val);
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
      is_searching: state.is_searching,
      search_box_text: state.search_box_text

      }

}


function matchDispatchToProps(dispatch){

  return {
      update_is_searching: (is) => dispatch(update_is_searching(is)),
      update_search_text_val: (txt) => dispatch(update_search_text_val(txt)),
      search_res_list_update: (search_res_list) => dispatch(search_res_list_update(search_res_list)),
      search_for_matches: (search_text, search_list) => dispatch(search_for_matches(search_text, search_list)),
      view_sort_obj_update: (sortObj) => dispatch(view_sort_obj_update(sortObj))
  }

}


export default connect(mapStateToProps, matchDispatchToProps)(CryptoSearchText);
