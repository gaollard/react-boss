import cookie from 'js-cookie'
import {api} from '../config/index'

const ERROR = 'ERROR';
const LOAD_USERS_DATA = 'LOAD_USERS_DATA';

// **** initial state ****
const initState = {
  errMsg: '',
  redirectUrl: '',
  list: []
};

// **** reducer ****
export function boss(state = initState, action) {
  switch (action.type) {
    case LOAD_USERS_DATA:
      return {
        ...state,
        errMsg: '',
        ...action.payload,
      };
    case ERROR:
      return {
        ...state,
        errMsg: action.payload
      };
    default:
      return state
  }
}

// **** actions ****
export function loadBosses() {
  return async dispatch => {
    let res = await api.users({type: 'boss'});
    if (res.code === '0') {
      dispatch({type: LOAD_USERS_DATA, payload: {
        list:res.data.list
      }})
    } else {
      dispatch({type: ERROR, payload: res.msg})
    }
  }
}