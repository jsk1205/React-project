//配置所有用于管理项目的ajax请求,每个请求对应一个函数

import ajax from "./ajax"
import jsonp from 'jsonp'
import {CITY,WEATHER_AK} from '../config'
//请求登录的函数 loginObj:{username:'',password:''}
 export const reqLogin=async(loginObj)=> ajax.post('/login',loginObj)
 export const reqWeather=()=>{
   //使用jsonp发送请求
   const url=`http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_AK}`
   jsonp(url,{
     timeout:2000
   },
    (err,data)=>{
     console.log(err,data)
   })
 }