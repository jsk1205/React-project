import React, { Component } from 'react'
import { Card,Button,Table,Modal,Form,Input,message} from "antd";
// import { reqCategoryList } from "@/api";
import {PlusCircleOutlined} from '@ant-design/icons';
import { connect } from "react-redux";
import { catrgoryAsync } from "@/redux/actions/category";
import { reqAddCategory } from "@/api";

const {Item} = Form
@connect(
  state=>({categoryList:state.categoryList}),
  {catrgoryAsync}
)
 class Category extends Component {
  state = { visible: false };
  showModal = (categoryObj) => {//展示弹窗-->修改分类-->传入参数修改
    //console.log(categoryObj)
    const {categoryForm}=this.refs
     this._id =''
     this.name=''
     this.isUpdate=false
     const {_id,name}=categoryObj
     if(_id && name){
      this._id =_id,
      this.name=name,
      this.isUpdate=true
     }
    this.setState({
      visible: true,
    });
  };

  handleOk = async() => {//确认的回调
    //1.获得表单实例
    const {categoryForm}=this.refs
    //console.log(categoryForm.getFieldsValue())//category: "肖战"
    //因为 item 里面的name 
    const {name}=categoryForm.getFieldsValue()
    //2.校验数据
    if(!name || !name.trim()){
      message.error('输入不能为空',1)
    }else{
      //合法输入 添加/修改 请求分类
      let result= await reqAddCategory(name)
      const {status,msg}=result
      if(status===0){
        message.success('添加成功')
        //再次请求分类列表,加在最前方
        this.props.catrgoryAsync()
         //3.隐藏弹窗
        this.setState({ visible: false});
        //4.重置表单
        categoryForm.resetFields()
      }else{
        message.error('添加失败',msg)
      }

    }
   
  };

  handleCancel = ()=> {//取消的回调
    const {categoryForm}=this.refs
    this.setState({
      visible: false,
    });
    categoryForm.resetFields()
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
        render:(categoryObj)=><Button onClick={()=>{
          this.showModal(categoryObj)}} type="link"> 修改分类</Button>,
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
        <Form ref="categoryForm">
          <Item
            name="name"
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