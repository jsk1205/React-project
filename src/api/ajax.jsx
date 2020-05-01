//对axios的二次封装
import axios from "axios"
import qs from 'querystring'
import { message as  msg} from "antd" //弹窗
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
  //console.log(config)//config里面的data此时还未转换为json格式
  const {method,data}=config
  console.log(method,data) 
  //post {username: "admin", password: "admin"}
  //data此时为对象还未转换为json
  // 2.请求格式为json,转换为urlencoded
  if(method.toLowerCase()==='post'&& data instanceof Object){
    config.data=qs.stringify(data)
  }
  return config
})

//响应拦截器
axios.interceptors.response.use(
  //成功的回调 状态码2 开头
  response=>{return response.data},
  //失败的回调 状态码不是2 开头/超时/网络不通
  err => {
		let errmsg = '未知错误，请联系管理员'
		const {message} = err
		if(message.indexOf('401') !== -1) errmsg = '未登录或身份过期，请重新登录！'
		else if(message.indexOf('Network Error') !== -1) errmsg = '网络不通，请检查网络连接！'
		else if(message.indexOf('timeout') !== -1) errmsg = '网络不稳定，连接超时！'
		msg.error(errmsg,1)
		return new Promise(()=>{})
	}
  )
export default axios