import React, { Component } from 'react'
import { Card,Button,Table,Modal,Form,Input} from "antd";
// import { reqCategoryList } from "@/api";
import {PlusCircleOutlined} from '@ant-design/icons';
import { connect } from "react-redux";
import { catrgoryAsync } from "@/redux/actions/category";
const {Item} = Form
@connect(
  state=>({categoryList:state.categoryList}),
  {catrgoryAsync}
)
 class Category extends Component {
  state = { visible: false };
  showModal = () => {//展示弹窗
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {//确认的回调
    this.setState({
      visible: false,
    });
  };

  handleCancel = ()=> {//取消的回调
    this.setState({
      visible: false,
    });
  };
  //同步action
  // getCategoryList=async()=>{
  //   let result =await reqCategoryList()
  //    console.log(result)
  //   if(status===0){
  //     this.setState({CategoryList:data})
  //   }
  // }
  componentDidMount(){
    this.props.catrgoryAsync()
  }
  
  render() {
    //表格的数据源
    const dataSource = this.props.categoryList
    
    //表格的列配置
    const columns = [
      {
        title: '分类',
        dataIndex: 'name',
        key: '1',
      },
      {
        title: '操作',
        //dataIndex: 'name',
        render:()=><Button type="link"> 修改分类</Button>,
        align:'center',
        key: '2',
      },
     
    ];
    return (
      <div>
        <Card extra={
            <Button onClick={this.showModal} type="primary" >
							<PlusCircleOutlined />添加
						</Button>
          }>
           <Table dataSource={dataSource} 
           columns={columns} 
           bordered
           rowKey="_id" 
           paginatio={{//分页器
             pageSize:5
           }} 
           />
        </Card>
        <Modal
        title="新增分类"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form>
          <Item
            name="category"
            rules={[
              {required:true,message:'分类名必须输入'}
            ]}
          >
            <Input placeholder="请输入分类名"/>
          </Item>
        </Form>
      </Modal>
    </div>
    )
  }
}
export default Category