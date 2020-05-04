import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {deteuserInfo} from "../../redux/actions/login"; 
import { Layout } from 'antd';
import Header from "./Header/Header";
import './css/admin.less'

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  // logout=()=>{
  //   //删除redux中的数据及local中的数据
  //   this.props.deteuserInfo()
  // }
  // render() {
  //   if (!this.props.isLogin) return <Redirect to="/login"/>
  //   return (
  //     <div>
  //       欢迎{this.props.username}
       
  //       <button onClick={this.logout}> 退出登录</button>
  //     </div>
  //   )
  // }
  render(){
    if (!this.props.isLogin) return <Redirect to="/login"/>
    return (
			<Layout className="admin-container">
				<Sider>Sider</Sider>
				<Layout>
					<Header/>
					<Content>Content</Content>
					<Footer>Footer</Footer>
				</Layout>
			</Layout>
		)
  }
}

export default connect(
  state=>({//读取信息
    username:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),
  {deteuserInfo}
)(Admin)