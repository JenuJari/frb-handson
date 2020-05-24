// import _ from "lodash";
import produce from "immer";
import { combineReducers } from "redux";
import { APP_INIT_SUCCESS } from "./../types";

const initialState = {
  loaded: false
};

const configs = (state = initialState, action) => {
  switch (action.type) {
    case APP_INIT_SUCCESS: {
      return produce(state, (drft) => {
        drft.loaded = action.payload
      });
    }

    default: {
      return state;
    }
  }
}

export default combineReducers({
  configs
});