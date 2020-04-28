//配置所有用于管理项目的ajax请求,每个请求对应一个函数

import ajax from "./ajax"
//请求登录的函数 loginObj:{username:'',password:''}
 export const reqLogin=async(loginObj)=> ajax.post('/login',loginObj)
