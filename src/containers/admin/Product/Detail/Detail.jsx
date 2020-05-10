import React, { Component } from 'react'
import {Button,Card,List, message} from 'antd'
import { reqProductInfoById } from "@/api";
import {connect} from 'react-redux'
import { catrgoryAsync } from "@/redux/actions/category";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { IMAGE_URL } from "@/config";
import  './css/detail.less'
const {Item}=List
@connect(
  state=>({categoryList:state.categoryList}),
  {catrgoryAsync}
)
class Detail extends Component {
  state = {
		currentProduct:{imgs:[]} //当前商品信息
	}
  //有则用无则添加
  findCategoryName=(id)=>{
    let result=this.props.categoryList.find((catgoryObj)=>{
      return catgoryObj._id===id
    })
    if(result) return result.name
  }
  getProductInfo=async(id)=>{
    let result=await reqProductInfoById(id)
    const{status,data,msg}=result
    if(status===0) this.setState({currentProduct:data})
    else message.error(msg)
  }
  componentDidMount(){
    //this.props.match.params.id //获取id
    const {match,categoryList,catrgoryAsync} = this.props
    const {id} = match.params
    this.getProductInfo(id)
    //尝试获取categoryList 有则用无则添加
    if(categoryList===0){catrgoryAsync()}
  }
  render() {
    const {name,desc,price,categoryId,imgs,detail} = this.state.currentProduct
    return (
      <Card title={
        <div>
          <Button 
          onClick={()=>{ this.props.history.goBack()}} 
          type="link"> <ArrowLeftOutlined />返回</Button>
          <span>商品详情</span>
        </div>
       }
      >
      <List>
          <Item className="item">
            <span className="title">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item className="item">
            <span className="title">商品描述:</span>
            <span> {desc}</span>
          </Item>
          <Item className="item">
            <span className="title">商品价格:</span>
            <span>{ '¥'+price}</span>
          </Item>
          <Item className="item">
            <span className="title">商品分类:</span>
            <span>{categoryId}</span>
          </Item>
          <Item className="item">
            <span className="title">商品图片:</span>
            <span>
              {
              imgs.map((imgName)=>{ return <img key={imgName} src={IMAGE_URL+imgName} alt=""/>})
              }
            </span>
          </Item>
          <Item className="item">
            <span className="title">商品详情:</span>
            <span dangerouslySetInnerHTML={{__html:detail}}/>
          </Item>
      </List>
    </Card>
    )
  }
}
export default Detail