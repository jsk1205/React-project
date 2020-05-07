//配置所有用于管理项目的ajax请求,每个请求对应一个函数

import ajax from "./ajax"
import jsonp from 'jsonp'
import { message } from "antd"
import {CITY,WEATHER_AK} from '../config'

//请求登录的函数 loginObj:{username:'',password:''}
 export const reqLogin=async(loginObj)=> ajax.post('/login',loginObj)
 export const reqWeather=()=>{
   //使用jsonp发送请求
    const URL = `http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_AK}`
    return new Promise((resolve)=>{
      //使用jsonp库发送请求
      jsonp(URL,{
        timeout:2000,
      },(err,data)=>{
        if(!err){
          resolve(data.results[0].weather_data[0])
        }else{
          message.error('请求天气信息有误，请联系管理员')
        }
		})
	})
 }
 export const reqCategoryList = () => ajax.get('/manage/category/list')
