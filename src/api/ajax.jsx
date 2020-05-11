//对axios的二次封装
import axios from "axios"
import qs from 'querystring'
import { message as  msg} from "antd" //弹窗
import store from "@/redux/store"
import { deleuserInfo } from "@/redux/actions/login";
import {saveTitle} from '@/redux/actions/title'
import nprogress from 'nprogress'
import  "nprogress/nprogress.css"
//axios请求拦截器
    //1.配置基本路径及超时
    //2.请求格式为json,转换为urlencoded
    //3.统一返回真正的数据data
    //4.统一处理请求错误
 //基本配置 
axios.defaults.baseURL='/api'
axios.defaults.timeout=2000
//请求拦截器
axios.interceptors.request.use((config)=>{
  nprogress.start()
  //console.log(config)//config里面的data此时还未转换为json格式
  const {method,data}=config
  //console.log(method,data) 
  //post {username: "admin", password: "admin"}
  //data此时为对象还未转换为json
  // 2.请求格式为json,转换为urlencoded
  if(method.toLowerCase()==='post'&& data instanceof Object){
    config.data=qs.stringify(data)
  }
  //如果存在token
  const {token} = store.getState().userInfo
	if(token){
		config.headers.Authorization = 'atguigu_'+token
    //console.log(store.getState().userInfo.token)
  }
  return config
})

//响应拦截器
axios.interceptors.response.use(
  
  //成功的回调 状态码2 开头
  response=>{
    nprogress.done()
    return response.data
  },
  //失败的回调 状态码不是2 开头/超时/网络不通
  err => {
    nprogress.done()
		let errmsg = '未知错误，请联系管理员'
		const {message} = err
    if(message.indexOf('401') !== -1) {
    //强制退出回到login然后联系redux删除所有用户数据的信息,强制重新登录
    store.dispatch(deleuserInfo())
    store.dispatch(saveTitle(''))

    errmsg = '未登录或身份过期，请重新登录！'
    }
		else if(message.indexOf('Network Error') !== -1) errmsg = '网络不通，请检查网络连接！'
		else if(message.indexOf('timeout') !== -1) errmsg = '网络不稳定，连接超时！'
		msg.error(errmsg,1)
		return new Promise(()=>{})
	}
  )
export default axios