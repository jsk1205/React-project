//本质是一个函数

import { SAVE_USERINFO ,DELE_USERINFO} from "../action_types";
let _user
try{
 _user=JSON.parse(localStorage.getItem('user'))
}catch(error){
  _user = null
}
let _token=localStorage.getItem('token')

let initState={
  user:_user||{},
  token:_token||'',
  isLogin:_user&&_token ?true:false 
  //可能有两种情况：空 如果local里有，就以local中的为准
}//定义一个初始化状态
export default function (preState=initState,action) {
  const {type,data}=action
  let newState
  switch (type) {
    case SAVE_USERINFO:
      newState={...data,isLogin:true}
      return newState
    case DELE_USERINFO:
      newState={user:{},token:'',isLogin:false}
      return newState
    default:
      return preState
  }
}