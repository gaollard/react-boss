import {api} from "../config/index"

const ERROR_MSG = 'ERROR_MSG';
const COMPANY_LIST = 'COMPANY_LIST';

const initState = {
  list: [],
  errMsg: ''
};

export function company(state = {...initState}, action) {
  switch (action.type) {
    case COMPANY_LIST:
      return {
        errMsg: '',
        list: state.list.concat(action.payload)
      };
    case ERROR_MSG:
      return {
        errMsg: action.payload
      };
    default:
      return state;
  }
}

export function fetchCompanyList() {
  return async dispatch => {
    let res = await api.getCompanyList();
    if (res.code === '0') {
      dispatch({
        type: COMPANY_LIST,
        payload: res.data.list
      })
    } else {
      dispatch({
        type: ERROR_MSG,
        msg: res.msg
      })
    }
  }
}