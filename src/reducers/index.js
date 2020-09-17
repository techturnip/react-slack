//=====================================================|
// REDUCER FILE =======================================|
//=====================================================|
// IMPORTS ============================================|
//=====================================================|
import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";
//=====================================================|
// INITIAL STATE ======================================|
//=====================================================|
// USER STATE -----------------------------------------|
//-----------------------------------------------------|
const initialUserState = {
  currentUser: null,
  isLoading: true,
};
//-----------------------------------------------------|
// CHANNEL STATE --------------------------------------|
//-----------------------------------------------------|
const initialChannelState = {
  currentChannel: null,
};
//=====================================================|
// REDUCERS ===========================================|
//=====================================================|
// USER REDUCER ---------------------------------------|
//-----------------------------------------------------|
const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
//-----------------------------------------------------|
// CHANNEL REDUCER ------------------------------------|
//-----------------------------------------------------|
const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel,
      };
    default:
      return state;
  }
};
//=====================================================|
// COMBINE REDUCERS ===================================|
//=====================================================|
const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer,
});
//=====================================================|
// EXPORT ROOT REDUCER --------------------------------|
//=====================================================|
export default rootReducer;
//=====================================================|
