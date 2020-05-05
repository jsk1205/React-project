import React, { Component } from 'react'
import  './css/leftNav.less'
import {Menu} from 'antd';
import menus from '@/config/menus'
import logo from '@/assets/images/logo.png'
const {SubMenu,Item}=Menu

export default class LeftNav extends Component {
  createMenu=(menuArr)=>{
    return menuArr.map((menuObj)=>{
      if (!menuObj.children) {
        //如果没有 返回打不开的菜单
        return (
          <Item key={menuObj.key} icon={<menuObj.icon/>}>
            {menuObj.title}
          </Item>
        )
      }else{
        return (
          <SubMenu key={menuObj.key} icon={<menuObj.icon/>}  title={menuObj.title}>
          {this.createMenu(menuObj.children)}
        </SubMenu>
        )
      }
    })
 }
  render() {
    return (
      <div className="left">
        <div className="l-top">
          <img src={logo} alt=""/>
          <span>商品管理系统</span>
        </div>
       
          <Menu
            defaultSelectedKeys={['home']}
            defaultOpenKeys={[]}
            mode="inline"
            theme="dark"
          >
            {this.createMenu(menus)}
          </Menu>
        
      </div>
    )
  }
}
