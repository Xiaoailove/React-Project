import React, { Component } from 'react'
import { Card, Button, Icon, Table } from 'antd'
import LinkButton from '../../components/link-button'
/**
 * 分类管理
 */
export default class Category extends Component {
  state={categorys:[]}
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width:300,
        render: (category)=><LinkButton>修改分类</LinkButton>
      },
    ]
  }
  componentWillMount(){
    this.initColumns();
  }
  render() {
    const {categorys}=this.state
    const extra = (
      <Button type='primary'>
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
            pagination={{defaultPageSize:3,showQuickJumper:true}}
          />
        </Card>
      </div>
    )
  }
}
