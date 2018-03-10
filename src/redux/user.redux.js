import cookie from 'js-cookie'
import {api} from '../config/index'

const ERROR = 'ERROR';
const LOAD_USER_DATA = 'LOGIN_SUCCESS';

let userInfo = cookie.get('userInfo');
try {
  userInfo && (userInfo = JSON.parse(userInfo));
} catch (e) {
  console.log(e);
}

// **** initial state ****
const initState = {
  errMsg: '',
  userkey: '',
  mobile: "",
  nickname: "",
  avatar: "",
  type: '',
  _id: '',
  redirectUrl: '',
  ...userInfo
};

// **** reducer ****
export function user(state = initState, action) {
  switch (action.type) {
    case LOAD_USER_DATA:
      cookie.set('userInfo', action.payload.userInfo);
      return {
        ...state,
        errMsg: '',
        ...action.payload.userInfo,
        redirectUrl: '/genius'
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
export function login() {
  return async dispatch => {
    let ret = await api.login();
    if (ret.code === '0') {
      dispatch({type: LOAD_USER_DATA, payload: ret.data})
    } else {
      dispatch({type: ERROR, payload: ret.msg})
    }
  }
}