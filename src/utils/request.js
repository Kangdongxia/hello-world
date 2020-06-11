/* eslint-disable no-mixed-spaces-and-tabs */
import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";
import baseUrl from "@/utils/setBaseUrl";
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  //baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: baseUrl,
  withCredentials: true, // send cookies when cross-domain requests(不需要传递cookies的接口可不进行该项的设置)
  crossDomain: true,
  timeout: 5000 // 请求超时时间
});

//请求拦截器 访问接口前进行相关设置
service.interceptors.request.use(
  config => {
    /*if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }*/
    //console.log("data", baseUrl);
    config.headers["Content-Type"] ="application/x-www-form-urlencoded;charset=UTF-8";
    config.data = qs.stringify(config.data);
    //console.log('config',config);
    return config;
  },
  error => {
    // Do something with request error
    console.log("传参错误"); // for debug
    Promise.reject(error);
  }
);

//响应拦截器  获取数据后进行处理和错误提示 
service.interceptors.response.use( 
  response => {
    // 对响应数据做些事
    console.log('status', response.status)
    if (parseInt(response.status) !== 200) {
      console.log("访问接口出错");
      return Promise.resolve(response.data);
    } else {
      return Promise.resolve(response.data);
    }
  },
  error => {
    console.log("访问接口" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
