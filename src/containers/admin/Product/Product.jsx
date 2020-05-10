import React, { Component } from 'react'
import {Card,Button,Select,Input,Table, message } from 'antd'
import {PlusCircleOutlined,SearchOutlined} from '@ant-design/icons'
import { reqProductList,reqSearchList,reqUpdateProduct } from "@/api";
import { PAGE_SIZE } from "@/config";

const { Option } = Select;

export default class Product extends Component {
  state={
    pageNum: 0,
    total: 0,
    productList:[],
    searchType:'productName',//默认按名字搜索
    keyword:'',
    isloading:false
  }
  changeStatus=async (_id,currentstatus)=>{
    if(currentstatus===1) currentstatus=2
    else currentstatus=1
    let result =await reqUpdateProduct(_id,currentstatus)
    const {status,msg}=result
    if(status===0){
      message.success(currentstatus===1?'上架成功':'下架成功')
      this.getProductList(this.state.pageNum)//为了防止他跳 即位置变化
    }else{
      message.error(msg)
    }
  }
  getProductList = async (number=1)=>{
    let result
    this.setState({isloading:true})
    if(this.isSearch){
      const {searchType,keyword}=this.state
      result= await reqSearchList(searchType,keyword,number,PAGE_SIZE)
    }else{
      result = await reqProductList(number,PAGE_SIZE)
    }
    
    //console.log(result)
    const {status,data,msg} = result
    if(status === 0){
      const {total,list,pageNum} = data
			this.setState({productList:list,total,pageNum,isloading:false})
    }else{
      message.error(msg)
    }
  }
  componentDidMount(){
    this.getProductList()
   }
  render() {
    const dataSource = this.state.productList;
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        align:'center'
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
        align:'center'
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align:'center',
        render:(price)=>'¥'+price
      },
      {
        title: '状态',
        //dataIndex: 'status',
        key: 'status',
        align:'center',
        render:(productObj)=>{
          const {_id,status}=productObj
          return (
            <div>
            <Button onClick={()=>{this.changeStatus(_id,status)}} type={status===1?'danger':'primary'}>
              {status===1?'下架':'上架'}
            </Button><br/>
          <span >{status===1?'在售':'售罄'}</span>
          </div>
          )
        }
        
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: 'action',
        align:'center',
        render:(id)=>(
          <div>
            <Button onClick={()=>{
              this.props.history.push(`/admin/prod_about/product/detail/${id}`)
            }} type="link">详情</Button><br/>
            <Button onClick={()=>{
              this.props.history.push(`/admin/prod_about/product/update/${id}`)
            }} type="link">修改</Button>
          </div>
        )
      },
    ]; 

    return (
    <Card 
      title={
      <div>
        {/* onChange={handleChange} */}
        <Select defaultValue="productName"  
          onChange={value=>{
            this.setState({searchType:value})
          }}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input 
         onChange={event=>{this.setState({keyword:event.target.value})}}
         allowClear 
         style={{width:'20%',margin:'10px'}}
         placeholder='请输入关键字'
       
        />

        <Button onClick={()=>{
          this.isSearch=true//标识当前动作为搜索
          this.getProductList()
        }} 
          type="primary">
          <SearchOutlined/>搜索
        </Button>
      </div>
      } 
      extra={
         <Button 
           onClick={()=>{
            this.props.history.push('/admin/prod_about/product/add')
           }}
           type="primary"
         >
            <PlusCircleOutlined/> 添加商品
         </Button> 
      } 
      
    >
      <Table 
        loading={this.state.isloading}
        dataSource={dataSource}
        columns={columns} 
        bordered
        rowKey="_id" 
        pagination={{
          pageSize:PAGE_SIZE,
          total:this.state.total,
          current:this.state.pageNum,
          onChange:(number)=>{
            this.getProductList(number)
          }

        }}
        />
    </Card>
    )
  }
}
