import React, { Component } from 'react'
import {Card,Button,Table,Modal,message} from 'antd'
import {PAGE_SIZE} from '../../until/Constants'
import LinkButton from '../../components/link-button'
import {formateDate} from '../../until/dateUtils'
import memoryUtils from '../../until/memoryUtils'
import {reqRoles,reqAddRole,reqUpdateRole} from '../../api'
import AddForm from'./add-form'
import AuthForm from './auth-form'
/**
 * 角色管理
 */
export default class Role extends Component {
  constructor (props){
    super(props)
    this.authRef=React.createRef()
  }
  state={
    roles:[],
    isShowAdd:false,
    isShowAuth:false
  }
  //初始化table列数组
  initColumn=()=>{
    this.columns=[
      {
        title:'角色名称',
        dataIndex:'name'
      },
      {
        title:'创建时间',
        dataIndex:'create_time',
        render:formateDate
      },
      {
        title:'授权时间',
        dataIndex:'auth_time',
        render:formateDate
      },
      {
        title:'授权人',
        dataIndex:'auth_name'
      },
      {
        title:'操作',
        render:(role)=> <LinkButton onClick={()=>{this.showAuth(role)}}>设置权限</LinkButton>
      }
    ]
  }
  updateRole=async()=>{
    this.setState({isShowAuth:false})
    const {role}=this
    role.menus=this.authRef.current.getMenus()
    role.auth_time=Date.now()
    role.auth_name=memoryUtils.users.username
    //console.log(role,role.auth_name)
    const result=await reqUpdateRole(role)
    if(result.status===0){
      message.success("角色授权成功")
      this.getRoles()
    }else{
      message.error(result.msg)
    }
  }
  getRoles=async()=>{
    const result=await reqRoles()
    //console.log(result)
    if(result.status===0){
      const roles=result.data
      this.setState({roles})
    }
  }
  //点击更改权限
  showAuth=(role)=>{
    this.role=role
    this.setState({
      isShowAuth:true
    })
  }
  //点击添加角色
  addRole=()=>{
    this.form.validateFields(async(err,values)=>{
      if(!err){
        this.setState({isShowAdd:false})
        const result= await reqAddRole(values.roleName)
        //console.log(result)
        if(result.status===0){
          message.success('添加角色成功')
          this.getRoles()
        }else{
          message.error(result.msg)
        }
      }
    })
  }
  componentWillMount(){
    this.initColumn()
  }
  componentDidMount(){
    this.getRoles()
  }
  render() {
    const {roles,isShowAdd,isShowAuth}=this.state
    const role=this.role||{}
    const title=(
      <Button type="primary" onClick={()=>{this.setState({isShowAdd:true})}}>添加角色</Button>
    )
    return (
      <Card title={title}>
        <Table 
        bordered
        rowKey='_id'
        dataSource={roles}
        columns={this.columns}
        pagination={{ defaultPageSize: PAGE_SIZE }}
        />
        <Modal
        title="添加角色"
        visible={isShowAdd}
        onOk={this.addRole}
        onCancel={()=>{
          this.setState({isShowAdd:false})
          this.form.resetFields()
        }}
        >
          <AddForm setForm={form=>this.form=form}/>
        </Modal>
        <Modal
        title="设置角色权限"
        visible={isShowAuth}
        onOk={this.updateRole}
        onCancel={()=>{
          this.setState({isShowAuth:false})
        }}
        >
          <AuthForm role={role} ref={this.authRef}/>
        </Modal>
      </Card>
    )
  }
}
