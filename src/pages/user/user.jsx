import React, { Component } from 'react'
import {Card,Button,Table,Modal,message} from 'antd'
import {formateDate} from '../../until/dateUtils'
import LinkButton from '../../components/link-button'
import {reqUsers} from '../../api'

/** 
 * 用户管理
 */
export default class User extends Component {
  state={
    users:[],
    roles:[],
    isShow:false
  }
  initColumns=()=>{
    this.cloumns=[
      {
        title:"用户名",
        dataIndex:"username"
      },{
        title:"邮箱",
        dataIndex:"email"
      },{
        title:"电话",
        dataIndex:"phone"
      },{
        title:"注册时间",
        dataIndex:"create_time",
        render:formateDate
      },{
        title:"所属角色",
        dataIndex:"role_id",
        render:role_id => this.state.roles.find(role => role._id===role_id).name
      },{
        title:"操作",
        render:user=>(
          <span>
            <LinkButton>修改</LinkButton>
            <LinkButton>删除</LinkButton>
          </span>
        )
      }
    ]
  }
  getUsers=async ()=>{
    const result= await reqUsers()
    console.log(result)
    if(result.status===0){
      const {users,roles}=result.data

      this.setState({users,roles})
    }
  }
  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
    this.getUsers()
  }
  render() {
    const {users,roles}=this.state
    const title=<Button type="primary">创建用户</Button>
    return (
      <Card title={title}>
        <Table
         bordered
         rowKey='_id'
         dataSource={users}
         columns={this.cloumns}
         pagination={{defaultPageSize: 2}} 
        />
      </Card>
    )
  }
}
