import request from '../utils/request';

export const host = process.env.NODE_ENV === 'development'
  ? '/proxy/'
  : 'http://39.108.138.156:3000/'

export const api = {
  login (params = {}) {
    return request.post(`${host}oauth/login`, {
      mobile: '18620343136',
      pwd: '199389'
    })
  }
}