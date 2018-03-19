import {api} from '../config/index'

const JOB_LOAD_DATA = 'JOB_LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  errMsg: '',
  redirectUrl: '',
  list: []
}

export function job(state = initState, action) {
  const {payload, type} = action
  switch (action.type) {
    case JOB_LOAD_DATA:
      return {
        ...state,
        errMsg: '',
        list: state.list.concat(payload)
      }
    case ERROR_MSG:
      return {
        errMsg: payload
      }
    default:
      return state
  }
}

export function loadJobList() {
  return async dispatch => {
    let ret = await api.jobList();
    if (ret.code === '0') {
      dispatch({
        type: JOB_LOAD_DATA,
        payload: ret.data.list
      })
    } else {
      dispatch({
        type: ERROR_MSG,
        payload: ret.msg
      })
    }
  }
}