import request from '../utils/request';

export const host = process.env.NODE_ENV === 'development'
  ? '/proxy/'
  : 'http://39.108.138.156:3000/';

export const api = {
  /**
   * 登录
   * @param mobile
   * @param pwd
   * @param type
   * @returns {AxiosPromise<any>}
   */
  login({mobile, pwd, type}) {
    pwd = pwd.replace(/\s/g, '');
    mobile = mobile.replace(/\s/g, '');
    return request.post(`${host}oauth/login/`, {mobile, pwd})
  },
  /**
   * 更新用户信息
   * @param params
   * @returns {AxiosPromise<any>}
   */
  update(params) {
    return request.post(`${host}oauth/update/`, params)
  },
  /**
   * 获取用户列表
   * @param type
   * @returns {AxiosPromise<any>}
   */
  users({type}) {
    return request.get(`${host}users/${type}`)
  },
  /**
   * 图片上传
   * @param params
   * @returns {AxiosPromise}
   */
  upload(params) {
    return request({
      method: 'post',
      url: `${host}upload/avatar`,
      data: params,
      headers: {'Content-Type': 'multipart/form-data'}
    })
  }
};