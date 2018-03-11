import qs from 'qs'
import axios from 'axios'
import { Toast } from 'antd-mobile'

// 请求拦截
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    if(!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.data = qs.stringify(config.data);
    }
  }
  Toast.loading('加载中');
  return config
});

// 响应拦截
axios.interceptors.response.use(res => {
  Toast.hide();
  return res.data
});

export default axios;