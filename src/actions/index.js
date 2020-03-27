//=====================================================|
// ACTIONS FILE =======================================|
//=====================================================|
// IMPORTS ============================================|
//=====================================================|
import * as actionTypes from './types';
//=====================================================|
// ACTIONS ============================================|
//=====================================================|
// USER ACTIONS ---------------------------------------|
//-----------------------------------------------------|
export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  };
};
//=====================================================|
