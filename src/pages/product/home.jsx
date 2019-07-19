import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table } from 'antd'
import LinkButton from '../../components/link-button'
import {reqProducts,reqSearchProduct} from '../../api'
const Option = Select.Option
/**
 * 商品管理的首页组件
 */
export default class ProductHome extends Component {
  state = {
    loading: false,
    products: [],
    total: 0,
    searchType:'productName',
    searchName:''
  }
  initColums = () => {
    this.cloums = [
      {
        title: '商品名称',
        dataIndex: 'name'
      }, {
        title: '商品描述',
        dataIndex: 'desc'
      }, {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price
      }, {
        title: '状态',
        width: 100,
        dataIndex: 'status',
        render: (status) => {
          let btnText = '下架'
          let text = '在售'
          if (status === 2) {
            btnText = '上架'
            text = '已上架'
          }
          return (
            <span>
              <Button type='primary'>{btnText}</Button>
              <span>{text}</span>
            </span>
          )
        }
      }, {
        title: '操作',
        render: (product) => (
          <span>
            <LinkButton>详情</LinkButton>
            <LinkButton>修改</LinkButton>
          </span>
        )
      }
    ]
  }
  //使用后台分页技术获取指定页码的商品列表显示
  getProducts= async (pageNum)=>{
    this.pageNum=pageNum
    this.setState({loading:true})
    let result
    const {searchName,searchType}=this.state
    //关于空字符串问题，空字符串转化为布尔值为false，取反之后为true
    if(!searchName){
      result=await reqProducts(pageNum,2)
      console.log(1, result)
    }else{
      result=await reqSearchProduct({ pageNum, pageSize:2, searchName, searchType })
      console.log(2, result)
    }
    if(result.status===0){
      const {total,list}=result.data
      this.setState({products:list,total,loading:false})
    }
  }
  componentWillMount() {
    this.initColums()
  }
  componentDidMount(){
    this.getProducts(1)
  }
  render() {
    const { loading, products, total,searchType,searchName } = this.state
    const title = (
      <span>
        <Select 
        style={{ width: 200 }} 
        value={searchType}
        onChange={(value)=>this.setState({searchType:value})}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input 
        style={{ width: 200, margin: '0 10px' }} 
        placeholder="关键字"
        value={searchName} 
        onChange={(event)=>this.setState({searchName:event.target.value})}
        />
        <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>
      </span>
    )
    const extra = (
      <Button type='primary'>
        <Icon type='plus' />
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered={true}
          rowKey='_id'
          loading={loading}
          columns={this.cloums}
          dataSource={products}
          pagination={{
            total,
            defaultPageSize:2,
            showQuickJumper:true,
            onChange:this.getProducts,
            current:this.pageNum
          }}
        />
      </Card>
    )
  }
}