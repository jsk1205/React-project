//action 本身是一个对象
import { SAVE_USERINFO,DELE_USERINFO } from "../action_types"

export const saveUserInfo= userObj =>{
//向localstorage中保存当前登录的用户信息(字符串)
const {user,token} = userObj
localStorage.setItem('user',JSON.stringify(user))
localStorage.setItem('token',token)
return {type:SAVE_USERINFO,data:userObj}
}

export const deleuserInfo=()=>{
  localStorage.clear()
  return {type:DELE_USERINFO}
}