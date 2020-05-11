import React, { Component } from 'react'
import { connect } from "react-redux";
import {catrgoryAsync} from '@/redux/actions/category'
import { Button,Card,Form,Input,Select } from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import PictureWall from './PictureWall/PictureWall'

const {Item}=Form
const {Option}=Select 

@connect(
  state=>({categoryList:state.categoryList}),
  {catrgoryAsync}
)
 class AddUpdate extends Component {
  onFinish=(values)=>{

  }
  componentDidMount(){
    const {categoryList,catrgoryAsync} = this.props
		if(categoryList.length === 0) catrgoryAsync()
  }
  render() {
    return (
      <Card title={
        <div>
          <Button  onClick={()=>{ this.props.history.goBack()}} type="link"> <ArrowLeftOutlined />返回</Button>
          <span>商品添加</span>
        </div>
      } >
      <Form initialValues={{categoryId:''}}
					onFinish={this.onFinish}>
        <Item 
        name="name"
        rules={[{required:true,message:'商品名称必须输入'}]}
        label="商品名称"
        wrapperCol={{span:6}}
        >
        <Input placeholder="商品名称"/>
        </Item>
        <Item 
        name="desc"
        rules={[{required:true,message:'商品描述必须输入'}]}
        label="商品描述"
        wrapperCol={{span:6}}
        >
        <Input placeholder="商品描述"/>
        </Item>
        <Item 
        name="price"
        rules={[{required:true,message:'商品价格必须输入'}]}
        label="商品价格"
        wrapperCol={{span:6}}
        >
        <Input addonAfter="元" addonBefore="￥"  type="number" placeholder="商品价格"/>
        </Item>
        <Item 
        name="categoryId"
        rules={[{required:true,message:'请选择分类'}]}
        label="商品分类"
        wrapperCol={{span:6}}
        >
        <Select >
          <Option value="">请选择分类</Option>
          {
            this.props.categoryList.map((categoryObj)=>{
              return <Option key={categoryObj._id} 
              value={categoryObj._id}>{categoryObj.name}</Option>
            })
          }
        </Select>
        </Item>
        <Item
					label="商品图片"
					wrapperCol={{span:6}}
					style={{marginLeft:'12px'}}
				>
				 {/* <PictureWall/> */}
				</Item>
				<Item
					label="商品详情"
					wrapperCol={{span:6}}
					style={{marginLeft:'12px'}}
				>
					<PictureWall/>
				</Item>
				<Item>
					<Button type="primary" htmlType="submit">提交</Button>
				</Item>
      </Form>
      </Card>
     
    )
  }
}
export default AddUpdate