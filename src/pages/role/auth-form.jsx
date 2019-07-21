import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Tree
} from 'antd'
import menuList from '../../config/menuConfig'
const { TreeNode } = Tree
const Item = Form.Item
export default class AuthForm extends Component {
    static propTypes={
        role:PropTypes.object
    }
    state = {
        checkedKeys: []
    }
    getMenus=()=>this.state.checkedKeys
    //根据菜单配置生成TreeNode
    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }
    //进行勾选的时候回调
    handleCheck = (checkedKeys) => {
        // 更新状态
        this.setState({
            checkedKeys
        })
    }
    componentWillMount() {
        this.treeNodes = this.getTreeNodes(menuList)
        const menus = this.props.role.menus
        this.setState({
            checkedKeys: menus
        })
    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps()', nextProps)
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })
    }
    render() {
        const { role } = this.props
        const { checkedKeys } = this.state
        const formItemLayout = {
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }
        return (
            <div>
                <Item label='角色名称' {...formItemLayout}>
                    <Input value={role.name} disabled />
                </Item>
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={this.handleCheck}
                >
                    <TreeNode title="平台权限" key="all">
                        {
                            this.treeNodes
                        }
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}
