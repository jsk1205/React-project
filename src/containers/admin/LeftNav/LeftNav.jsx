import React, { Component } from 'react'
import { NavLink,withRouter } from "react-router-dom";
import {Menu} from 'antd';
import {connect} from 'react-redux'
import {saveTitle} from '@/redux/actions/title'
import menus from '@/config/menus'
import logo from '@/assets/images/logo.png'
import  './css/leftNav.less'

const {SubMenu,Item}=Menu

@connect(
  ()=>({}),
	{saveTitle}
)
@withRouter
class LeftNav extends Component {
  saveTitle = (title)=>{//event那也可以拿到但不好拿 不如直接用menuObj.title
		//console.log(title);
		this.props.saveTitle(title)
	}
  createMenu=(menuArr)=>{
    return menuArr.map((menuObj)=>{
      if(!menuObj.children){//如果没有 返回打不开的菜单
				return (
					<Item key={menuObj.key} onClick={()=>{this.saveTitle(menuObj.title)}}>
						<NavLink to={menuObj.path} >
							<menuObj.icon/>{menuObj.title}
						</NavLink>
					</Item>
				)
      }else{
        return (
          <SubMenu 
						key={menuObj.key} 
						icon={<menuObj.icon/>} 
						title={menuObj.title}
					>
						{this.createMenu(menuObj.children)}
					</SubMenu>
        )
      }
    })
 }
 //计算title
 MenuTitle=()=>{
  const {pathname} = this.props.location 
  //  console.log(pathname)
  let currentKey = pathname.split('/').slice(-1)[0]
  //  console.log(currentKey)
  if(currentKey === 'admin') currentKey = 'home'//解决退出登录之后在登录不能正常显示标题首页中文的问题
  if(pathname.indexOf('product')) currentKey = 'product'
  let title = ''
  //拿着key 去和菜单中的title做对比
  menus.forEach((menuObj)=>{
    //打开的菜单
    if(menuObj.children instanceof Array){
      let result = menuObj.children.find((childObj)=>{
        return childObj.key === currentKey
      })
      if(result) title = result.title
    }else{//找不到子菜单就在自身查找
      if(menuObj.key === currentKey) title = menuObj.title
    }  
  })
  this.props.saveTitle(title)//接到返回值并存入redux的title里面
 }
 //根据路径计算出中文菜单名称
 componentDidMount(){
   this.MenuTitle()
 }
  render() {
    // console.log(this.props)
    const {pathname}=this.props.location
    // console.log(pathname)
    const openkey=pathname.split('/')//自动展开
    // console.log(openkey)
    let checkUI=openkey.slice(-1)
    if(openkey.indexOf('product') !== -1) checkUI = ['product']
    return (
      <div className="left">
        <div className="l-top">
          <img src={logo} alt=""/>
          <span>商品管理系统</span>
        </div>
       
          <Menu
            selectedKeys={checkUI}//数组
            defaultOpenKeys={openkey}
            mode="inline"
            theme="dark"
          >
            {this.createMenu(menus)}
          </Menu>
        
      </div>
    )
  }
}
export default LeftNav