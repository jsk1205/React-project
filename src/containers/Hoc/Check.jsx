import React,{Component} from 'react'
import {connect} from "react-redux"
import { Redirect } from "react-router-dom"
// 规则:
//如果没有登录,但是要看的是非login,不允许
//如果已经登录,但是要看的是login,不允许
export default function(ReciveComponent){
  @connect(
    state=>({isLogin:state.userInfo.isLogin}),
    {}
  )
  class TargetComponent extends Component{
    render(){
      //console.log(this.props)
      const {isLogin}=this.props
      const {pathname}=this.props.location
      //历史记录可知道你当前地址,在路由组件里面可以直接拿location里面的标识
      //添加判断
      //首先要知道 是否登录-->读取登录的信息
      if(!isLogin && pathname !=='/login')
      return <Redirect to="/login"/>
      if(isLogin && pathname ==='/login')
      return <Redirect to="/admin"/>
      return <ReciveComponent {...this.props}/>
    }
  }
  return TargetComponent
}