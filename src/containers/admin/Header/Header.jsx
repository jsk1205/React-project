import React, { Component } from 'react'
import { Button,Modal } from "antd"
import screenfull from 'screenfull'
import {
	FullscreenOutlined,
	FullscreenExitOutlined,
	ExclamationCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs'
import { connect } from "react-redux";
import {reqWeather} from '@/api'
import {deteuserInfo} from "@/redux/actions/login";
import  log from "./css/log.jpg";
import  "./css/header.less"

 const { confirm } = Modal;
 @connect(
  state=>({username:state.userInfo.user.username}),//映射状态 一箭头函数 默认返回对象
  {deteuserInfo}
 )
 class Header extends Component {
  state={
    isFull:false,
    time:dayjs().format('YYYY年MM月DD日 HH:mm:ss'), //时间
  }
  fullScreen=()=>{
    // const {isFull}=this.state
    // this.setState({isFull:!isFull})
    // screenfull.request()
    screenfull.toggle(); //切换全屏
  }
  logout=()=>{
    //this.props.deteuserInfo()
    confirm({
			title: '确定退出登录吗？', //弹窗的提示文字
			icon: <ExclamationCircleOutlined />, //弹窗中的图标
			content: '退出后需要重新登录', //副标题
			cancelText:'取消',
			okText:'确认',
			onOk:()=> { //确定按钮的回调
				this.props.deteuserInfo()
			}
		});
  }
  componentDidMount(){
    //检测屏幕的变化
    screenfull.onchange(()=>{
      const {isFull}=this.state
      this.setState({isFull:!isFull})
    })

    this.timer=setInterval(() => {
      this.setState({time:dayjs().format('YYYY年MM月DD日 HH:mm:ss')})
    }, 1000);
  
    //请求天气信息
    reqWeather()
  }
  componentWillUnmount(){
		clearInterval(this.timer)
	}
  render() {
    const {username}=this.props
    const {isFull,time}=this.state
    return (
      <div className="header">
        <div className="h-top">
        <Button size="small" onClick={this.fullScreen}>
        {isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </Button>
    <span className="username">欢迎,{username}</span>
          <Button type="link" size="small"
          onClick={this.logout}
          >退出登录</Button>
        </div>
        <div className="h-bot">
          <div className="bot-left">
            <span>首页</span>
          </div>
          <div className="bot-right">
            <span>{time}</span>
            <img src={log} alt=""/>
            <span>多云转晴</span>
            <span>温度：15~25℃</span>
          </div>
        </div>
      </div>
    )
  }
}
export default Header