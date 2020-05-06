import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Switch,Route,Redirect } from "react-router-dom";
import {deteuserInfo} from "../../redux/actions/login"; 
import { Layout } from 'antd';
import Check from "@/containers/Hoc/Check";
import Header from "./Header/Header"
import LeftNav from './LeftNav/LeftNav'
import Home from './Home/Home'
import User from './User/User'
import Role from './Role/Role'
import Product from './Product/Product'
import Category from './Category/Category'
import Bar from './Bar/Bar'
import Line from './Line/Line'
import Pie from './Pie/Pie'
import './css/admin.less'

const { Footer, Sider, Content } = Layout;
@connect(
  state=>({//读取信息
    username:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),
  {deteuserInfo}
)
@Check
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
    // if (!this.props.isLogin) return <Redirect to="/login"/>
    return (
			<Layout className="admin-container">
				<Sider>
          < LeftNav />
        </Sider>
				<Layout>
					<Header/>
					<Content className='admin-content'>
            <Switch>
              <Route path="/admin/home" component={Home}/>
							<Route path="/admin/prod_about/category" component={Category}/>
							<Route path="/admin/prod_about/product" component={Product}/>
							<Route path="/admin/user" component={User}/>
							<Route path="/admin/role" component={Role}/>
							<Route path="/admin/charts/bar" component={Bar}/>
							<Route path="/admin/charts/line" component={Line}/>
							<Route path="/admin/charts/pie" component={Pie}/>
							<Redirect to="/admin/home"/>
            </Switch>
          </Content>
					<Footer className='admin-footer'>推荐使用谷歌浏览器，获取最佳用户体验</Footer>
				</Layout>
			</Layout>
		)
  }
}

export default Admin