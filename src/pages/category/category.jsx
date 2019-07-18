import React, { Component } from 'react'
import { Card, Button, Icon, Table, message, Modal } from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import AddUpdateForm from './add-update-form'
/**
 * 分类管理
 */
export default class Category extends Component {
  state = {
    loading: false,
    categorys: [],
    showStatus: 0//改数值定义模态框0为隐藏1为显示添加2为显示修改
  }
  initColumns = () => {
    //const {showStatus}=this.state
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => <LinkButton
          onClick={() => {
            this.category = category
            this.setState({ showStatus: 2 })
          }}
        >修改分类</LinkButton>
      },
    ]
  }
  //获取分类显示的列表
  getCategorys = async () => {
    this.setState({ loading: true })
    const result = await reqCategorys()
    this.setState({ loading: false })
    if (result.status === 0) {
      const categorys = result.data
      this.setState({
        categorys
      })
    } else {
      message.error('获取分类列表信息失败')
    }
  }
  //点击模态框中的确定去添加和修改分类
  handleOk = () => {
    this.form.validateFields(async (err, value) => {
      if (!err) {
        const { categoryName } = value
        const { showStatus } = this.state
        let result
        if (showStatus === 1) {//发送添加分类的请求
          result = await reqAddCategory(categoryName)
        } else {//发送修改分类的请求
          const categoryId = this.category._id
          result = await reqUpdateCategory({ categoryId, categoryName })
        }
        this.setState({ showStatus: 0 })
        this.form.resetFields()//重置输入数据为初始值，不然initialValue始终以你设置的最新值为默认值会引起冲突
        const action = showStatus === 1 ? '添加' : '修改'
        if (result.status === 0) {
          this.getCategorys()
          message.success(action + '分类成功')
        } else {
          message.error(action + '分类失败')
        }
      }
    })
  }
  //点击取消模态框消失
  handleCancel = () => {
    this.form.resetFields()
    this.setState({
      showStatus: 0
    })
  }
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getCategorys()
  }
  render() {
    const { categorys, loading, showStatus } = this.state
    const category = this.category || '{}'
    const extra = (
      <Button type='primary' onClick={() => { this.setState({ showStatus: 1 }) }}>
        <Icon type='plus' />
        添加
      </Button>
    )
    return (
      <div>
        <Card extra={extra} >
          <Table
            columns={this.columns}
            dataSource={categorys}
            bordered={true}
            loading={loading}
            rowKey='_id'
            pagination={{ defaultPageSize: 3, showQuickJumper: true }}
          />
          <Modal
            title={showStatus === 1 ? "添加分类" : "修改分类"}
            visible={showStatus !== 0}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <AddUpdateForm setForm={(form) => this.form = form} categoryName={category.name} />
          </Modal>
        </Card>
      </div>
    )
  }
}
